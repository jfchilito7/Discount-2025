'use client'

import { useBrands } from '@/lib/firestore/brands/read'
import { useCategories } from '@/lib/firestore/categories/read';
import React from 'react'

function BasicDetails({ data, handleData }) {
    const { data: brands } =useBrands();
    const { data: categories } = useCategories(); 
    return (
        <section className='flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border'>
            <h1 className='font-semibold'>Detalles Básicos</h1>
            <div className='flex flex-col gap-1'>
                <label htmlFor="product-title" className='text-gray-500 text-xs'> 
                    Nombre Del Producto <span className='text-red-500'>*</span>
                </label>
                <input 
                    type="text" 
                    placeholder='Ingresa Titulo' 
                    id='product-title' 
                    name='product-title' 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    value={data?.title ?? ''}
                    onChange={(e) => {
                        handleData('title', e.target.value)
                    }}
                    required
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="product-short-description" className='text-gray-500 text-xs'> 
                    Pequeña Descripción <span className='text-red-500'>*</span>
                </label>
                <input 
                    type="text" 
                    placeholder='Ingresa Descripción' 
                    id='product-short-description' 
                    name='product-short-description' 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    value={data?.shortDescription ?? ''}
                    onChange={(e) =>{
                        handleData('shortDescription', e.target.value)
                    }}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="product-brand" className='text-gray-500 text-xs'> 
                    Marca <span className='text-red-500'>*</span>
                </label>
                <select 
                    type="text" 
                    id='product-brand' 
                    name='product-brand' 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    value={data?.brandId ?? ''}
                    onChange={(e) => {
                        handleData('brandId', e.target.value)
                    }}
                    required
                >
                    <option value="">Seleccione la marca</option>
                    {brands?.map((item) => {
                        return (
                            <option value={item?.id} key={item?.id}>
                                {item?.name}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="product-category" className='text-gray-500 text-xs'> 
                    Categoria <span className='text-red-500'>*</span>
                </label>
                <select 
                    type="text" 
                    id='product-category' 
                    name='product-category' 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    value={data?.categoryId ?? ''}
                    onChange={(e) => {
                        handleData('categoryId', e.target.value)
                    }}
                    required
                >
                    <option value="">Seleccione categoria</option>
                    {categories?.map((item) => {
                        return (
                            <option value={item?.id} key={item?.id}>
                                {item?.name}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="product-stock" className='text-gray-500 text-xs'> 
                    Stock <span className='text-red-500'>*</span>
                </label>
                <input 
                    type="number" 
                    placeholder='Ingresa stock' 
                    id='product-stock' 
                    name='product-stock' 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    value={data?.stock ?? ''}
                    onChange={(e) =>{
                        handleData('stock', e.target.valueAsNumber)
                    }}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="product-price" className='text-gray-500 text-xs'> 
                    Precio <span className='text-red-500'>*</span>
                </label>
                <input 
                    type="number" 
                    placeholder='Ingresa precio' 
                    id='product-price' 
                    name='product-price' 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    value={data?.price ?? ''}
                    onChange={(e) =>{
                        handleData('price', e.target.valueAsNumber)
                    }}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="product-sale-price" className='text-gray-500 text-xs'> 
                    Precio de venta<span className='text-red-500'>*</span>
                </label>
                <input 
                    type="number" 
                    placeholder='Ingresa precio de venta' 
                    id='product-sale-price' 
                    name='product-sale-price' 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    value={data?.salePrice ?? ''}
                    onChange={(e) =>{
                        handleData('salePrice', e.target.valueAsNumber)
                    }}
                    required
                />
            </div>

            
        </section>
    )
}

export default BasicDetails