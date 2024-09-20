import Anime from "../models/anime.model.js";


const search = async (req, res) => {
    console.log(req.params.name);
    try {
        const nameRegex = new RegExp(req.params.name, 'i'); // Create a regex from the string
        const anime = await Anime.find(
            {
                "$or": [
                    {
                        "name": { $regex: nameRegex }
                    }
                ]
            }
        );
        res.status(200).json(anime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

export default search;
//Tp7j?S)Y