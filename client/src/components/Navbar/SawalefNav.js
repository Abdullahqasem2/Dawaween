import React,{useState,useEffect} from 'react'
import "./NavBar.css"
import {navigate} from '@reach/router';
import Cookies from 'universal-cookie';

const SawalefNav = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const cookie = new Cookies()   
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
      }
useEffect(() => {
    const changeWidth = () => {
        setScreenWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', changeWidth)
  
      return () => {
          window.removeEventListener('resize', changeWidth)
      }
  
}, [])

const homeHandler=()=>{
    navigate("/")
}
const profileHandler=()=>{
    navigate("/user/"+ cookie.get('user').user._id)
}

    return (
        <nav>
        {
         (toggleMenu || screenWidth > 500)&&(<ul className="list">
                 <ui className="items" onClick={homeHandler}>Home</ui>
                 <ui className="items"onClick={profileHandler}>Profile  </ui>
              
        </ul>
         )}
        <button className="btn" onClick={toggleNav}>MENU</button>
    
    </nav>
    )
}

export default SawalefNav
