import { Request, Response, NextFunction } from 'express';
import Log from '../error-handling/Log';
const heartbeatRoutes = require("./old.routes");
const router = require("express").Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("Initial get route is working fine");
    Log.info(res);
});

router.use("/heart", heartbeatRoutes); 

// ROUTES: 
// router.post('/:group/:id', instanceRoutes.createInstance);
// router.get('/:group/:id', instanceRoutes.findInstance);
// router.get('/:group', instanceRoutes.findGroup);

// 👇 used extra /delete/ so as to make sure no errors in what is deleted from url tree
// router.delete('/delete/:group/:id', instanceRoutes.deleteInstance);

module.exports = router;
