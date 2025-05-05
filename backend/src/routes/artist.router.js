import { Router } from "express";
import { getArtists } from "../controller/artist.controller.js";
const router = Router();

router.get("/", getArtists);

export default router;
