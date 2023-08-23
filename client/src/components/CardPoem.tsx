import useImg from '../assets/images/user.jpg';
import style from '../styles/CardPoem.module.css';

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
        <div>
            <p className={style.textPoem}>{text}</p>
        </div>
        <div className={style.contaiUser}>
            <div className={style.userPublic}>
                <img src={useImg} alt={user.username} width={25} className='rounded-full'/>
                <p>{user.username}</p>
            </div>
            <div className={style.date}>
                <span>{date}</span>
            </div>
        </div>
    </div>
  )
}

export default CardPoem
