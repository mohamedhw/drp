import { FaUpLong } from "react-icons/fa6";
import { useState, useEffect } from "react";



const UpButton = () => {

  const [isVisible, setIsVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  useEffect(()=>{
    const toggleVisibility = () => {
      if(window.scrollY > window.innerHeight){
        setIsVisible(true)
      }else{
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [])

  return (
      <button className="btn-up btn-s btn btn-success" style={{display: isVisible? "block": "none"}} onClick={scrollTop}><FaUpLong /></button>
  )
}

export default UpButton;
