import axiosInst from "./axios"

export const signup = async (signupData) => {
    const res = await axiosInst.post('auth/signup', signupData)
    return res.data
}