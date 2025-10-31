import User from "../Models/User.js"

export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUser = req.user
        const currentUserId = req.user.id

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },  //excludes current user
                { $id: { $nin: currentUser.friends } },  //excludes friends
                { isOnboarded: true },
            ]
        })

        res.status(200).json({ recommendedUsers })

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