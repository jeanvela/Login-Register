import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { getPoemsUser } from '../redux/feutures/poemsUserSlice'
import CardPoem from '../components/CardPoem'

interface Poem {
  title: string
  text: string
  date: string
  user: {
    username: string
  }
}

const UserPoems = () => {
  const dispacth = useAppDispatch()
  const allPoemsUser = useAppSelector(state => state.getPoemsUser.poems)
  console.log(allPoemsUser)
  useEffect(() => {
    dispacth(getPoemsUser())
  }, [dispacth])

  return (
    <section className='py-16 px-4 grid place-items-center'>
      <div className='flex flex-wrap w-full max-[width]:1400px gap-4 px-2.5 justify-center items-center'>
        {
          allPoemsUser?.map((poem: Poem, i: number) => {
            return (
              <CardPoem
                key={i}
                text={poem.text}
                title={poem.title}
                date={poem.date}
                user={poem.user}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default UserPoems
