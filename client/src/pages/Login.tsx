import { useState, ChangeEvent } from 'react'
import {  useAppDispatch, useAppSelector } from '../redux/hook'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../redux/feutures/loginUpSclice'

interface LoginUser {
    email: string,
    password: string,
}

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const erorr = useAppSelector(state => state.loginUp.error)
    console.log(erorr)

    const [loginUp, setLoginUp] = useState<LoginUser>({
        email: '',
        password: ''
    })

    const handleChangue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setLoginUp({...loginUp,[name]: value})
    }

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        // try {
        //     const response = await dispatch(logIn(loginUp))
        //     if (logIn.fulfilled.match(response)) {
        //         navigate('/my-poems')
        //     } else {
        //         throw response.payload
        //     }
        // } catch (error) {
        //     return error
        // }
        const response = await dispatch(logIn(loginUp))
        if (response.meta.requestStatus === 'rejected') {
            console.log(erorr)
            return
        } else {
            navigate('/my-poems')
        }
    }

  return (
    <div className='bg-slate-600 flex justify-center flex-col my-16'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4'>
            <input className='text-slate-950' type="email" name='email' onChange={handleChangue}/>
            <input className='text-slate-950' type="password" name='password' onChange={handleChangue}/>
            <button className='bg-red-600 p-3 rounded-md my-3'>Login</button>
        </form>
    </div>
  )
}

export default Login
