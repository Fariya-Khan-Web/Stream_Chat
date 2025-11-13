import FriendRequest from "../Models/FriendRequest.js"
import User from "../Models/User.js"

export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUser = req.user
        const currentUserId = req.user.id

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },  //excludes current user
                { _id: { $nin: currentUser.friends } },  //excludes friends
                { isOnboarded: true },
            ]
        })

        res.status(200).json(recommendedUsers)

    } catch (error) {
        console.log("Error in getRecommendedUsers controller:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const getMyFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends)
    } catch (error) {
        console.log("Error in getMyFriends controller:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const sendFriendReq = async (req, res) => {
    try {

        const myId = req.user.id
        const { id: recipientID } = req.params

        // checks
        if (myId === recipientID) {
            return res.status(400).json({ message: "You can't send friend request to yourself" });
        }

        const recipient = await User.findById(recipientID);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        // check if user is already friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }

        const existingReq = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientID },
                { sender: recipientID, recipient: myId }
            ]
        })
        if (existingReq) {
            return res.status(400).json({ message: "A friend request already exists between you and this user" })
        }


        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientID
        })
        res.status(200).json(friendRequest)


    } catch (error) {
        console.log("Error in sendFriendReq controller:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const acceptRequest = async (req, res) => {
    try {
        const myId = req.user.id
        const { id } = req.params

        const request = await FriendRequest.findById(id)
        if (!request) return res.status(404).json({ message: "Friend request not found" })

        if (request.recipient.toString() !== myId) {
            res.status(403).json({ message: "User not authorized to accept this request" })
        }

        request.status = "accepted"
        await request.save()

        // adding each other to their friend list
        await User.findByIdAndUpdate(request.sender, {
            $addToSet: { friends: request.recipient } // only add if it doesn't exist already
        })
        await User.findByIdAndUpdate(request.recipient, {
            $addToSet: { friends: request.sender }
        })

    } catch (error) {
        console.log("Error in acceptRequest controller:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const getRequest = async (req, res) => {
    try {
        const myId = req.user.id

        const reqForMe = await FriendRequest.find({
            recipient: myId,
            status: "pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptedReq = await FriendRequest.find({
            sender: myId,
            status: "accepted"
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({ reqForMe, acceptedReq })
    } catch (error) {
        console.log("Error in getRequests controller:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getSentRequests = async (req, res) => {
    try {
        const myId = req.user.id

        const myPendingReq = await FriendRequest.find({
            sender: myId,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(myPendingReq)

    } catch (error) {
        console.log("Error in getSentReq controller:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}