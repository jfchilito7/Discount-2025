import React from 'react'

function Images( { data, setFeatureImage, featureImage, imageList, setImageList } ) {
    return (
        <section className='flex flex-col gap-3 bg-white border p-4 rounded-xl'>
            <h1 className='font-semibold'>Imagenes</h1>
            <div className='flex flex-col gap-1'>
                {featureImage && (
                    <div className='flex justify-center'>
                        <img
                            className='h-20 object-cover rounded-lg'
                            src={URL.createObjectURL(featureImage)} 
                            alt="Imagen" 
                        />
                    </div>
                )}
                <label htmlFor="product-feature-image" className='text-gray-500 text-xs'> 
                    Imagen destacada <span className='text-red-500'>*</span>
                </label>
                <input 
                    type="file" 
                    id='product-feature-image' 
                    name='product-feature-image' 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    onChange={(e) =>{
                        if(e.target.files.length > 0) {
                            setFeatureImage(e.target.files[0])
                        }
                    }}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                {imageList.length > 0 && 
                    <div className='flex flex-wrap gap-3'>
                        {imageList?.map((item, index) => {
                            return <img 
                                key={item.name + index}
                                className='w-20 object-cover rounded-lg'
                                src={URL.createObjectURL(item)} 
                                alt='imagen' ></img>
                        })}
                    </div>
                }
                <label htmlFor="product-images" className='text-gray-500 text-xs'> 
                    Imagenes <span className='text-red-500'>*</span>
                </label>
                <input 
                    type="file" 
                    id='product-images' 
                    name='product-images'
                    multiple 
                    className='border px-4 py-2 rounded-lg w-full outline-none'
                    onChange={(e) =>{
                            const newFiles = [];
                            for (let i = 0; i < e.target.files.length; i++) {
                                newFiles.push(e.target.files[i]);
                            }
                            setImageList(newFiles);
                        }
                    }
                    required
                />
            </div>
        </section>
    )
}

export default Images