'use client'
import React from 'react'
import Sidebar from './components/Sidebar'

function layout({ children }) {
    return (
        <main className='flex'>
            <Sidebar />
            <section className='flex-1'>{children}</section>
            
        </main>
    )
}

export default layout