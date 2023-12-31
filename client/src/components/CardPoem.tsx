import useImg from '../assets/images/user.jpg';
import style from '../styles/CardPoem.module.css';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

interface Poem {
    title: string
    text: string
    date: string
    user: {
        username: string,
    }
}


const CardPoem = ({title, text, date, user}: Poem) => {
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
    </div>
  )
}

export default CardPoem
