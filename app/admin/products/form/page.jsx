'use client'

import React, { useState } from 'react'
import BasicDetails from './components/BasicDetails'
import Images from './components/Images'
import Description from './components/Description';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import { createNewProduct } from '@/lib/firestore/products/write';

function page() {
    const [data, setData] = useState(null);
    const [featureImage, setFeatureImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleData = (key, value) => {
        setData((prevData) => {
            return {
                ...(prevData ?? {}),
                [key]: value
            }
        })
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await createNewProduct({
                data: data,
                featureImage: featureImage,
                imageList: imageList
            });
            setData(null);
            setFeatureImage(null);
            setImageList([]);
            toast.success('Producto creado exitosamente');
        } catch (error) {
            console.log(error?.message);
            toast.error(error?.message);
        }
        setIsLoading(false);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }} 
        className='flex flex-col gap-4 p-5'
        >
            <div className='flex justify-between w-full items-center'>
                <h1 className='font-semibold'>Crear nuevo producto</h1>
                <Button isLoading={isLoading} isDisabled={isLoading} type='submit'>Crear</Button>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
                <div className='flex-1 flex'>
                    <BasicDetails data={data} handleData={handleData} />
                </div>
                <div className='flex-1 flex flex-col gap-5 h-full'>
                    <Images 
                        data={data} 
                        featureImage={featureImage} 
                        setFeatureImage={setFeatureImage} 
                        imageList={imageList}
                        setImageList={setImageList}
                        />
                    <Description data={data} handleData={handleData} />
                </div>
            </div>
        </form>
    )
}

export default page