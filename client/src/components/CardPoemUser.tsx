import useImg from '../assets/images/user.jpg';
import style from '../styles/CardPoem.module.css';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

interface Poem {
    _id: string
    title: string
    text: string
    date: string
    user: {
        username: string,
    },
    handleDelete: (id:string) => void
}



const CardPoemUser = ({_id ,title, text, date, user, handleDelete}: Poem) => {
  return (
    <div className={style.card}>
        <div className='py-2'>
            <span className='font-bold text-center text-base'>{title}</span>
        </div>
        <div className='w-full flex flex-1'>
            <p className={style.textPoem}>{text}</p>
        </div>
        <div className={style.contaiUser}>
            <div className={style.userPublic}>
                <img src={useImg} alt={user.username} width={25} className='rounded-full'/>
                {
                    user.username.length > 9 ? <p>{user.username.slice(0,9)}...</p> : <p>{user.username}</p>
                }
            </div>
            <div className={style.date}>
                <span className='font-bold text-sm'>{dayjs(date).fromNow()}</span>
            </div>
        </div>
        <button onClick={() => handleDelete(_id)} className='bg-red-700 text-white w-4/5 rounded-sm mt-1 py-1 font-bold mb-1'>Delete</button>
    </div>
  )
}

export default CardPoemUser
