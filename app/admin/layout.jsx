'use client';

import React, { useEffect } from 'react'
import AdminLayout from './components/AdminLayout';
import AuthContextProvider, { useAuth } from '@/contexts/AuthContext';
import { CircularProgress } from '@heroui/react';
import { useRouter } from 'next/navigation';


function layout({ children }) {
    return (
        <AuthContextProvider>
            <AdminChecking>{children}</AdminChecking>
        </AuthContextProvider>
    )
}

function AdminChecking({children}) {
    const {user, isLoading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user ) {
            router.push('/login');
        }
    }, [user, isLoading]);

    if (isLoading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center'>
                <CircularProgress aria-label='Cargando contenido...' />
            </div>
        )
    }

    if (!user) {
        return null;
    }

    return <AdminLayout>{children}</AdminLayout>
}

export default layout