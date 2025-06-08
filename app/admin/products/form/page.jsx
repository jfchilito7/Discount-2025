'use client'
import React, { useState } from 'react'
import BasicDetails from './components/BasicDetails'
import Images from './components/Images'
import Description from './components/Description';

function page() {
    const [data, setData] = useState(null);
    const [featureImage, setFeatureImage] = useState(null);
    const [imageList, setImageList] = useState([]);

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
                <div className='flex-1 flex flex-col gap-5'>
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
        </main>
    )
}

export default page