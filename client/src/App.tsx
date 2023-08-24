import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './redux/hook';
import { profile } from './redux/feutures/loginUpSclice';
import Cookies from 'js-cookie';
import Poems from './pages/Poems';
import UserPoems from './pages/UserPoems';
import CreatePoem from './pages/CreatePoem';
import ProtectedRouter from './components/ProtectedRouter';
import NotFound from './pages/NotFound';

function App() {
  const dispacth = useAppDispatch()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const userToken = Cookies.get()
    if (userToken.token) {
      setIsAuth(true)
      dispacth(profile(userToken.token))
    } else {
      setIsAuth(false)
    }
  },[dispacth, isAuth])
  
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Poems />}/>
          <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
          <Route path='/register' element={<Register setIsAuth={setIsAuth} />}/>
          <Route element={<ProtectedRouter isAuth={isAuth}></ProtectedRouter>}>
            <Route path='/my-poems' element={<UserPoems />}/>
            <Route path='/create-poem' element={<CreatePoem />}/>
          </Route>
          <Route path='/poems/:id' element={<h1>Hola mundo6</h1>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
  </BrowserRouter>
  )
}

export default App
