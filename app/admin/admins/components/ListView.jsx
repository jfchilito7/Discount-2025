'use client'
import { useAdmins } from '@/lib/firestore/admins/read';
import { deleteAdmin } from '@/lib/firestore/admins/write';
import { Button, CircularProgress } from '@heroui/react';
import { Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function ListView() {
    const { data: admins, error, isLoading } = useAdmins();

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
            <h1 className='text-xl'>Administradores</h1>
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
                    {admins?.map((item, index) => {
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
        if (!confirm('¿Estás seguro de que deseas eliminar este admin?')) 
            return;
        setIsDeleting(true);
        try {
            await deleteAdmin({id: item?.id})
            toast.success('Admin eliminado correctamente');
        } catch (error) {
            toast.error(error?.message || 'Error al eliminar el admin');
        }
        setIsDeleting(false);
    }

    const handleUpdate = () => {
        router.push(`/admin/admins?id=${item?.id}`);
    }

    return (
        <tr key={item.id ?? index}>
            <td className='border-y bg-white px-3 py-2 border-l rounded-l-lg text-center'>{index + 1}</td>
            <td className='border-y bg-white px-3 py-2 text-center'>
                <div className='flex justify-center'>
                    <img className='h-10 w-10 object-cover rounded-xl' src={item?.image} alt="" />
                </div>
            </td>
            <td className='border-y bg-white px-3 py-2'>
                <div className='flex flex-col'>
                    <h2>{item?.name}</h2>
                    <h3 className='text-sm text-gray-500'>{item?.email}</h3>
                </div>
            </td>
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