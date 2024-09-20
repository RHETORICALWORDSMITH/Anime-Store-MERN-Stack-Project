import Anime from "../models/anime.model.js";

const deleteItem = async (req, res) => {
  try {
    const { id, confirm } = req.body;
    
    // Check if the product exists
    const product = await Anime.findOne({ id });
    if (!product) {
      return res.status(404).json({ message: `Product not found with ID: ${id}` });
    }
    
    // Send the product details if confirm is not present
    if (!confirm) {
      return res.status(200).json(product);
    }
    
    // Delete the product if confirm is "CONFIRM"
    if (confirm === "CONFIRM") {
      await Anime.deleteOne({ id });
      return res.status(200).json({ message: "Product deleted successfully" });
    }
    
    return res.status(400).json({ message: "Invalid request" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

export default deleteItem;
