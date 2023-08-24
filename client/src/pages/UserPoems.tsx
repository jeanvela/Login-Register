import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { getPoemsUser } from '../redux/feutures/poemsUserSlice'
import Paginacion from '../components/Paginacion'
import CardPoemUser from '../components/CardPoemUser'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import axios from 'axios'

interface Poem {
  _id: string
  title: string
  text: string
  date: string
  user: {
    username: string
  }
}

const UserPoems = () => {
  const dispacth = useAppDispatch()
  const [page, setPage] = useState(1)
  const forPage = 8
  const allPoemsUser = useAppSelector(state => state.getPoemsUser.poems)
  const max = Math.ceil(allPoemsUser.length / forPage)

  const handleDelete = async (id: string) => {
    try {
        const token = Cookies.get()
        const response = await axios.delete(`http://localhost:3001/api/poems/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        dispacth(getPoemsUser())
        toast.success('Poem delete exit', {
            position: 'top-center',
            autoClose: 3000,
            pauseOnHover: false,
            closeOnClick: false,
            theme: 'light',
        })
        return response.status
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
        } else {
            throw error
        }
    }
}

  useEffect(() => {
    dispacth(getPoemsUser())
  }, [dispacth])

  return (
    <section className='py-16 px-4 grid place-items-center'>
      <h1 className='font-bold text-2xl mb-6'>My poems</h1>
      <div className='flex flex-wrap w-full max-[width]:1400px gap-4 px-2.5 justify-center items-center'>
        {
          allPoemsUser.length === 0 ? (
            <div>
              <h1 className='text-5xl font-bold text-center'>You have no poems yet to show.</h1>
            </div>
          ) : (
            allPoemsUser?.slice((page - 1) * forPage, (page - 1) * forPage + forPage).map((poem: Poem, i: number) => {
              return (
                <CardPoemUser
                  key={i}
                  _id={poem._id}
                  text={poem.text}
                  title={poem.title}
                  date={poem.date}
                  user={poem.user}
                  handleDelete={handleDelete}
                />
              )
            })
          )
        }
      </div>
        {
          allPoemsUser.length === 0 || allPoemsUser.length <= 8 ? '' : <Paginacion max={max} setPage={setPage} page={page} />
        }
    </section>
  )
}

export default UserPoems
