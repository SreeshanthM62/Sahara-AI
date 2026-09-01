import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, User } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()


    return (
        <div className='fixed z-5 w-full backdrop-blur-sm flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 '>
            
            <img src={assets.sahara_logo} alt="logo" className="w-32 sm:w-44 cursor-pointer hover:scale-105" onClick={() => navigate('/')} />

            
            {user ? <UserButton /> : (
                <button onClick={openSignIn} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F6DF5] to-[#A445F7] text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    Get Started <ArrowRight className='w-4 h-4' />
                </button>

            )}



        </div>
    )
}

export default Navbar
