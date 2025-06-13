import { doc, getDoc } from "firebase/firestore"
import { db } from "../firestore"

export const getProduct = async ({id}) => {
    const data = await getDoc(doc(db, `products/${id}`));
    if (data.exists()) {
        return data.data();
    } else {
        return null;
    }
}