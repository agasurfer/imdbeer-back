const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema({
    
    name: String,
    number: String,
    category: String,
    categorynumber: String,
    overallimpression: String,
    aroma: String,
    appearance: String,
    flavor: String,
    mouthfeel: String,
    comments: String,
    history: String,
    characteristicingredients: String,
    stylecomparison: String,
    ibumin: String,
    ibumax: String,
    ogmin: String,
    ogmax: String,
    fgmin: String,
    fgmax: String,
    abvmin: String,
    abvmax: String,
    srmmin: String,
    srmmax: String,
    commercialexamples: String,
    tags: String,
    
});

const Bstyles = mongoose.model("Styles", styleSchema);
module.exports = Bstyles;