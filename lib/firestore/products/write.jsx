import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firestore";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

export const createNewProduct = async ({data, featureImage, imageList}) => {

    if(!data?.title) {
        throw new Error('Titulo del producto es requerido');
    }
    if (!featureImage) {
        throw new Error ('Imagen destacada del producto es requerida');
    }
    const featureImageRef = ref(storage, `products/${featureImage?.name}`)
    await uploadBytes(featureImageRef, featureImage);
    const featureImageURL = await getDownloadURL(featureImageRef);

    let imageURLList = [];

    for (let i = 0; i < imageList?.length; i++) {
        const image = imageList[i];
        const imageRef = ref(storage, `products/${image?.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageURLList.push(url);
    }

    const newId = doc(collection(db, `ids`)).id;

    await setDoc(doc(db, `products/${newId}`),{
        ...data,
        featureImageURL:featureImageURL,
        imageList: imageURLList,
        id: newId,
        timestampCreate: Timestamp.now(),
    })
}