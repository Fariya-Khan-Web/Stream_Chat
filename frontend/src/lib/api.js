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
        console.log(res)
        return res.data
    } catch  {
        return null
    }

}


export const completeOnboarding = async (userData) => {
    const res = await axiosInst.post('/auth/onboarding', userData)
    return res.data

}