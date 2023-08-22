import { FormEvent, useState, ChangeEvent } from 'react'
import { postPoem } from '../redux/feutures/createPoemSlice'
import { useAppDispatch } from '../redux/hook'

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
  }

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handlechangue} 
            type="text"
            name='title' 
            placeholder='title...' 
            className='text-gray-900'
          />
          <textarea 
            onChange={handlechangue} 
            name="text" 
            cols={20} rows={10} 
            placeholder='text...' 
            className='text-slate-900'
          ></textarea>
          <button className='bg-lime-600 px-3 py-2'>Create poem</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePoem
