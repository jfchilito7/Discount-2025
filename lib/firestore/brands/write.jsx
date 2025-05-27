import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firestore";

export const createNewBrand = async ({ data, image }) => {
    if (!image) {
        throw new Error("Se requiere una imagen para crear una marca");
    }
    if (!data?.name) {
        throw new Error("El nombre de la marca es obligatorio");
    }

    const newId = doc(collection (db, `ids`)).id;
    const imageRef = ref(storage, `brands/${newId}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    await setDoc (doc(db, `brands/${newId}`), {
        ...data,
        id: newId,
        image: imageURL,
        timestampCreated: Timestamp.now(),
    })
};
export const updateBrand = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("El nombre de la marca es obligatorio");
    }
    if (!data?.id) {
        throw new Error("El ID de la marca es obligatorio para actualizarla");
    }
    const id = data?.id;

    let imageURL = data?.image;

    if (image) {
        const imageRef = ref(storage, `brands/${id}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }


    await updateDoc (doc(db, `brands/${id}`), {
        ...data,
        image: imageURL,
        timestampUpdate: Timestamp.now(),
    })
};

export const deleteBrand = async ({id}) => {
    if (!id) {
        throw new Error("El ID de la marca es obligatorio para eliminarla");
    }
    await deleteDoc(doc(db, `brands/${id}`));
}