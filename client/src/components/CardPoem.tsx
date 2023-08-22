import useImg from '../assets/images/user.jpg'

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
    <div>
        <div>
            <span>{title}</span>
        </div>
        <div>
            <p>{text}</p>
        </div>
        <div>
            <div>
                <img src={useImg} alt={user.username} width={30} className='rounded-full'/>
                <p>{user.username}</p>
            </div>
            <div>
                <span>{date}</span>
            </div>
        </div>
    </div>
  )
}

export default CardPoem
