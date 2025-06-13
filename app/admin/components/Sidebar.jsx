'use client'
import { auth } from '@/lib/firestore/firestore'
import { signOut } from 'firebase/auth'
import { Cat, Layers2, LayoutDashboardIcon, LibraryBig, LogOut, PackageOpen, ShieldCheck, ShoppingCart, Star, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function Sidebar() {
    const menuList = [
        {
            name: 'Dashboard',
            link: '/admin',
            icon: <LayoutDashboardIcon className='h-5 w-5'/>,
        },
        {
            name: 'Productos',
            link: '/admin/products',
            icon: <PackageOpen className='h-5 w-5' />,
        },
        {
            name: 'Categorías',
            link: '/admin/categories',
            icon: <Layers2 className='h-5 w-5' />,
        },
        {
            name: 'Marcas',
            link: '/admin/brands',
            icon: <Cat className='h-5 w-5' />,
        },
        {
            name: 'Ordenes',
            link: '/admin/orders',
            icon: <ShoppingCart className='h-5 w-5' />,
        },
        {
            name: 'Clientes',
            link: '/admin/customers',
            icon: <User className='h-5 w-5' />,
        },
        {
            name: 'Reseñas',
            link: '/admin/reviews',
            icon: <Star className='h-5 w-5' />,
        },
        {
            name: 'Colecciones',
            link: '/admin/collections',
            icon: <LibraryBig className='h-5 w-5' />,
        },
        {
            name: 'Adminstradores',
            link: '/admin/admins',
            icon: <ShieldCheck className='h-5 w-5' />,
        },
    ]
    return (
        <section className='sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-[1000]'>
        <div className='flex justify-center pt-4'>
            <img src="/logo.png" alt="Logo" className='h-8'/>
        </div>
        <ul className='flex-1 flex flex-col h-full overflow-y-auto gap-4'>
            {menuList?.map((item, key) => {
                return (
                    <Tab item={item} key={key} /> 
                )
            })}
        </ul>
        <div className='flex justify-center w-full'>
            <button onClick={async() => {
                try {
                    await toast.promise(signOut(auth),{
                        error: (e) => e?.message || 'Error al cerrar sesión',
                        loading: 'Cerrando sesión...',
                        success: 'Sesión cerrada correctamente'
                    })
                } catch (error) {
                    toast.error(error?.message || 'Error al cerrar sesión');
                }
            }} className='flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center ease-soft-spring transition-all duration-400'>
                <LogOut className='h-5 w-5'/>Salir
            </button>
        </div>
    </section>
    )
}

function Tab ({item}) {
    const pathname = usePathname();
    const isSelected = pathname === item?.link;
    return (
        <li key={item?.link}>
            <Link className={`flex items-center gap-2 rounded-xl font-semibold px-4 py-2 ease-soft-spring transition-all duration-300
                ${isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"}
            `} href={item?.link}>
                {item?.icon}
                {item?.name}
            </Link>
        </li>
    )
}

export default Sidebar