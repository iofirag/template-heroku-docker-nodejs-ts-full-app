// import * as mongoose from "mongoose";
// import { DebtModel } from "./debt.model";
// import { SynagogueModel } from "./synagogue.model";

// /* Schema */
// const modelName = "MemberM";
// const collectionName = "members";

// export const MemberModel = mongoose.model(
//   modelName,
//   new mongoose.Schema(
//     {
//       // personalDetails
//       // id: { type: String, unique: true },
//       synagogueRef: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: SynagogueModel.collection.name,
//         required: true
//       },

//       firstName: { type: String },
//       lastName: { type: String },
//       address: { type: String },
//       phone: { type: String },
//       email: { type: String },
//       // parents
//       fatherName: { type: String },
//       motherName: { type: String },
//       // fatherParents
//       father_grandFatherName: { type: String },
//       father_grandMotherName: { type: String },
//       // motherParents
//       mother_grandFatherName: { type: String },
//       mother_grandMotherName: { type: String },

//       role: { type: String, default: "guest" },
//       childrenList: [
//         { type: mongoose.Schema.Types.ObjectId, ref: collectionName }
//       ],
//       obligationList: [
//         {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: ObligationModel.collection.name
//         }
//       ],

//       created_at: { type: Date, default: Date.now } // membership date
//     },
//     { collection: collectionName }
//   )
// );
