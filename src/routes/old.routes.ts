import { Request, Response, NextFunction } from 'express';
import Log from '../error-handling/Log';
import { Types } from 'mongoose';
const router = require("express").Router();
const Group = require("../models/Group.model");
const Instance = require("../models/Instance.model");

interface IGroupResponse {
    group: string;
    instances: number;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

interface IInsResponse {
    id: string;
    group: string;
    meta?: Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

/*
POST /:group/:id - createInstance
GET / - getAllGroups -- CURRENTLY MALFUNCTIONING --
DELETE /:group/:id - deleteInstance
GET /:group - getAllInstances - timestamps missing - cant access object properties - typescript issue?
*/

// "/api/heart/:groupId/:instanceId"
router.post("/:groupId/:instanceId", (req: Request, res: Response, next: NextFunction) => {
    // const { meta } = req.body;
    const { groupId, instanceId } = req.params;
    Instance.findOneAndUpdate({$and: [{group: groupId}, {id: instanceId}]}, {
        id: instanceId,
        group: groupId,
        meta: req.body,
        }, {new: true, upsert: true})
    .then((instance: any) => {
        console.log(instance, "this is the instance")
        // if created right now - add to group or create new group
        if (instance.created_At === instance.updated_At){
            Group.findOneAndUpdate({group: instance._id}, { $inc: {instances: 1}}, {new: true, upsert: true})
        .then((group: any) => {
            console.log(group)
            return res.status(200).json({ group, message: "new instance added to group" })
        }).catch((err: any) => {
            console.log(err)
            return res.status(500).json({
                message: err.message,
                err
            })
        })}  else {
            return res.status(200).json({ instance, message: "instance updated"})
        }
    }).catch((err: any) => {
        console.log(err)
        return res.status(500).json({
            message: err.message,
            err
        })
    })
});

// "/api/heart/
router.get("/", (req: Request, res: Response, next: NextFunction) => {

})


// "/api/heart/:groupId
/** TIMESTAMPS NOT YET ACCESSIBLE - typescript problem?
 *  finds by the groupId param
 * sorts by createdAt and updatedAt Timestamps
 * returns the total number of instances for this group and first and last heartbeat
*/
router.get("/:groupId", (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params;
    Group.find({group: groupId}).populate('group').sort({createdAt: 1 , updatedAt: 1 }).exec().then((group: IGroupResponse) => {
        return res.status(200).json({group})
        }).catch((err: any) => {
            return res.status(500).json({
                message: err.message,
                err
            })
        });
})

// route 'heart/delete/:groupId/:instanceId' 
/** first 'finds' the group by its params
 * then checks that its id === the params
 * then deletes
*/
router.delete("/delete/:groupId/:instanceId", (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;
    const instanceId = req.params.instanceId;
    Instance.findOneAndDelete({$and: [{group: groupId}, {id: instanceId}]}).exec().then((instance: IInsResponse) => {
        instance ? res.status(201).json({ instance, message: 'This Instance has been deleted' }) : res.status(404).json({ message: 'Instance not found' })
        }).catch((err: any) => {
                return res.status(500).json({
                message: err.message,
                err
            })
    });
}); 


// route 'heart/get/instances'
/** Extra route 
 * to check total instances and
 * to monitor effect of other routes */
router.get("/instances", (req: Request, res: Response, next: NextFunction) => {
    Instance.find().exec().then((instances: IInsResponse[]) => {
    return res.status(200).json({
            instances: instances,
            count: instances.length,
        })
    }).catch((err: any) => {
        return res.status(500).json({
            message: err.message,
            err
        })
    });
});

// IMPLETMENT timeframed delete function
async function deleteOldHeartbeat() {
    let date = new Date();
    let timeLimit = new Date();
    // subtract timeLimit from the time now
    timeLimit.setMinutes(date.getMinutes()-30);
  
    // search for documents last updated past the timeframe, using $lt operator & delete them
    const oldDocs = await Instance.find({"updated_at" : {$lt : timeLimit }})
    oldDocs.length > 0 ? console.log({oldDocs}, "documents to be deleted") : null;

    const docsToDelete = await Instance.deleteMany({"updated_at" : {$lt : timeLimit }})
   // recall the function after 1 days, you can change the frequence
   setTimeout(async () => {
       await deleteOldHeartbeat();
   }, 86400); 
}

// call deleteOldHeartBeat to start its loop recall
deleteOldHeartbeat();

module.exports = router;