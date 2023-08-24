import { FormEvent, useState, ChangeEvent } from 'react'
import { postPoem } from '../redux/feutures/createPoemSlice'
import { useAppDispatch } from '../redux/hook'
import style from '../styles/CreatePoem.module.css'
import { toast } from 'react-toastify'

interface Poem {
  title: string
  text: string
}

const CreatePoem = () => {
  const dispacth = useAppDispatch()

  const [createPoem, setCreatePoem] = useState<Poem>({
    title: '',
    text: ''
  })

  const handlechangue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.currentTarget
    setCreatePoem({...createPoem,[name]: value})
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispacth(postPoem(createPoem))
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

  return (
    <section className={style.section}>
      <div>
        <form className={style.form} onSubmit={handleSubmit}>
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
