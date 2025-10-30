import { IoMdMoon } from "react-icons/io";
import { FaUser } from "react-icons/fa";



const Navbar = () => {
  return (
    <>
    <div className='nav flex items-center justify-between px-[120px] h-[80px]'>
        <div className='logo'>
            <h3 className='text-[25px] font-bold bg-gradient-to-br from-violet-400  to-purple-600 bg-clip-text text-transparent'>
                WebBuilder
            </h3>

        </div>
        <div className="icons flex items-center gap-[15px]">
            <i className=''><IoMdMoon /></i>
          
            <i className=''><FaUser /></i>
        </div>
    </div>
    </>
  )
}

export default Navbar
