'use client'
import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function layout({ children }) {
    return (
        <main className='flex'>
            <div className='hidden md:block'>
                <Sidebar />
            </div>
            <section className='flex-1 flex flex-col'>
                <Header />
                <section className='flex-1 bg-[#eff3f4]'>
                    {children}
                </section>
            </section>
            
        </main>
    )
}

export default layout