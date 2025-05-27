import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firestore";

export const createNewCategory = async ({ data, image }) => {
    if (!image) {
        throw new Error("Se requiere una imagen para crear una categoría");
    }
    if (!data?.name) {
        throw new Error("El nombre de la categoría es obligatorio");
    }
    if (!data?.slug) {
        throw new Error("El identificador de la categoría es obligatorio");
    }
    const newId = doc(collection (db, `ids`)).id;
    const imageRef = ref(storage, `categories/${newId}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    await setDoc (doc(db, `categories/${newId}`), {
        ...data,
        id: newId,
        image: imageURL,
        timestampCreated: Timestamp.now(),
    })
};
export const updateCategory = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("El nombre de la categoría es obligatorio");
    }
    if (!data?.slug) {
        throw new Error("El identificador de la categoría es obligatorio");
    }
    if (!data?.id) {
        throw new Error("El ID de la categoría es obligatorio para actualizarla");
    }
    const id = data?.id;

    let imageURL = data?.image;

    if (image) {
        const imageRef = ref(storage, `categories/${id}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }


    await updateDoc (doc(db, `categories/${id}`), {
        ...data,
        image: imageURL,
        timestampUpdate: Timestamp.now(),
    })
};

export const deleteCategory = async ({id}) => {
    if (!id) {
        throw new Error("El ID de la categoría es obligatorio para eliminarla");
    }
    await deleteDoc(doc(db, `categories/${id}`));
}