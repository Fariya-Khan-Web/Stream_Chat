import axiosInst from "./axios"

export const signup = async (signupData) => {
    const res = await axiosInst.post('auth/signup', signupData)
    return res.data
}


export const login = async (loginData) => {
    const res = await axiosInst.post('auth/login', loginData)
    return res.data
}

export const logout = async () => {
    const res = await axiosInst.post('auth/logout')
    return res.data
}


export const getAuthUser = async () => {
    try {
        const res = await axiosInst.get('/auth/me')
        return res.data
    } catch {
        return null
    }
}


export const completeOnboarding = async (userData) => {
    const res = await axiosInst.post('/auth/onboarding', userData)
    return res.data
}


export const getMyFriends = async () => {
    const res = await axiosInst.get('users/friends')
    return res.data
}

export const getRecommendedUsers = async () => {
    const res = await axiosInst.get('/users')
    return res.data
}


export const sendFriendReq = async (id) => {
    const res = await axiosInst.post(`users/friendReq/${id}`)
    return res.data
}

export const getSentRequests = async () => {
    const res = await axiosInst.get(`/users/outgoingReqs`)
    return res.data
}

export const getRequests = async () => {
    const res = await axiosInst.get('/users/friendReqs')
    return res.data
}

export const acceptRequest = async (id) => {
    const res = await axiosInst.put(`/friendReq/${id}/accept`)
    return res.data
}