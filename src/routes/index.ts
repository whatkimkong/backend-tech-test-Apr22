import { Request, Response, NextFunction } from 'express';
import Log from '../middlewares/Log';

const router = require("express").Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("/ get working fine");
});

// router.get("/join", (req, res, next) => {
//   res.json("All good in here");
// });

// // You put the next routes here 👇
// router.use("/auth", authRoutes);
// router.use("/profile", isLoggedIn, profileRoutes); // added for profile page
// router.use("/recipes", isLoggedIn, recipeRoutes); 
// router.use("/comments", isLoggedIn, commentRoutes)
// router.use("/upload", cloudinaryRoutes)

// example: router.use("/auth", authRoutes)
module.exports = router;
