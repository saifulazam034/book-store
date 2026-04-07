import React, { useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AllBooks from './pages/AllBooks';
import ViewDetail from './components/ViewDetail';
import {useDispatch, useSelector} from'react-redux';
import { authActions } from './store/auth';
import Favourites from './profiles/Favourites';
import UserProfileHistory from './profiles/UserProfileHistory';
import Setting from './profiles/Setting';
import AllOrder from './pages/AllOrder';
import AddBooks from './pages/AddBooks';
import UpdateBook from './pages/UpdateBook';
function App() {
  const dispatch= useDispatch();
  const role= useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changerole(localStorage.getItem("role")))
    }

  },[])
  return (
    <div >
    
      <Navbar/>
       <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/all-books' element={<AllBooks/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/cart' element={<Cart/>}/>

      <Route path='/profile' element={<Profile/>}>
      {role==="user" ?(<Route  index element={<Favourites/>}/>):(<Route index element={<AllOrder/>}/>)}
      {role ==="admin" && (<Route path='/profile/add-book' element={<AddBooks/>}/>)} 
        <Route path='/profile/orderhistory' element={<UserProfileHistory/>}/>
         <Route path='/profile/settings' element={<Setting/>}/>
       </Route>
 <Route path="/updateBook/:id" element={<UpdateBook/>}/>
      <Route path='/book/:id' element={<ViewDetail/>}/>
     
     </Routes>
      <Footer/>
    </div>
  );
}

export default App;
