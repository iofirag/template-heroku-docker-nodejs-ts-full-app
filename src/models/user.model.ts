import { Document, Schema, Model, model } from 'mongoose';
import { CollectionsNames } from "../utils/consts";

const UserSchema: Schema = new Schema({
    email: { type: String },
    phone: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    creditCardToken: { type: String }
}, 
{ collection: CollectionsNames.USER });

export const UserModel: Model<IUser> = model<IUser>(CollectionsNames.USER, UserSchema);
export interface IUser extends Document {
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    address: string,
    creditCardToken: string
}
