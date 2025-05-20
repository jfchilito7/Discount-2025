import Link from 'next/link'
import React from 'react'

const menuList = [
    {
        name: 'Inicio',
        link: '/'
    },
    {
        name: 'Nosotros',
        link: '/about-us'
    },
    {
        name: 'Contactanos',
        link: '/contact-us'
    }
]

function Header() {
    return (
        <nav className='py-3 px-14 border-b flex items-center justify-between'>
            <img className='h-9' src="/logo.png" alt="Logo" />
            <div className='flex gap-4 items-center font-semibold'>
                {menuList.map((item) => {
                    return (
                        <Link href={item?.link} key={item?.name}>
                            <button className='cursor-pointer'>{item?.name}</button>
                        </Link>
                    )
                })}
            </div>
            <Link href={'/login'}>
                <button className='bg-blue-600 px-5 py-2 rounded-full font-bold text-white cursor-pointer'>Ingresar</button>
            </Link>
        </nav>
    )
}

export default Header