import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { getPoems } from '../redux/feutures/poemsSlice';
import CardPoem from '../components/CardPoem';
import style from '../styles/Poems.module.css';
import Paginacion from '../components/Paginacion';

interface Poem {
  title: string
  text: string
  date: string
  user: {
    username: string
  }
}

const Poems = () => {
  const [page, setPage] = useState(1)
  const forPage = 8
  const dispacth = useAppDispatch()
  const allPoems = useAppSelector(state => state.getPoems)
  const max: number = Math.ceil(allPoems.poem.length / forPage)
  const len: number = allPoems.poem.length

  useEffect(() => {
    dispacth(getPoems())
  }, [dispacth])

  return (
    <section className={style.Poems}>
      <h1 className='mb-6 font-bold text-2xl'>Poems</h1>
      <div className={style.contaiPoems}>
        {
          allPoems.poem.length === 0 ? (
            <div>
              Loading....
            </div>
          ) : (
            allPoems.poem?.slice((page - 1) * forPage, (page - 1) * forPage + forPage).map((p: Poem, i: number) => {
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
          )
        }
      </div>
      {
        len === 0 || len <= 8  ? '' : <Paginacion page={page} max={max} setPage={setPage}></Paginacion>
      }
    </section>
  )
}

export default Poems
