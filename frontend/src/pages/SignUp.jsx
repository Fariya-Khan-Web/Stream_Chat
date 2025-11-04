import { ShipWheelIcon } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

const SignUp = () => {

    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleSignup = () => {

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

                    <div className="w-full">
                        <form onSubmit={handleSignup}>
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold">Create an Account</h2>
                                    <p className="text-sm opacity-70">
                                        Join Streamify and start your language learning adventure!
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {/* FULLNAME */}
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="input input-bordered w-full"
                                            value={signupData.fullName}
                                            onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    {/* EMAIL */}
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="john@gmail.com"
                                            className="input input-bordered w-full"
                                            value={signupData.email}
                                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    {/* PASSWORD */}
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="********"
                                            className="input input-bordered w-full"
                                            value={signupData.password}
                                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                            required
                                        />
                                        <p className="text-xs opacity-70 mt-1">
                                            Password must be at least 6 characters long
                                        </p>
                                    </div>

                                    <div className="form-control">
                                        <label className="label cursor-pointer justify-start gap-2">
                                            <input type="checkbox" className="checkbox checkbox-sm" required />
                                            <span className="text-xs leading-tight">
                                                I agree to the{" "}
                                                <span className="text-primary hover:underline">terms of service</span> and{" "}
                                                <span className="text-primary hover:underline">privacy policy</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <button className="btn btn-primary w-full" type="submit">Create Account
                                    {/* {isPending ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Loading...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )} */}
                                </button>

                                <div className="text-center mt-4">
                                    <p className="text-sm">
                                        Already have an account?{" "}
                                        {/* <Link to="/login" className="text-primary hover:underline">
                                            Sign in
                                        </Link> */}
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <div className=''>Login</div>
            </div>
        </div>
    );
};

export default SignUp;