import axiosInst from "./axios"

export const signup = async (signupData) => {
    const res = await axiosInst.post('auth/signup', signupData)
    return res.data
}


export const getAuthUser = async () => {
    const res = await axiosInst.get('/auth/me')
    console.log(res)
    return res.data

}