import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';

const OnBoarding = () => {

    const {authUser} = useAuthUser()

    const [onBoardedData, setOnBoardedData] = useState({
        fullName: authUser?.fullName||'',
        bio:'',
        profilePic:'',
        nativeLanguage:'',
        learningLanguage:'',
        location:'',
    });


    return (
        <div>
            
        </div>
    );
};

export default OnBoarding;