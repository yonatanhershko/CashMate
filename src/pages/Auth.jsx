import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { LoginForm } from "../cmps/LoginForm.jsx"
import { login, signup } from '../store/actions/user.actions.js'
import loginBg1 from '../assets/styles/imgs/login/login-bg1.png'
import loginBg2 from '../assets/styles/imgs/login/login-bg2.png'

import { walletService } from '../services/wallet/wallet.service.remote.js'
//add here to create a new wallet to new users (use the index)

// const newWallet = walletService.getEmptyWallet()
// newWallet.createdBy = user
// newWallet.members.push(user)

//and update the back (wallet service)


export function Auth() {
    const path = window.location.pathname
    const isSignup = path.split('/').pop()
    // const [isSignup, setIsSignup] = useState(false)

    const [userInfo, setUserInfo] = useState('')
    const [uploadedImage, setUploadedImage] = useState(null)
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setUserInfo(prevUser => ({ ...prevUser, [field]: value }))
    }

    async function onSubmit() {
        const { fullname, username, password } = userInfo

        const newUser = { username, password }
        console.log(newUser);
        if (isSignup) {
            newUser.fullname = fullname
            newUser.imgUrl = `https://robohash.org/${fullname}?set=set1`
        }

        try {
            const user = isSignup === 'signup' ? await signup(newUser) : await login(newUser)

            if (user) {
                navigate('/wallet')
            } else {
                console.error('User info is not valid')
            }
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async function onUploadImg({ target }) {
        const file = target.files[0]
        const url = await cloudinaryService.uploadImg(file)
        return setUploadedImage(url)
    }

    return (
        <section className="login">
            <section className="login-outer-container">

                <section className="login-inner-container">
                    <article className="login-innermost-container">
                        <img className="loginBg1" src={loginBg1} alt="" />
                        <img className="loginBg2" src={loginBg2} alt="" />

                        <article className="black-box-container">
                            <div className="login-signup-container">
                                <div className="login-header">
                                    <div className='logo-container'>
                                        <span className='logo-text'>CashMate</span>
                                    </div>
                                    <h5>{isSignup === 'signup' ? 'Sign up to continue' : 'Log in to continue'}</h5>
                                </div>
                                <LoginForm onSubmit={onSubmit} handleChange={handleChange} isSignup={isSignup} onUploadImg={onUploadImg} uploadedImage={uploadedImage} />
                            </div>
                        </article>
                    </article>
                </section>
            </section>
        </section>
    )
}