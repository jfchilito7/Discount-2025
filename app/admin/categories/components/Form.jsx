'use client'
import { getCategory } from '@/lib/firestore/categories/read_server';
import { createNewCategory, updateCategory } from '@/lib/firestore/categories/write';
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
            const res = await getCategory({id: id});
            if (!res) {
                toast.error("No se encontró la categoría");
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
            await createNewCategory({ data: data, image: image });
            toast.success("Categoria creada correctamente");
            setData(null);
            setImage(null);
        } catch (error) {
            toast.error(error?.message ?? "Error al crear la categoría");
        }
        setIsLoading(false);
    }

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateCategory({ data: data, image: image });
            toast.success("Categoria Actualizada correctamente");
            setData(null);
            setImage(null);
            router.push('/admin/categories');
        } catch (error) {
            toast.error(error?.message ?? "Error al actualizar la categoría");
        }
        setIsLoading(false);
    }

    return (
        <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
            <h1 className='font-semibold'>{id ? "Actualizar" : "Crear"} Categoria</h1>
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
                    <label htmlFor="category-name" className='text-gray-500 text-sm'>
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
                        id='category-image' 
                        name='category-image'
                        type="file" 
                        placeholder='Ingresa el nombre' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="category-name" className='text-gray-500 text-sm'>
                        Nombre <span className='text-red-500'>*</span>{" "}
                    </label>
                    <input 
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                        id='category-name' 
                        name='category-name'
                        type="text" 
                        placeholder='Ingresa el nombre'
                        value={data?.name ?? ""}
                        onChange={(e) => {
                            handleData('name', e.target.value);
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="category-name" className='text-gray-500 text-sm'>
                        Identificador <span className='text-red-500'>*</span>{" "}
                    </label>
                    <input 
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                        id='category-slug ' 
                        name='category-slug'
                        type="text" 
                        placeholder='Ingresa el identificador' 
                        value={data?.slug ?? ""}
                        onChange={(e) => {
                            handleData('slug', e.target.value);
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