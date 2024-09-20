import mongoose from "mongoose";

const animeSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  stock: {
    //For clothes and shoesv
    smallSize: { type: Number },
    mediumSize: { type: Number },
    largeSize: { type: Number },
    //For Comics and Action Figures
    comicsAndFIgures: { type: Number },
  },
  id: { type: Number, required: true },
  genre: { type: String }, // not required
  category: { type: String, required: true },
  clothType: { type: String },
});

const Anime = mongoose.model("animes", animeSchema);

export default Anime;
