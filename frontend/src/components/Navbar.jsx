import { Bell, LogOutIcon, PaintRoller, ShipWheelIcon } from 'lucide-react';
import React from 'react';
import useAuthUser from '../hooks/useAuthUser';

const Navbar = () => {

    const { authUser } = useAuthUser()

    return (

        <div className="navbar bg-base-300 shadow-sm">

            {/* logo */}
            <div className="flex-1">
                <div className='flex items-center gap-2 text-3xl lg:hidden'>
                    <ShipWheelIcon className='size-9 text-primary ' />
                    <h2 className='font-mono fond-bold  bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary'>Streamify</h2>
                </div>
            </div>


            <div className="flex-none mx-5">
                <div className='flex items-center'>

                    <div className="btn btn-ghost btn-circle">
                        <div className="indicator">
                           <Bell />
                        </div>
                    </div>
                    <div className="btn btn-ghost btn-circle">
                        <div className="indicator">
                           <PaintRoller />
                        </div>
                    </div>

                    {/* profile */}
                    <div className="btn btn-ghost btn-circle avatar mx-3">
                        <div className="w-10 rounded-full">
                            <img
                                alt={authUser?.fullName}
                                src={authUser?.profilePic} />
                        </div>
                    </div>

                    <button><LogOutIcon /></button>

                </div>


            </div>
        </div>
       
    );
};

export default Navbar;