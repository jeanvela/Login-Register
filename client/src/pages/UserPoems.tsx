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
    <section>
      <div>
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
