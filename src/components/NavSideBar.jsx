import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { RiArrowLeftSLine, RiArrowRightSLine, RiHistoryLine,  RiWallet3Fill  } from 'react-icons/ri';
import { MdBusinessCenter} from "react-icons/md";

import { FaSearch, FaBell, FaUser, FaCog, FaQuestionCircle } from 'react-icons/fa';
import logo1 from '../assets/logo2.png';
import logo2 from '../assets/logo.png';
import { BiDotsVerticalRounded } from "react-icons/bi";
const NavSideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const menuItems = [
    { text: 'Home', color: '#7AC555', icon: <FaSearch /> },
    { text: 'Organization', color: '#7AC555', icon: <FaBell />, active: true }, // Set 'active' to true for the 'Organization' item
    { text: 'Assets', color: '#E4CCFD', icon: <FaCog /> },
    { text: 'Trade', color: '#76A5EA', icon: <MdBusinessCenter />  },
    { text: 'History', color: '#76A5EA', icon: <RiHistoryLine />  },
    { text: 'Wallet', color: '#76A5EA', icon: < RiWallet3Fill /> },
  ];
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ display: 'flex', overflowY: 'hidden', height: '100vh' }}>
      <Sidebar className="scrollbar-hide" backgroundColor="#000" collapsed={collapsed}>
        <div className='flex flex-col justify-between h-full'>
          <div>
            <Menu className="py-2" >
              <MenuItem 
                prefix={<img src={collapsed ? logo2 : logo1} className={collapsed ? 'h-10 w-auto' : 'h-10 w-25'} alt="logo" />}
                icon={collapsed ? <img src={logo2} alt="collapsed logo" /> : null}
                onClick={() => setCollapsed(!collapsed)}
                suffix={collapsed ? <RiArrowRightSLine size={24} /> : <RiArrowLeftSLine size={24} />}
              />
              {menuItems.map((item, index) => (
                <MenuItem 
                className={`${item.active ? 'text-green-500' : 'text-gray-400'} hover:text-green-500`}
                key={index}
                icon={item.icon}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                }}
              >
                  <div className="inline w-[56px]">{item.text}</div>
                </MenuItem>
              ))}
            </Menu>
          </div>
          {!collapsed && (
            <div className="mt-auto py-6">
              <Menu className='py-8'>
                <MenuItem className='text-gray-400 hover:text-green-500' icon={<FaBell />}>Notifications</MenuItem>
                <MenuItem className='text-gray-400 hover:text-green-500' icon={<FaCog />}>Settings</MenuItem>
                <MenuItem className='text-gray-400 hover:text-green-500' icon={<FaQuestionCircle />}>Support</MenuItem>
              </Menu>
              <div className=" w-full max-w-md flex-shrink-0">
                <div className="text-left bg-stone-900 rounded-md p-2 m-2 flex justify-between content-center">
                  <div className="mx-auto max-w-xs content-center">
                    <FaUser size={20} color="#fff" />
                  </div>
                  <div className="mx-auto max-w-xs px-4">
                    <p className="text-sm font-bold text-white mt-1">Kanhaiya Verma</p>
                    <p className="mt-1 text-xs leading-4 text-gray-500">kanhaiya831998@gmail.com</p>
                  </div>
                  <div className="mx-auto max-w-xs content-center">
                  <BiDotsVerticalRounded size={24} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default NavSideBar;