import { ShipWheelIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login, signup } from '../lib/api';
import toast from 'react-hot-toast';

const LoginPage = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const queryClient = useQueryClient()

    const { mutate: loginMutation, isPending } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            toast.success("Logged in successfully")
        }
    })


    const handleLogin = (e) => {
        e.preventDefault()
        loginMutation(loginData)
    }

    return (
        <div className="signup-page">
            <div className='signup-content'>

                <div className='w-full p-6 md:p-8'>
                    {/* logo */}
                    <div className='flex items-center gap-2 text-3xl py-6'>
                        <ShipWheelIcon className='size-9 text-primary' />
                        <h2 className='font-mono fond-bold  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Streamify</h2>
                    </div>

                    {/* form */}
                    <div className="w-full">
                        <form onSubmit={handleLogin}>
                            <div className="space-y-7">
                                <div>
                                    <h2 className="text-xl font-semibold">Create an Account</h2>
                                    <p className="text-sm opacity-70">
                                        Join Streamify and start your language learning adventure!
                                    </p>
                                </div>

                                <div className="space-y-5">

                                    {/* EMAIL */}
                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="john@gmail.com"
                                            className="input input-bordered rounded-3xl w-full"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            required
                                        />
                                    </div>


                                    {/* PASSWORD */}
                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="********"
                                            className="input input-bordered rounded-3xl w-full"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            required
                                        />
                                   
                                    </div>

                                </div>

                                <button className="btn btn-primary w-full" type="submit">
                                    {isPending ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Loading...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                                <div className="text-center ">
                                    <p className="text-sm">
                                        Don't have an account?{" "}
                                        <Link to="/signup" className="text-primary hover:underline">
                                            Create one
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

                {/* img */}
                <div className="hidden lg:flex w-full bg-primary/10 items-center justify-center">
                    <div className="max-w-md p-8">
                        {/* Illustration */}
                        <div className="relative aspect-square max-w-sm mx-auto">
                            <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
                        </div>

                        <div className="text-center space-y-3 mt-6">
                            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
                            <p className="opacity-70">
                                Practice conversations, make friends, and improve your language skills together
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;