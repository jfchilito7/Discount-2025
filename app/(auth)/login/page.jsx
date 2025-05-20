'use client'

import { Button } from '@heroui/react';
import React from 'react'

function page() {
    return (
        <main className='w-full flex justify-center items-center bg-gray-300 p-24 min-h-screen'>
            <section className='flex flex-col gap-3'>
            <div className='flex justify-center'>
                <img  className='h-12' src="/logo.png" alt="Logo" />
            </div>
            <div className='flex flex-col gap-3 bg-white p-10 rounded-xl min-w-[440px]'>
                <h1 className='font-bold text-xl'>Ingresa con tu Email</h1>
                <form action="" className='flex flex-col gap-3'>
                    <input 
                        placeholder='Ingresa Email' 
                        type="email" 
                        name='user-email' 
                        id='user-email'
                        className='px-3 py-2 rounded border focus:outline-none w-full'
                    />

                    <input 
                        placeholder='Ingresa Contraseña' 
                        type="password" 
                        name='user-password' 
                        id='user-password'
                        className='px-3 py-2 rounded border focus:outline-none w-full'
                    />
                    <Button>Ingresar</Button>
                </form>
            </div>
            </section>
        </main>
    );
}

export default page