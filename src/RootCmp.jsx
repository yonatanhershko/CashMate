import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
// import { AboutUs} from './pages/AboutUs'
import { WalletIndex } from './pages/WalletIndex.jsx'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Auth } from './pages/Auth.jsx'

export function RootCmp() {
    return (
        <div className=" main-container">
            <UserMsg />
            <AppHeader />
            <Routes>
                <Route element={<Auth />} path="/login" />
                <Route element={<Auth />} path="/signup" />
            </Routes>
            <main className='main-layout'>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="wallet" element={<WalletIndex />} />
                </Routes>
            </main>

        </div>
    )
}


