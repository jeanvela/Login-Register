import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../redux/feutures/signUpSlice'
import { logIn } from '../redux/feutures/loginUpSclice'

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
    <div className='bg-slate-600 flex justify-center flex-col my-16'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4'>
            <input className='text-slate-950' type="text" name='username' onChange={handleChangue}/>
            <input className='text-slate-950' type="email" name="email" onChange={handleChangue}/>
            <input className='text-slate-950' type="password" name="password" onChange={handleChangue}/>
            <button type='submit' className='bg-red-600 p-3 rounded-md my-3'>Register</button>
        </form>
    </div>
  )
}

export default Register
