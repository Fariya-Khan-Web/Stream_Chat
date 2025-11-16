import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
    StreamVideo,
    StreamVideoClient,
    StreamCall,
    CallControls,
    SpeakerLayout,
    StreamTheme,
    CallingState,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";

import useAuthUser from '../hooks/useAuthUser';
import { getStreamToken } from '../lib/api';
import toast from 'react-hot-toast';
import PageLoader from '../components/PageLoader'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const CallPage = () => {

    const { id: callId } = useParams()
    const [call, setCall] = useState(null)
    const [client, setClient] = useState(null)
    const [isConnecting, setIsConnecting] = useState(true)

    const { authUser } = useAuthUser()

    const { data, isLoading } = useQuery({
        queryKey: ['streamToken'],
        queryFn: getStreamToken,
        enabled: !!authUser //turns value into boolean
    })

    useEffect(() => {
        const initCall = async () => {
            if (!authUser || !data.token || !callId) return

            try {
                console.log('Initializing Stream call client')

                const user = {
                    id: authUser?._id,
                    name: authUser?.fullName,
                    image: authUser?.profilePic
                }

                const videoClient = new StreamVideoClient({
                    apiKey: STREAM_API_KEY,
                    user,
                    token: data?.token
                })

                const callInstance = videoClient.call('default', callId)
                await callInstance.join({ create: true })

                console.log('Joined call successfully')

                setClient(videoClient)
                setCall(callInstance)
            } catch (error) {
                console.log("Error joining call:", error)
                toast.error("Couldn't join call, try again")
            } finally {
                setIsConnecting(false)
            }
        }
        initCall()
    }, [authUser, callId, data])

    if (isConnecting || isLoading) return <PageLoader />

    return (
        <div className='h-screen flex-center'>
            <div className='relative'>
                {
                    client && call ?
                        <StreamVideo client={client}>
                            <StreamCall call={call}>
                                <CallContent />
                            </StreamCall>
                        </StreamVideo>
                        : (
                            <div className='h-full flex-center'>
                                <p>Could not initialize call. Please refresh or try again later.</p>
                            </div>
                        )
                }
            </div>
        </div>
    );
};


const CallContent = () => {

    const { useCallCallingState } = useCallStateHooks()
    const callingState = useCallCallingState()

    const navigate = useNavigate()

    if (callingState === CallingState.LEFT) return navigate('/')

    return (
        <StreamTheme>
            <SpeakerLayout />
            <CallControls />
        </StreamTheme>
    )
}


export default CallPage;