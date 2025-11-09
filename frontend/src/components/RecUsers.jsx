import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getRecommendedUsers } from '../lib/api';

const RecUsers = () => {


    const { data: recUsers=[] } = useQuery({
        queryKey: ['recUsers'],
        queryFn: getRecommendedUsers,
    })

    console.log({ recUsers })


    return (
        <div>
            Recommended Users
        </div>
    );
};

export default RecUsers;