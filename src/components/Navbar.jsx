import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';

const Navbar = ({ resultRef }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const [message, setMessage] = useState('');
  const [isHome, setIsHome] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isCharities, setIsCharities] = useState(false);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/q/${message.replace(/ /g,"_")}` )
    }
  };
  const handleClick = () => {
      navigate(`/q/${message.replace(/ /g,"_")}` )
  };
  const onSubmit = (e) => {
    e.preventDefault();

    navigate('all-charities');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };
  
  useEffect(() => {
    var str=window.location.href;
    var n = str.lastIndexOf('/');

    if(str.substring(n + 1)=="profile"){
      setIsProfile(true);
      setIsCharities(false);
      setIsHome(false);
    }else if(str.substring(n + 1)=="all-charities"){
      setIsCharities(true);
      setIsHome(false);
      setIsProfile(false);
    }
    else if(str.substring(n + 1)==""){
      setIsHome(true);
      setIsCharities(false);
      setIsProfile(false);
    }
  }, [location.pathname]);
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[5px] gap-6 ">
      <div className=" lg:flex-1 flex flex-row max-w-[498px]  mb-4 mt-1 py-2 pl-4 pr-2 h-[44px] bg-[#1c1c24] rounded-[100px]">
        <input  type="text" placeholder="Search for charities"  onChange= {handleChange} onKeyDown={handleKeyDown} 
        className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />

        <div onClick={() => { handleClick() }} className="w-[42px] h-full rounded-[20px]  flex justify-center items-center cursor-pointer">
          <img   src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
        </div>
      </div>

      <div className="max-h-16   sm:flex hidden flex-row justify-end gap-4">

      <Link to="/">
          <div className=" justify-center items-center cursor-pointer">
            <p className={` pt-3 pr-2 font-sans text-[14px] mb-10 sm:text-[19px] ${isHome ? 'text-slate-200' : 'text-slate-400'}  hover:text-slate-100 font-medium`}>Home</p>
          </div>
        </Link> 

      <Link to="/profile">
          <div className=" justify-center items-center cursor-pointer">
            <p className={` pt-3 pl-10 font-sans text-[14px] mb-10 sm:text-[19px] ${isProfile ? 'text-slate-200' : 'text-slate-400'} 0 hover:text-slate-100 font-medium`}>Profile</p>
          </div>
        </Link> 
         
        <Link  to="/">
          <div onClick={onSubmit} className=" justify-center items-center cursor-pointer">
            <p className={`sm:px-5 sm:px-10 font-sans pt-3 tracking-tighter text-[14px] ${isCharities ? 'text-slate-200' : 'text-slate-400'} mb-10 sm:text-[19px]  hover:text-slate-100 font-medium`}>Charities</p>
          </div>
        </Link>
        <Link to="/profile">
          <div className="w-[47px] mt-1 pt-1 h-[47px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={thirdweb}  alt="user" className="mb-1 object-contain" />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
        <div className="sm:hidden -mb-4 flex justify-between items-center relative">
        <Link to="/">
        <img src={logo} className='w-[52px] h-[52px]' alt="" />
        </Link>
          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex py-7 w-36 h-[40px] mb-10 mx-4">
            <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }}
            />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar