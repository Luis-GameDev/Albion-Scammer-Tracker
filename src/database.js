const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/albion-scammer-tracker', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const scammerSchema = new mongoose.Schema({
    ign: { type: String, required: true },
    server: { 
        type: String, 
        required: true,
        enum: ['West', 'East', 'Europe'], 
    },
    reason: { type: String, required: true },
    list: { type: String, required: true },
    addedBy: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});


const banlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    authorizedUsers: { type: [String], default: [] },
});

const playerSchema = new mongoose.Schema({
    ign: { type: String, required: true },
    server: { type: String, enum: ['West', 'East', 'Europe'], required: true },
    guild: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
});

const Scammer = mongoose.model('Scammer', scammerSchema);
const Banlist = mongoose.model('Banlist', banlistSchema);
const Player = mongoose.model('Player', playerSchema);

module.exports = { connectToDatabase, Scammer, Banlist, Player };
