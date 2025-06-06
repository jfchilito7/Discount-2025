'use client'
import { useBrands } from '@/lib/firestore/brands/read';
import { deleteBrand } from '@/lib/firestore/brands/write';
import { Button, CircularProgress } from '@heroui/react';
import { Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function ListView() {
    const { data: brands, error, isLoading } = useBrands();

    if (isLoading) {
        return (
            <div>
                <CircularProgress aria-label='Cargando contenido...' />
            </div>
        )
    }
    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col gap-3 rounded-xl md:pr-5 md:px-0 px-5'>
            <h1 className='text-xl'>Marcas</h1>
            <table className='border-separate border-spacing-y-3'>
                <thead>
                    <tr>
                        <th className='font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg'>SN</th>
                        <th className='font-semibold border-y bg-white px-3 py-2 '>Imagen</th>
                        <th className='font-semibold border-y bg-white px-3 py-2 text-left'>Nombre</th>
                        <th className='font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {brands?.map((item, index) => {
                        return (
                            <Row index={index} item={item} key={item?.id} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

function Row({ item, index }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter();
    ;
    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta marca?')) 
            return;
        setIsDeleting(true);
        try {
            await deleteBrand({id: item?.id})
            toast.success('Marca eliminada correctamente');
        } catch (error) {
            toast.error(error?.message || 'Error al eliminar la marca');
        }
        setIsDeleting(false);
    }

    const handleUpdate = () => {
        router.push(`/admin/brands?id=${item?.id}`);
    }

    return (
        <tr key={item.id ?? index}>
            <td className='border-y bg-white px-3 py-2 border-l rounded-l-lg text-center'>{index + 1}</td>
            <td className='border-y bg-white px-3 py-2 text-center'>
                <div className='flex justify-center'>
                    <img className='h-10 w-10 object-cover' src={item?.image} alt="" />
                </div>
            </td>
            <td className='border-y bg-white px-3 py-2'>{item.name}</td>
            <td className='border-y bg-white px-3 py-2 border-r rounded-r-lg'>
                <div className='flex gap-2 items-center'>
                    <Button onClick={handleUpdate} isDisabled={isDeleting} isIconOnly size='sm'>
                        <Edit2 size={13}/>
                    </Button>
                    <Button onClick={handleDelete} isLoading={isDeleting} isDisabled={isDeleting} isIconOnly size='sm' color='danger'>
                        <Trash2 size={13}/>
                    </Button>
                </div>
            </td>
        </tr>
    )
}

export default ListView