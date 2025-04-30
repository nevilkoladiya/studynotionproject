import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
  timeDuration: {
    type: Number,
    default: "0",  
  },
});

export default mongoose.model("Section",sectionSchema)