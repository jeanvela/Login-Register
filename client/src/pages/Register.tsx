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
interface Props {
    setIsAuth: (value: boolean) => void
}

const Register = ({setIsAuth}: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const error = useAppSelector(state => state.signUp.error)
    const newError = Object(error)
    const [isError, setIsError] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [findSignUp, setFindSignUp] = useState<SignUp>({
        username: '',
        email: '',
        password: '',
    })

    const handleChangue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setFindSignUp({...findSignUp,[name]: value})
        setIsError({
            username: findSignUp.username.length <= 4 ? 'Username cannot be less than 4 characters' : '',
            email: findSignUp.email.includes('@') ? '' : 'Must be a valid email',
            password: findSignUp.password.length <= 4 ? 'Password must not be less than 4 characters' : ''
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await dispatch(signUp(findSignUp))
        if (response.meta.requestStatus === 'fulfilled') {
            dispatch(logIn({email: findSignUp.email, password: findSignUp.password}))
            setIsAuth(true)
            navigate('/my-poems')
            return
        } else {
            return
        }
    }

  return (
    <section className={style.section}>
        <div className='w-full max-w-7xl '>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 bg-slate-950 py-3 px-5 max-w-2xl m-auto rounded-xl h-'>
                {
                    error && Object.keys(newError).length > 0 ? (
                        <div className='flex justify-center items-center bg-red-600 py-3 w-full m-auto'>
                            <p className='font-bold'>{newError.message}</p>
                        </div>
                    ) : (
                        ''
                    )
                }
                <h1 className='text-white font-bold text-center text-2xl py-2.5'>Register</h1>
                <label className='font-bold text-white'>Username</label>
                <input className='text-white outline-none pl-1 py-1 mb-2 rounded-md' type="text" name='username' onChange={handleChangue}/>
                {
                    <p className='text-red-600'>{isError.username}</p>
                }
                <label className='font-bold text-white'>Email</label>
                <input className='text-white outline-none pl-1 py-1 mb-2 rounded-md' type="email" name="email" onChange={handleChangue}/>
                {
                    <p className='text-red-600'>{isError.email}</p>
                }
                <label className='font-bold text-white'>Password</label>
                <input className='text-white outline-none pl-1 py-1 mb-2 rounded-md' type="password" name="password" onChange={handleChangue}/>
                {
                    <p className='text-red-600'>{isError.password}</p>
                }
                <button 
                    disabled={findSignUp.username.length > 4 && findSignUp.email.includes('@') && findSignUp.password.length > 4 ? false : true } 
                    type='submit' 
                    className='text-white bg-blue-600 rounded-md font-bold py-2 my-3'
                >Register</button>
            </form>
        </div>
    </section>
  )
}

export default Register
