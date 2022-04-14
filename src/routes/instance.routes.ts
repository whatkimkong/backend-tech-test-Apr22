import { Request, Response, NextFunction } from 'express';
import Service from "../models/Service.model";
import Client from "../models/Client.model";

const createInstance = (req: Request, res: Response, next: NextFunction) => {
    const { meta } = req.body;
    const instance = new Client({
        group: req.params.group,
        id: req.params.id,
        meta
    });
    return instance
        .save()
        .then((instance) => res.status(201).json({ instance }))
        .catch((error) => res.status(500).json({ error }));
};

const deleteInstance = (req: Request, res: Response, next: NextFunction) => {
    return Client.findByIdAndDelete(req.params.id)
        .then((instance) => (instance ? res.status(201).json({ instance, message: 'This instance has been deleted' }) : res.status(404).json({ message: 'This instance was not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const findInstance = (req: Request, res: Response, next: NextFunction) => {
    return Client.findById(req.params.id)
        .then((instance) => (instance ? res.status(200).json({ instance }) : res.status(404).json({ message: 'This instance was not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const findGroup = (req: Request, res: Response, next: NextFunction) => {
    return Service.find()
        .then((groups) => res.status(200).json({ groups }))
        .catch((error) => res.status(500).json({ error }));
};


export default { createInstance, findInstance, deleteInstance, findGroup };