import React from 'react';
import { getAuthUser } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
    const authUser = useQuery({
        queryKey: ['auth'],
        queryFn: getAuthUser,
        retry: false
    })

    return {isLoading: authUser.isLoading, authUser: authUser.data?.user }
};

export default useAuthUser;