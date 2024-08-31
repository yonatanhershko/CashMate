import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'

const SignupSchema = Yup.object().shape({
    username: Yup.string().required(`Enter your username`),
    password: Yup.string().required('Enter your password'),
})

export function LoginForm({ onSubmit, handleChange, isSignup }) {
    const navigate = useNavigate()
    const [robohashUrl, setRobohashUrl] = useState('')

    const handleRobohashPreview = (username) => {
        if (username) {
            const newRobohashUrl = `https://robohash.org/${username}?set=set1`
            setRobohashUrl(newRobohashUrl)
        }
    }

    return (
        <div className="login-container">
            <Formik
                enableReinitialize
                initialValues={{
                    username: '',
                    password: '',
                    fullname: '',
                    isSignup: isSignup === 'signup',
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, values }) => (
                    <Form className='auth-form' onChange={handleChange}>
                        <Field name="username" placeholder="Enter your username" />
                        {errors.username && touched.username && (
                            <div>{errors.username}</div>
                        )}
                        <Field name="password" type="password" placeholder="Enter password" />
                        {errors.password && touched.password && (
                            <div>{errors.password}</div>
                        )}
                        {isSignup === 'signup' && (
                            <Field name="fullname" type="fullname" placeholder="Enter your full name" />
                        )}
                        {errors.fullname && touched.fullname && (
                            <div>{errors.fullname}</div>
                        )}
                        {isSignup === 'signup' &&(
                            <button
                                type="button"
                                onClick={() => handleRobohashPreview(values.username)}
                                className="generate-robohash-btn">
                                Generate Robohash
                            </button>)}
                        {robohashUrl && (
                            <div className="robohash-preview">
                                <img src={robohashUrl} alt="Robohash" className="robohash-image" title={`${values.username}`}/>
                            </div>
                        )}
                        <button type="submit" className="submit-btn">
                            {isSignup === 'signup' ? 'Sign up' : 'Continue'}
                        </button>
                    </Form>
                )}
            </Formik>
            <p onClick={() => navigate(isSignup === 'signup' ? '/login' : '/signup', { replace: true })}>
                {isSignup === 'signup' ? 'Already have a CashMate account? Log in' : 'Create an account'}
            </p>
        </div>
    )
}