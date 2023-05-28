const User = require("../models/UserModel");
module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else {
        return res.json({ msg: "Movie already added to the liked list." });
      }
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie added suscesfukt" });
  } catch (error) {
    return res.json({ msg: "Error adding movie" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email,"emailll")
    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "succes", movies: user.likedMovies });
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    return res.json({ msg: "Error fetching liked movies" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (movieIndex === -1) res.status(400).send({ msg: "Movie not found" });
      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: likedMovies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie deleted succesfully", movies: likedMovies });

    }
  } catch (error) {
    return res.json({ msg: "Error fetching deleteliked movies" });
  }
};
