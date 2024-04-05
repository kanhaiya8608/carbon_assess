import React from 'react'
import WalletConnector from './WalletConnector'
function Header() {
  return (
    <div className='flex md:flex-row flex-col justify-between mb-6'>
      <div>
    <h3 className='text-xl md:text-2xl font-semibold '>Hello, <span className='bg-gradient-to-r from-lime-500 via-yellow-500 to-green-500 inline-block text-transparent bg-clip-text'>Kanhaiya Verma</span> 👋</h3>
    <p className='text-xl'>Welcome to <span className='text-green-500' > Spot Trading!</span></p>
    </div>
    <div className='flex-grow'></div>
<WalletConnector/>
  </div>
  )
}

export default Header