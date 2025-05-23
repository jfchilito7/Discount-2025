'use client'
import { Cat, Layers2, LayoutDashboardIcon, LibraryBig, PackageOpen, ShoppingCart, Star, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

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
    ]
    return (
        <section className='flex flex-col gap-10 justify-between bg-white border-r px-5 py-3 h-screen overflow-hidden md:w-[260px]'>
        <div className='flex justify-center gap-2'>
            <img src="/logo.png" alt="Logo" className='h-8'/>
        </div>
        <ul className='flex-1 flex-col gap-4'>
            {menuList?.map((item, key) => {
                return (
                    <Tab item={item} key={key} /> 
                )
            })}
        </ul>
    </section>
    )
}

function Tab ({item}) {
    const pathname = usePathname();
    const isSelected = pathname === item?.link;
    return (
        <li key={item?.link}>
            <Link className={`flex items-center gap-2 rounded-xl font-semibold px-4 py-2
                ${isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"}
            `} href={item?.link}>
                {item?.icon}
                {item?.name}
            </Link>
        </li>
    )
}

export default Sidebar