import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import toast from 'react-hot-toast';
import { Earth, EarthIcon, EarthLock, EarthLockIcon, LoaderIcon, MapIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, WebhookIcon, WholeWordIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';

const OnBoarding = () => {

    const { authUser } = useAuthUser()
    const queryClient = useQueryClient()


    const [onBoardedData, setOnBoardedData] = useState({
        fullName: authUser?.fullName || '',
        bio: '',
        profilePic: authUser?.profilePic || '',
        nativeLanguage: '',
        learningLanguage: '',
        location: '',
    });

    const { mutate: onBoardingMutation, isPending } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            toast.success("Profile onboarded successfully")
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        }
    })

    const handleOnBoarding = (e) => {
        e.preventDefault()
        onBoardingMutation(onBoardedData)
    }

    const handleGenerate = () => {
        const idx = Math.floor(Math.random() * 100) + 1 //generates number between 1-100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
        const newOnBoardedData = { ...onBoardedData, profilePic: randomAvatar }

        setOnBoardedData(newOnBoardedData)
        toast.success("Random profile picture generated!");
    }

    return (
        <div className="signup-page">
            <div className=' border border-primary/25 p-6 md:p-12 w-full md:max-w-xl lg:max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
                <div className="w-full">
                    <div className='col-center text-center space-y-6 mb-6'>
                        <h2 className="text-2xl font-semibold">Complete Your Profile</h2>
                        <div className="text-sm opacity-70">
                            {onBoardedData.profilePic ? (
                                <img
                                    src={onBoardedData.profilePic}
                                    alt="Profile Preview"
                                    className="size-30 object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <CameraIcon className="size-12 text-base-content opacity-40" />
                                </div>
                            )}
                            {/* <img src={authUser.profilePic} className='size-30' alt="Profile Picture" /> */}
                        </div>
                        <button
                            onClick={handleGenerate}
                            className='btn btn-primary rounded-full'>
                            <ShuffleIcon className='size-4 md:size-6' /> Generate Random Avatar
                        </button>
                    </div>
                    <form onSubmit={handleOnBoarding}>
                        <div className="space-y-4">

                            <div className="space-y-3">
                                {/* FULLNAME */}
                                <div className="form-control w-full space-y-2">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name='fullName'
                                        value={onBoardedData.fullName}
                                        className="input input-bordered rounded-3xl w-full"
                                        onChange={(e) => setOnBoardedData({ ...onBoardedData, fullName: e.target.value })}
                                        placeholder='Your Fullname'
                                        required
                                    />
                                </div>


                                {/* Bio */}
                                <div className="form-control w-full space-y-2">
                                    <label className="label">
                                        <span className="label-text">Bio</span>
                                    </label>
                                    <textarea
                                        type="text"
                                        name='bio'
                                        value={onBoardedData.bio}
                                        className="textarea rounded-3xl w-full"
                                        onChange={(e) => setOnBoardedData({ ...onBoardedData, bio: e.target.value })}
                                        placeholder="Tell others about yourself and your language learning goal"
                                        required
                                    />
                                </div>

                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5' >


                                    {/* Native */}
                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Native Language</span>
                                        </label>
                                        <select
                                            name='nativeLanguage'
                                            value={onBoardedData.nativeLanguage}
                                            className="input input-bordered rounded-3xl w-full"
                                            onChange={(e) => setOnBoardedData({ ...onBoardedData, nativeLanguage: e.target.value })}
                                            required
                                        >
                                            <option disabled value="">Select your native language</option>
                                            {LANGUAGES.map((lang, index) => (
                                                <option key={index} value={lang.toLowerCase()}>{lang}</option>
                                            ))}
                                        </select>
                                    </div>


                                    {/* Learning */}
                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Learning Language</span>
                                        </label>
                                        <select
                                            name='learningLanguage'
                                            value={onBoardedData.learningLanguage}
                                            className="input input-bordered rounded-3xl w-full"
                                            onChange={(e) => setOnBoardedData({ ...onBoardedData, learningLanguage: e.target.value })}
                                            required
                                        >
                                            <option disabled value="">Select your learning language</option>
                                            {LANGUAGES.map((lang, index) => (
                                                <option key={index} value={lang.toLowerCase()}>{lang}</option>
                                            ))}
                                        </select>
                                    </div>


                                </div>

                                {/* LOCATION */}
                                <div className="form-control w-full space-y-2">
                                    <label className="label">
                                        <span className="label-text">Location</span>
                                    </label>
                                    <div className='relative'>
                                        <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                                        <input
                                            type="text"
                                            name='location'
                                            className="input input-bordered rounded-3xl w-full"
                                            value={onBoardedData.location}
                                            placeholder='City, Country'
                                            onChange={(e) => setOnBoardedData({ ...onBoardedData, location: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>

                            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
                                {isPending ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Onboarding...
                                    </>
                                ) : (
                                    <>
                                        <EarthLockIcon className='size-5 md:size-6' />
                                        Complete Onboarding
                                    </>
                                )}
                            </button>


                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default OnBoarding;