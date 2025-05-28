import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firestore";

export const createNewAdmin = async ({ data, image }) => {
    if (!image) {
        throw new Error("Se requiere una imagen para crear un admin");
    }
    if (!data?.name) {
        throw new Error("El nombre de el admin es obligatorio");
    }
    if (!data?.email) {
        throw new Error("El Email de el admin es obligatorio");
    }

    const newId = data?.email;
    const imageRef = ref(storage, `admins/${newId}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    await setDoc (doc(db, `admins/${newId}`), {
        ...data,
        id: newId,
        image: imageURL,
        timestampCreated: Timestamp.now(),
    })
};
export const updateAdmin = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("El nombre de el admin es obligatorio");
    }
    if (!data?.id) {
        throw new Error("El ID de el admin es obligatorio para actualizarla");
    }
    if (!data?.email) {
        throw new Error("El Email de el admin es obligatorio para actualizarla");
    }
    const id = data?.id;

    let imageURL = data?.image;

    if (image) {
        const imageRef = ref(storage, `admins/${id}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }

    if (id === data?.email) {
        await updateDoc (doc(db, `admins/${id}`), {
            ...data,
            image: imageURL,
            timestampUpdate: Timestamp.now(),
        });
    } else {
        const newId = data?.email;

        await deleteDoc(doc(db, `admins/${id}`));

        await setDoc (doc(db, `admins/${newId}`), {
            ...data,
            id: newId,
            image: imageURL,
            timestampUpdate: Timestamp.now(),
        });
    }
    
};

export const deleteAdmin = async ({id}) => {
    if (!id) {
        throw new Error("El ID de el admin es obligatorio para eliminarla");
    }
    await deleteDoc(doc(db, `admins/${id}`));
}