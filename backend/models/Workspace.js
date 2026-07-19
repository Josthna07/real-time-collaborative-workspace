const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Workspace", workspaceSchema);