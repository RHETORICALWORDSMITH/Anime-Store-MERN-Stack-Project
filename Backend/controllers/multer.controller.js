import Anime from "../models/anime.model.js";

const uploadItem = async (req, res, next) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Extract the file name (new file name after multer renames it)
    const { filename } = req.file;

    // Add the filename (image path) to req.body
    const {
      name,
      price,
      description,
      id,
      genre,
      smallSize,
      mediumSize,
      largeSize,
      comicsAndFigures,
      category,
      clothType,
    } = req.body; // Extract other fields from req.body

    let merch = "";
    if (clothType) {
      merch = clothType.toLowerCase();
    }

    const newItem = new Anime({
      name,
      price,
      image: filename,
      description,
      id,
      genre,
      stock: {
        smallSize,
        mediumSize,
        largeSize,
        comicsAndFigures,
      },
      category,
      clothType: merch,
    });

    // Save the new item to the database
    await newItem.save();

    // Return success response
    res.status(200);
  } catch (error) {
    // Log the error for debugging
    console.error("Error during file upload or saving item:", error);

    // Return failure response
    res.status(500);
  }
};

export default uploadItem;
