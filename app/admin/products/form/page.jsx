'use client'
import React, { useState } from 'react'
import BasicDetails from './components/BasicDetails'
import Images from './components/Images'

function page() {
    const [data, setData] = useState(null);
    const handleData = (key, value) => {
        setData((prevData) => {
            return {
                ...(prevData ?? {}),
                [key]: value
            }
        })
    }
    return (
        <main className='flex flex-col gap-4 p-5'>
            <h1 className='font-semibold'>Crear nuevo producto</h1>
            <div className='flex flex-col md:flex-row gap-5'>
                <BasicDetails data={data} handleData={handleData} />
                <Images data={data} handleData={handleData} />
            </div>
        </main>
    )
}

export default page