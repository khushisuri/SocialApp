import User from "../modules/User.js";

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    const isFriend = user.friends.filter((f) => f.equals(friend._id));
    if (isFriend.length > 0) {
      user.friends = user.friends.filter((f) => !f.equals(friend._id))
      friend.friends = friend.friends.filter((f) => !f.equals(friend._id))
    } else {
      user.friends.push(friend._id)
      friend.friends.push(user._id)
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
