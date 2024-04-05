import React from 'react';
import NavSideBar from '../NavSideBar'
import Header from '../Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='flex bg-neutral-100 h-screen'>
      <div className='bg-black text-white'><NavSideBar/></div>
      <div className='p-6 bg-black text-white flex flex-col flex-1 overflow-x-auto'>
        <Header/>
        <Outlet/>
      </div>
    </div>
  );
}

export default Layout;
