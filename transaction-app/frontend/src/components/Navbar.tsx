import Image from "next/image";
import React from "react";
import {HiMenuAlt4} from "react-icons/hi";
import {AiOutlineClose} from 'react-icons/ai'

const NavItem = ({children, classProps}: { children: React.ReactNode, classProps: string }) => {
  return <li className={`text-white text-lg cursor-pointer hover:text-gray-400 ${classProps}`}>
    {children}
  </li>
}

const Navbar = () => {
  const [toggle, setToggle] = React.useState(false)
  return <nav className={'w-full flex md:justify-center justify-between items-center p-4'}>
    <div className={'md:flex-[0.5] flex-initial'}>
      <Image src={'/images/logo.png'} alt={'logo'} width={300} height={300} className={'w-32 cursor-pointer'} />
    </div>
    <ul className={'text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'}>
      {['Market', 'Exchange', 'Wallet', 'Tutorials'].map((item, index) => (
          <NavItem classProps={''} key={item + index}>
            {item}
          </NavItem>
          ))}
      <li className={'bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'}>
        Login
      </li>
    </ul>
    <div className={'flex relative'}>
      {toggle ? (
          <AiOutlineClose fontSize={28} className={'text-white md:hidden cursor-pointer'} onClick={() => setToggle(false)}/>
            ) : (
        <HiMenuAlt4 fontSize={28} className={'text-white md:hidden cursor-pointer'} onClick={() => setToggle(true)}/>
      )}
      {toggle && (
          <ul className={'z-10 fixed top-0 -right-2 p-3' +
              ' w-[70vw] h-screen md:hidden ' +
              'list-none flex flex-col justify-start' +
              ' items-end rounded-md ' +
              'blue-glassmorphism text-white animate-slide-in' +
              ''}>
              <li className={'text-xl w-full my-2'}>
                <AiOutlineClose fontSize={28} className={'text-white cursor-pointer'} onClick={() => setToggle(false)}/>
              </li>
            {['Market', 'Exchange', 'Wallet', 'Tutorials'].map((item, index) => (
                <NavItem classProps={'my-2 text-lg'} key={item + index}>
                  {item}
                </NavItem>
            ))}
          </ul>
      )}
    </div>
  </nav>
};

export default Navbar;
