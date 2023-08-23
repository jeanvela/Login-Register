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
    <header className={style.header}>
        <nav>
            <ul className={style.ul}>
              {
                user.email !== null ? (
                  <>
                    <li><Link to='/' className='font-bold text-base' >Poems</Link></li>
                    <li><Link to='/my-poems' className='font-bold text-base'>My poems</Link></li>
                    <li><Link to='/create-poem' className='font-bold text-base'>Create poem</Link></li>
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
                    <li><Link to='/' className='font-bold text-base'>Poems</Link></li>
                  <li><Link to='/login' className='font-bold text-base'>Login</Link></li>
                  <li><Link to='/register' className='font-bold text-base'>SingUp</Link></li>
                  </>
                )
              }
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
