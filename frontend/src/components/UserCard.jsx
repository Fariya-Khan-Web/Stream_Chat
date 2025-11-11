import { MapPin } from 'lucide-react';
import React from 'react';

const UserCard = ({ user, }) => {

    const { fullName, profilePic, nativeLanguage, learningLanguage, bio , location} = user

    return (
        <div className='p-4 rounded-xl bg-base-300/80'>
            <div className='flex items-center gap-2'>
                <img src={profilePic} className='size-13' alt="profile picture" />
                <div>
                    <h2 className='font-semibold text-lg'>{fullName}</h2>
                    <p className='text-sm flex items-center gap-1 '><MapPin className='size-4'/>{location}</p>
                </div>
            </div>
            <div className='space-x-2 my-4'>
                <span className='capitalize px-2 bg-primary rounded-full'>Native: {nativeLanguage}</span>
                <span className='capitalize px-1.5 rounded-full border'>Learning: {learningLanguage}</span>
            </div>

            <p>{bio}</p>



        </div>
    );
};

export default UserCard;