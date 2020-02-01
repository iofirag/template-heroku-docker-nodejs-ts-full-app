import { Response } from "express";
import mongoose from "mongoose";

export default class Utils {
  public static handleError = async (err: any, res: Response) => {
    return res.status(403).json({ msg: err });
  };

  /**
   * This function returns an ObjectId embedded with a given datetime
   * Accepts both Date object and string input
   */ 
  public static objectIdWithTimestamp = (timestamp) => {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof(timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp/1000).toString(16);

    // Create an ObjectId with that hex timestamp
    var constructedObjectId = mongoose.Types.ObjectId(hexSeconds + "0000000000000000");

    return constructedObjectId
  }
}
