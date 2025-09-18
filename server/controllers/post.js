import Post from "../modules/Post.js";
import User from "../modules/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId) ;
    const post = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await post.save();
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {

    const { postId } = req.params;
    const { userId } = req.body;
    console.log(postId)
  try {
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log("runs")
    res.status(404).json({ message: err.message });
  }
};
