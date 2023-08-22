import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { getPoems } from '../redux/feutures/poemsSlice';
import CardPoem from '../components/CardPoem';

interface Poem {
  title: string
  text: string
  date: string
  user: {
    username: string
  }
}

const Poems = () => {
  const dispacth = useAppDispatch()
  const allPoems = useAppSelector(state => state.getPoems)
  console.log(allPoems.poem)
  useEffect(() => {
    dispacth(getPoems())
  }, [dispacth])

  return (
    <section>
      <div>
        {
          allPoems.poem?.map((p: Poem, i: number) => {
            return (
              <CardPoem
                key={i}
                title={p.title}
                text={p.text}
                date={p.date}
                user={p.user}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default Poems
