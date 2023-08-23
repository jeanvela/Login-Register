import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../redux/feutures/signUpSlice'
import { logIn } from '../redux/feutures/loginUpSclice'
import style from '../styles/Login.module.css'

interface SignUp {
    username: string,
    email: string,
    password: string
}

const Register = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => state.loginUp)
    const [findSignUp, setFindSignUp] = useState<SignUp>({
        username: '',
        email: '',
        password: '',
    })
    console.log(user)
    const handleChangue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setFindSignUp({...findSignUp,[name]: value})
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const response = await dispatch(signUp(findSignUp))
            if (response.meta.requestStatus === 'fulfilled') {
                dispatch(logIn({email: findSignUp.email, password: findSignUp.password}))
                navigate('/my-poems')
            } else{
                throw new Error('Error')
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

  return (
    <section className={style.section}>
        <div className='w-full max-w-7xl '>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 bg-slate-950 py-3 px-5 max-w-2xl m-auto rounded-xl h-'>
                <h1 className='text-white font-bold text-center text-2xl py-2.5'>Register</h1>
                <label className='font-bold text-white'>Username</label>
                <input className='text-white outline-none pl-1 py-1 mb-2 rounded-md' type="text" name='username' onChange={handleChangue}/>
                <label className='font-bold text-white'>Email</label>
                <input className='text-white outline-none pl-1 py-1 mb-2 rounded-md' type="email" name="email" onChange={handleChangue}/>
                <label className='font-bold text-white'>Password</label>
                <input className='text-white outline-none pl-1 py-1 mb-2 rounded-md' type="password" name="password" onChange={handleChangue}/>
                <button type='submit' className='text-white bg-blue-600 rounded-md font-bold py-2 my-3'>Register</button>
            </form>
        </div>
    </section>
  )
}

export default Register
