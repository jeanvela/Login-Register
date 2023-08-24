import { FormEvent, useState, ChangeEvent } from 'react'
import { postPoem } from '../redux/feutures/createPoemSlice'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import style from '../styles/CreatePoem.module.css'
import { toast } from 'react-toastify'

interface Poem {
  title: string
  text: string
}

const CreatePoem = () => {
  const dispacth = useAppDispatch()
  const error = useAppSelector(state => state.createPoem.error)
  const newError = Object(error)
  console.log(newError)
  const [createPoem, setCreatePoem] = useState<Poem>({
    title: '',
    text: ''
  })

  const handlechangue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.currentTarget
    setCreatePoem({...createPoem,[name]: value})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await dispacth(postPoem(createPoem))

    if (response.meta.requestStatus === 'rejected') {
      return
    } else {
      setCreatePoem({
        text: '',
        title: ''
      })
      toast.success('Poem created successfully', {
        position: 'top-center',
        autoClose: 3000,
        pauseOnHover: false,
        closeOnClick: false,
        theme: 'light',
      })
    }
    
  }

  return (
    <section className={style.section}>
      <div>
        <form className={style.form} onSubmit={handleSubmit}>
          {
            error && Object.keys(newError).length > 0 ? (
              <div className='flex justify-center items-center bg-red-600 py-3 w-full m-auto'>
                <p className='font-bold'>{newError.message}</p>
              </div>
            ) : ''
          }
          <h1 className='text-xl font-bold text-slate-50'>Create poem</h1>
          <div className={style.contaiInput}>
            <input 
              onChange={handlechangue} 
              type="text"
              name='title' 
              placeholder='title...' 
              className={style.input}
            />
          </div>
          <div className='w-full px-4'>
            <textarea 
              onChange={handlechangue} 
              name="text" 
              placeholder='text...' 
              className='text-justify text-white resize-none p-1 outline-none border-none w-full h-52'
            ></textarea>
          </div>
          <button 
            className={style.btn}
          >Create poem</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePoem
