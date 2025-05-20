'use client'

import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firestore/firestore';
import { Button } from '@heroui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user]);

    return (
        <main className='w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen'>
            <section className='flex flex-col gap-3'>
            <div className='flex justify-center'>
                <img  className='h-12' src="/logo.png" alt="Logo" />
            </div>
            <div className='flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full'>
                <h1 className='font-bold text-xl'>Ingresa con tu Email</h1>
                <form action="" className='flex flex-col gap-3'>
                    <input 
                        placeholder='Ingresa Email' 
                        type="email" 
                        name='user-email' 
                        id='user-email'
                        className='px-3 py-2 rounded-xl border focus:outline-none w-full'
                    />

                    <input 
                        placeholder='Ingresa Contraseña' 
                        type="password" 
                        name='user-password' 
                        id='user-password'
                        className='px-3 py-2 rounded-xl border focus:outline-none w-full'
                    />
                    <Button color='primary'>Ingresar</Button>
                </form>
                <div className='flex justify-between'>
                    <Link href={`/sign-up`}>
                        <button className='font-semibold text-sm text-blue-700'>Crear nueva cuenta</button>
                    </Link>
                    <Link href={`/forget-password`}>
                        <button className='font-semibold text-sm text-blue-700'>Olvido su Contraseña?</button>
                    </Link>
                </div>
                <hr />
                <SignInWithGoogle />
            </div>
            </section>
        </main>
    );
}

function SignInWithGoogle() {
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error) {
            toast.error(error?.message || "Error al iniciar sesión");
        }
        setIsLoading(false);
    };
    return ( 
        <Button isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin}>Ingresa con Google</Button>
    )
}

export default page