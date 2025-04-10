import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    remote: { type: Boolean, default: false },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    skills: [{ type: String }],
    disabilityTypes: [
      {
        type: String,
        enum: ["Physical", "Visual", "Hearing", "Cognitive", "Other"],
      },
    ],
    disabilitySeverity: {
      type: String,
      enum: ["Mild", "Moderate", "Severe", "Any"],
    },

    salary: {
      amount: { type: Number },
      currency: { type: String, default: "USD" },
      period: {
        type: String,
        enum: ["hour", "day", "week", "month", "year"],
        default: "month",
      },
      isPublic: { type: Boolean, default: true },
    },

    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        appliedAt: Date,
        status: {
          type: String,
          enum: ["Applied", "Interview", "Offer", "Rejected"],
          default: "Applied",
        },
      },
    ],
    acceptedApplicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        acceptedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "active", "rejected", "closed"],
      default: "pending",
    },
    verification: {
      riskScore: Number,
      lastVerified: Date,
      method: String, // 'gemini' or 'basic'
      redFlags: [String],
      suggestions: [String],
    },
    rejectionReason: String,
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
