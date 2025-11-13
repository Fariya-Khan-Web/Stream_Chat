import React from 'react';
import { LANGUAGE_TO_FLAG } from '../constants';
import getLanguageFlag from '../hooks/useFlag';

const FriendCard = ({ friend }) => {

    const { fullName, profilePic, nativeLanguage, learningLanguage } = friend
    console.log({ friend })

    return (
        <div className='p-4 rounded-xl bg-base-300/80'>
            <div className='flex items-center gap-2'>
                <img src={profilePic} className='size-13' alt="profile picture" />
                <h2 className='font-semibold text-lg'>{fullName}</h2>
            </div>


            {/* languages */}
            <div className='space-x-2 my-4'>
                <span className='capitalize badge badge-secondary my-1'>
                    <img
                        className='w-4 h-3'
                        alt={nativeLanguage}
                        src={getLanguageFlag(nativeLanguage)}
                    />
                    Native: {nativeLanguage}
                </span>
                <span className='capitalize badge badge-outline my-1'>
                    <img
                        className='w-4 h-3'
                        alt={learningLanguage}
                        src={getLanguageFlag(learningLanguage)}
                    />
                    Learning: {learningLanguage}
                </span>
            </div>


            {/* message button */}
            <button
                className='btn btn-outline w-full mt-2'
            >
                Messge
            </button>


        </div>
    );
};

export default FriendCard;