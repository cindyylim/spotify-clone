import { Artist } from "../models/artist.model.js";

export const getArtists = async (req, res, next) => {
    try {
      const artists = await Artist.find();
      res.status(200).json(artists);
    } catch (error) {
      next(error);
    }
  };
  