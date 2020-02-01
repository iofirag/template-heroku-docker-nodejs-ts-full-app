import { Document, Schema, Model, model, Types } from 'mongoose';
import { CollectionsNames } from '../utils/consts';

/* Interface */
interface IMember extends Document {
  synagogueId: string;
  userId: string;
  phone: String;
  // Roles
  roleIdList: string[];

  id?: number;
  birthdate?: Date;
  nationalId?: string;
  email?: String;
  firstName?: String;
  lastName?: String;
  address?: string;

  // Parents
  father?: {
    name?: string;
    date?: Date;
  },
  mother?: {
    name?: string;
    date?: Date;
  },
  // Grands
  fatherParents?: {
    father?: {
      name?: string;
      date?: Date;
    }
    mother?: {
      name?: string;
      date?: Date;
    }
  },
  motherParents?: {
    father?: {
      name?: string;
      date?: Date;
    }
    mother?: {
      name?: string;
      date?: Date;
    }
  },
}

/* Schema */
const MemberSchema = new Schema<IMember>({
    synagogueId: { type : Types.ObjectId, ref: CollectionsNames.SYNAGOGUE, required: true },
    userId: { type : Types.ObjectId, ref: CollectionsNames.USER },
    // Roles
    roleIdList: [{ type : Types.ObjectId, ref: CollectionsNames.ROLE }],
    
    phone: { type: String, trim: true },
    id: { type: Number },
    nationalId: { type: String, trim: true },
    email: { type: String, trim: true },

    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    address: { type: String, trim: true },
    birthdate: Date,

    // Parents
    father: {
      name: { type: String, trim: true },
      date: Date,
    },
    mother: {
      name: { type: String, trim: true },
      date: Date,
    },
    // Grands
    fatherParents: {
      father: {
        name: { type: String, trim: true },
        date: Date,
      },
      mother: {
        name: { type: String, trim: true },
        date: Date,
      },
    },
    motherParents: {
      father: {
        name: { type: String, trim: true },
        date: Date
      },
      mother: {
        name: { type: String, trim: true },
        date: Date
      }
    }
  },
  { collection: CollectionsNames.MEMBER }
);

/* pre functions */
MemberSchema.pre<IMember>('save', async function(next) {
  // Validate there is not one more member with this SynagogueId and this phone
  try {
    // this.seq = await CounterController.getNextSequenceValue(`${CollectionsNames.SYNAGOGUE}Id`);
    next()
  } catch(ex) {
    return next(ex);
  }
});

export const MemberModel: Model<IMember> = model<IMember>(CollectionsNames.MEMBER, MemberSchema);