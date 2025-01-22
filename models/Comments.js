const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    
    username: String,
    comment: String,
    beerId: { type: mongoose.Schema.Types.ObjectId, ref: "Bstyles", required: true },
    createdAt: {type: Date, default: Date.now}
});

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;