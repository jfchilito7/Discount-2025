'use client'

import AuthContextProvider from '@/contexts/AuthContext'
import React from 'react'

function layout({ children }) {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}

export default layout