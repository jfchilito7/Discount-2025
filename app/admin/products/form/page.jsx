'use client'

import React, { useEffect, useState } from 'react'
import BasicDetails from './components/BasicDetails'
import Images from './components/Images'
import Description from './components/Description';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import { createNewProduct, updateProduct } from '@/lib/firestore/products/write';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProduct } from '@/lib/firestore/products/read_server';

function page() {
    const [data, setData] = useState(null);
    const [featureImage, setFeatureImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();

    const router = useRouter();

    const id = searchParams.get('id');

    const fetchData = async () => {
        try {
            const res = await getProduct({ id: id});
            if (!res) {
                throw new Error('Producto no encontrado');
            } else {
                setData(res);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleData = (key, value) => {
        setData((prevData) => {
            return {
                ...(prevData ?? {}),
                [key]: value
            }
        })
    }

    const handleCreate = async () => {
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

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateProduct({
                data: data,
                featureImage: featureImage,
                imageList: imageList
            });
            setData(null);
            setFeatureImage(null);
            setImageList([]);
            toast.success('Producto actualizado exitosamente');
            router.push('/admin/products');
        } catch (error) {
            console.log(error?.message);
            toast.error(error?.message);
        }
        setIsLoading(false);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (id) {
                handleUpdate();
            } else {
                handleCreate();
            }
        }} 
        className='flex flex-col gap-4 p-5'
        >
            <div className='flex justify-between w-full items-center'>
                <h1 className='font-semibold'>
                    {id ? "Actualizar producto" : "Crear nuevo producto"}
                </h1>
                <Button isLoading={isLoading} isDisabled={isLoading} type='submit'>
                    {id ? "Actualizar" : "Crear"}
                </Button>
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