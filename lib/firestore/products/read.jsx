'use client'

import { collection, limit, onSnapshot, query, startAfter } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firestore'

export function useProducts({ pageLimit, lastSnapDoc }) {
    const { data, error } = useSWRSubscription(['products', pageLimit, lastSnapDoc], ([path, pageLimit, lastSnapDoc], { next }) => {
    const ref = collection(db, path);
    let q = query(ref, limit(pageLimit ?? 10));

    if (lastSnapDoc) {
        q = query(q, startAfter(lastSnapDoc));
    }

    const unsub = onSnapshot(q,
        (snapshot) => 
            next(
                null,
                {
                    list : snapshot.docs.length === 0
                    ? null
                    : snapshot.docs.map((snap) => snap.data()),
                    lastSnapDoc : snapshot.docs.length === 0
                    ? null
                    : snapshot.docs[snapshot.docs.length - 1],
                }
                ),
        err => next(err, null)
    )
    return () => unsub();
    })

    return {
        data : data?.list, 
        lastSnapDoc : data?.lastSnapDoc, 
        error: error?.message, 
        isLoading: data === undefined 
    };
}