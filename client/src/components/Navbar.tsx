import { Link } from 'react-router-dom'
import userImg from '../assets/images/user.jpg'
import style from '../styles/Navbar.module.css'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { logout } from '../redux/feutures/loginUpSclice'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const dispacth = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(state => state.loginUp.user)
  const Logout = () => {
    dispacth(logout())
    navigate('/')
  }

  return (
    <header className='bg-sky-950 py-3 font-bold text-slate-950'>
        <nav>
            <ul className='flex justify-center text-center gap-10'>
              {
                user.email !== null ? (
                  <>
                    <li><Link to='/' >Poems</Link></li>
                    <li><Link to='/my-poems' >My poems</Link></li>
                    <li><Link to='/create-poem' >Create poem</Link></li>
                    <li>
                      <div className={style.contaiUser}>
                        <img src={userImg} alt="user" width={30} className='rounded-full'/>
                        <div className={style.contaiInfo}>
                          <button type='submit' onClick={Logout}>Logout</button>
                        </div>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li><Link to='/'>Poems</Link></li>
                  <li><Link to='/login'>Login</Link></li>
                  <li><Link to='/register'>SingUp</Link></li>
                  </>
                )
              }
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
