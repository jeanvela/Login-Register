import { useState, ChangeEvent } from 'react'
import {  useAppDispatch, useAppSelector } from '../redux/hook'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../redux/feutures/loginUpSclice'
import style from '../styles/Login.module.css'

interface LoginUser {
    email: string,
    password: string,
}

interface LoginProps {
    setIsAuth: (value: boolean) => void
}

const Login = ({setIsAuth}: LoginProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const erorr = useAppSelector(state => state.loginUp.error)
    const newError = Object(erorr)
    const [isError, setIsError] = useState({
        email: '',
        password: ''
    })

    const [loginUp, setLoginUp] = useState<LoginUser>({
        email: '',
        password: ''
    })

    const handleChangue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setLoginUp({...loginUp,[name]: value})
        setIsError({
            email: loginUp.email.includes('@') ? '' : 'Must be a valid email',
            password: loginUp.password.length <= 4 ? 'Password must not be less than 4 characters' : ''
        })
    }

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await dispatch(logIn(loginUp))
        if (response.meta.requestStatus === 'rejected') { 
            return
        } else {
            setIsAuth(true)
            navigate('/my-poems')
        }
    }

  return (
    <section className={style.section}>
        <div className='w-full max-w-7xl '>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 bg-slate-950 py-3 px-5 max-w-2xl m-auto rounded-xl h-'>
            {
                erorr && Object.keys(newError).length > 0 ? (
                    <div className='flex justify-center items-center bg-red-600 py-3 w-full m-auto'>
                        <p className='font-bold'>{newError.message}</p>
                    </div>
                ) : (
                    ''
                )
            }
                <h1 className='text-white font-bold text-center text-2xl py-2.5'>Login</h1>
                <label className='font-bold text-white'>Email</label>
                <input className='text-white outline-none pl-1 py-1 mb-2 rounded-md' type="email" name='email' onChange={handleChangue}/>
                {
                    <p className='text-red-600'>{isError.email}</p>
                }
                <label className='text-white font-bold'>Password</label>
                <input className='text-white outline-none pl-1 py-1 rounded-md' type="password" name='password' onChange={handleChangue}/>
                {
                    <p className='text-red-600'>{isError.password}</p>
                }
                <button disabled={loginUp.email.includes('@') && loginUp.password.length > 4  ? false : true} className='text-white bg-blue-600 rounded-md font-bold py-2 my-3'>Login</button>
            </form>
        </div>
    </section>
  )
}

export default Login
