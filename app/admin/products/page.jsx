import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <main className='p-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl'>Productos</h1>
                <Link href={`/admin/products/form`}>
                    <button className='bg-[#313131] text-sm text-white px-4 py-2 rounded-lg'>Crear</button>
                </Link>
            </div>
        </main>
    )
}

export default page