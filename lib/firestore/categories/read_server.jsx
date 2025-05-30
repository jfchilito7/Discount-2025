import { doc, getDoc } from "firebase/firestore"
import { db } from "../firestore"

export const getCategory = async ({id}) => {
    const data = await getDoc(doc(db, `categories/${id}`));
    if (data.exists()) {
        return data.data();
    } else {
        return null;
    }
}