import { useParams } from 'react-router';
import { getStreamToken } from '../lib/api';
import useAuthUser from '../hooks/useAuthUser';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelHeader, MessageList, MessageInput, Window, Thread, } from "stream-chat-react";
import toast from 'react-hot-toast';
import CallButton from '../components/CallButton';
import ChatLoader from '../components/ChatLoader';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {

    const [chatClient, setChatClient] = useState(null)
    const [channel, setChannel] = useState(null);
    const [loading, setloading] = useState(true);

    const { id: targetUserId } = useParams()
    const { authUser } = useAuthUser()

    // will only run when authUser is available
    const { data } = useQuery({
        queryKey: ['streamToken'],
        queryFn: getStreamToken,
        enabled: !!authUser //turns value into boolean
    })

    useEffect(() => {

        const initChat = async () => {
            if (!authUser || !data.token || !targetUserId) return

            try {
                console.log("Initializing stream chat client...")

                const client = StreamChat.getInstance(STREAM_API_KEY)

                await client.connectUser(
                    {
                        id: authUser._id,
                        name: authUser.fullName,
                        image: authUser.profilePic
                    },
                    data.token
                )

                const channelId = [authUser._id, targetUserId].sort().join('-')

                const currentChannel = client.channel('messaging', channelId, {
                    members: [authUser._id, targetUserId],
                })

                await currentChannel.watch()

                setChatClient(client)
                setChannel(currentChannel)

            } catch (error) {
                console.error("Error initializing chat:", error);
                toast.error("Could not connect to chat. Please try again.");
            } finally {
                setloading(false)
            }
        }
        initChat()

    }, [authUser, data, targetUserId])

    const handleVideoCall = () => {
        if(channel){
            const callUrl = `${window.location.origin}/call/${channel.id}`

            channel.sendMessage({
                text: `I've created a call. Join me here - ${callUrl}`
            })

            toast.success("video call link sent successfully")
        }
    }


    if (loading || !chatClient || !channel) return <ChatLoader />;

    return (
        <div className="h-[93vh]">

            <Chat client={chatClient}>
                <Channel channel={channel}>
                    <div className="w-full relative">
                        <CallButton
                            handleVideoCall={handleVideoCall}
                        />
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput focus />
                        </Window>
                    </div>
                    <Thread />
                </Channel>
            </Chat>

        </div>
    );
};

export default ChatPage;