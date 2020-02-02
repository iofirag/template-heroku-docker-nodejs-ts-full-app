import { Document, Schema, Model, model } from 'mongoose';
import { CollectionsNames } from "../utils/consts";


export interface IUser extends Document {
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    address: string,
    creditCardToken: string
}

const UserSchema: Schema = new Schema<IUser>({
    email: { type: String },
    phone: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    creditCardToken: { type: String }
}, 
{ collection: CollectionsNames.USER });

/* pre functions */
UserSchema.pre<IUser>('save', async function(next) {
    try {
        // Use any model controller for doing some stuff before save this document
        next()
    } catch(ex) {
        return next(ex);
    }
});

export const UserModel: Model<IUser> = model<IUser>(CollectionsNames.USER, UserSchema);
