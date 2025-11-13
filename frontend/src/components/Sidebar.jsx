import React from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router';
import { Bell, Home, ShipWheelIcon, UsersIcon } from 'lucide-react';

const Sidebar = () => {

    const { authUser } = useAuthUser()

    const location = useLocation()
    const currentPath = location.pathname

    return (
        <aside className="w-64 bg-base-300 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
            {/* logo */}
            <div className='flex items-center gap-2 text-3xl py-6 p-5'>
                <ShipWheelIcon className='size-9 text-primary' />
                <h2 className='font-mono fond-bold  bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary'>StreamChat</h2>
            </div>

            {/* routes */}
            <nav className='p-2 py-10 grow'>
                <Link
                    to={'/'}
                    className={`flex gap-2 p-3 w-full rounded-3xl my-4 hover:bg-gray-700/30 hover:-translate-y-0.5
                ${currentPath === '/' && 'bg-gray-700/60 shadow-2xl'}`}><Home />Home</Link>

                <Link
                    to={'/friends'}
                    className={`flex gap-2 p-3 w-full rounded-3xl my-4 hover:bg-gray-700/30 hover:-translate-y-0.5 
                ${currentPath === '/friends' && 'bg-gray-700/60 shadow-2xl'}`}><UsersIcon /> Friends</Link>

                <Link
                    to={'/notifications'}
                    className={`flex gap-2 p-3 w-full rounded-3xl my-4 hover:bg-gray-700/30 hover:-translate-y-0.5 
                ${currentPath === '/notifications' && 'bg-gray-700/60 shadow-2xl'}`}><Bell />Notifications</Link>

            </nav>



            {/* profile */}
            <div className='flex gap-3 p-4 py-5 items-center'>
                <div className='rounded-full'>
                    <img className='size-10 rounded-full' src={authUser.profilePic} alt="Profile pic" />
                </div>
                <div>
                    <h3 className='font-semibold text-lg'>{authUser.fullName}</h3>
                    <p className='text-sm text-success flex items-center gap-1'>
                        <span className='bg-success rounded-full size-2 inline-block' />
                        Online
                    </p>
                </div>
                <div>

                </div>

            </div>

        </aside>
    );
};

export default Sidebar;