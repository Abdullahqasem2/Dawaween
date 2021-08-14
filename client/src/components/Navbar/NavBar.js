import React,{useState,useEffect} from 'react'
import "./NavBar.css"
import {navigate} from '@reach/router';
const NavBar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [elementMap,setElementMap]=useState("Map");
    const [elementProfile,setElementProfile]=useState("Profile");
    const [elementStream,setElementStream]=useState("Stream");
    const [loaded, setLoaded]=useState(false);
    const [loadedProfile, setLoadedProfile]=useState(true);
    const [loadedStream, setLoadedStream]=useState(true);
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
const goToMap=()=>{
    navigate("/");
    setElementMap("Map")
    setElementProfile("Profile")
    if(elementMap==="Map"){
        setLoaded(false)
        setLoadedProfile(true)
        setLoadedStream(true)
    }
    }
const goToProfile=()=>{
    navigate("/user/profile");
    if(elementProfile==="Profile"){
        setLoadedProfile(false);
        setLoaded(true);
        setLoadedStream(true);
    }
    
    
    
}
const goToStream=()=>{
    navigate("/stream");
    setElementMap("Map");
    setElementProfile("Profile");
    if(elementStream==="Stream")
    {
        setLoadedProfile(true);
        setLoaded(true);
        setLoadedStream(false);
    }  
}



    return (
       <nav>
           {
            (toggleMenu || screenWidth > 500)&&(<ul className="list">
                    {(loaded&& <ui className="items"onClick={goToMap}>{elementMap}</ui>)}
                    {(loadedProfile&& <ui className="items"onClick={goToProfile}>{elementProfile}  </ui>)}
                    {(loadedStream&&<ui className="items"onClick={goToStream}>{elementStream}</ui>)}
           </ul>
            )}
           <button className="btn" onClick={toggleNav}>MENU</button>
       
       </nav>
    )
}

export default NavBar
