'use client'
import { getBrand } from '@/lib/firestore/brands/read_server';
import { createNewBrand, updateBrand } from '@/lib/firestore/brands/write';
import { Button } from '@heroui/react'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Form() {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const fetchData = async () => {
        try {
            const res = await getBrand({id: id});
            if (!res) {
                toast.error("No se encontró la marca");
            } else {
                setData(res);
            }
        } catch (error) {
            toast.error(error?.message ?? "Error al cargar los datos");
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleData = (key, value) => {
        setData((preData) => {
            return {
                ...(preData ?? {}),
                [key]: value,
            }
        })
    }

    const handleCreate = async () => {
        setIsLoading(true);
        try {
            await createNewBrand({ data: data, image: image });
            toast.success("Marca creada correctamente");
            setData(null);
            setImage(null);
        } catch (error) {
            toast.error(error?.message ?? "Error al crear la marca");
        }
        setIsLoading(false);
    }

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateBrand({ data: data, image: image });
            toast.success("Marca Actualizada correctamente");
            setData(null);
            setImage(null);
            router.push('/admin/brands');
        } catch (error) {
            toast.error(error?.message ?? "Error al actualizar la marca");
        }
        setIsLoading(false);
    }

    return (
        <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
            <h1 className='font-semibold'>{id ? "Actualizar" : "Crear"} Marca</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (id) {
                        handleUpdate();
                    } else {
                        handleCreate();
                    }
                }}
                className='flex flex-col gap-3'
            >
                <div className='flex flex-col gap-1'>
                    <label htmlFor="brand-name" className='text-gray-500 text-sm'>
                        Imagen <span className='text-red-500'>*</span>{" "}
                    </label>
                    <div className='flex justify-center items-center p-3'>
                        {image && <img className='h-20' src={URL.createObjectURL(image)} alt='' />}
                    </div>
                    <input
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setImage(e.target.files[0]);
                            }
                        }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                        id='brand-image' 
                        name='brand-image'
                        type="file" 
                        placeholder='Ingresa el nombre' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="brand-name" className='text-gray-500 text-sm'>
                        Nombre <span className='text-red-500'>*</span>{" "}
                    </label>
                    <input 
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                        id='brand-name' 
                        name='brand-name'
                        type="text" 
                        placeholder='Ingresa el nombre'
                        value={data?.name ?? ""}
                        onChange={(e) => {
                            handleData('name', e.target.value);
                        }}
                    />
                </div>
                <Button isLoading={isLoading} isDisabled={isLoading} type='submit'>
                    {id ? "Actualizar" : "Crear"}
                </Button>
            </form>
        </div>
    )
}

export default Form