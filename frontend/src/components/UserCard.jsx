import { MapPin } from 'lucide-react';
import React from 'react';
import { LANGUAGE_TO_FLAG } from '../constants';

const UserCard = ({ user, }) => {

    const { fullName, profilePic, nativeLanguage, learningLanguage, bio, location } = user
    console.log({ user })

    const getLanguageFlag = (language) => {
        if (!language) return null;

        const langLower = language.toLowerCase();
        const countryCode = LANGUAGE_TO_FLAG[langLower];

        if (countryCode) {
            console.log({ countryCode })
            return (
                <img
                    src={`https://flagcdn.com/24x18/${countryCode}.png`}
                    alt={`${langLower} flag`}
                    className="h-3 mr-1 inline-block"
                />
            );
        }
        return null;
    }

    return (
        <div className='p-4 rounded-xl bg-base-300/80'>
            <div className='flex items-center gap-2'>
                <img src={profilePic} className='size-13' alt="profile picture" />
                <div>
                    <h2 className='font-semibold text-lg'>{fullName}</h2>
                    <p className='text-sm flex items-center gap-1 '><MapPin className='size-4' />{location}</p>
                </div>
            </div>
            <div className='space-x-2 my-4'>
                <span className='capitalize px-2.5 pb-1 bg-primary rounded-full'>{getLanguageFlag(nativeLanguage)}Native: {nativeLanguage}</span>
                <span className='capitalize px-2 pb-1 rounded-full border'>{getLanguageFlag(learningLanguage)}Learning: {learningLanguage}</span>
            </div>

            <p>{bio}</p>


            {/* Action button */}
            <button
                className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                    } `}
                onClick={() => sendRequestMutation(user._id)}
                disabled={hasRequestBeenSent || isPending}
            >
                {hasRequestBeenSent ? (
                    <>
                        <CheckCircleIcon className="size-4 mr-2" />
                        Request Sent
                    </>
                ) : (
                    <>
                        <UserPlusIcon className="size-4 mr-2" />
                        Send Friend Request
                    </>
                )}
            </button>



        </div>
    );
};

export default UserCard;