import { ShipWheelIcon } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

const SignUp = () => {

    const [accInfo, setAccInfo] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const handleSubmit = () => {

    }

    return (
        <div className="signup-page px-36">
            <div className='signup-content'>

                <div className='w-full p-6 md:p-8'>
                    {/* logo */}
                    <div className='flex items-center gap-2 text-3xl py-6'>
                        <ShipWheelIcon className='size-9 text-primary' />
                        <h2 className='font-mono fond-bold  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Streamify</h2>
                    </div>

                    <div className='w-full p-4'>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <label className="label text-base">Fullname</label>
                                <input type="email" className="input w-full rounded-3xl mb-3" placeholder="Email" />
                                <label className="label text-base">Email</label>
                                <input type="email" className="input w-full rounded-3xl mb-3" placeholder="Email" />
                                <label className="label text-base">Password</label>
                                <input type="password" className="input w-full rounded-3xl" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4 rounded-3xl">Login</button>
                            </fieldset>
                        </form>
                    </div>
                </div>


                <div className=''>Login</div>
            </div>
        </div>
    );
};

export default SignUp;