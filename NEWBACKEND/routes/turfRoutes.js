import express from "express";
import { addTurf, getAllTurfs, getTurfById, deleteTurf,bookTurf, getTurfByTurfId, editTurf } from "../controllers/turfController.js";

const turfRoutes = express.Router();

turfRoutes.post("/addturf", addTurf);
turfRoutes.get("/allturfs", getAllTurfs);
turfRoutes.get("/getturfbyid/:id", getTurfById);
turfRoutes.delete("/deleteturf/:id", deleteTurf);
turfRoutes.get("/getturfbyturfid/:id", getTurfByTurfId);
// turfRoutes.post('/bookturf/:id',bookTurf);
turfRoutes.post('/bookturf/:id',bookTurf);
turfRoutes.put('/editturf/:id',editTurf);


export default turfRoutes;