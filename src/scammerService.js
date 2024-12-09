const { Scammer } = require('./database');

// Create: Neuen Scammer-Eintrag hinzufügen
const addScammer = async (ign, server, reason, list, addedBy) => {
    try {
        const newScammer = new Scammer({ ign, server, reason, list, addedBy });
        await newScammer.save();
        return newScammer;
    } catch (error) {
        console.error('Error adding scammer:', error);
        throw error;
    }
};

// Read: Scammer-Einträge abrufen
const getScammers = async (filter = {}) => {
    try {
        return await Scammer.find(filter);
    } catch (error) {
        console.error('Error fetching scammers:', error);
        throw error;
    }
};

// Update: Scammer-Eintrag aktualisieren
const updateScammer = async (id, updates) => {
    try {
        const updatedScammer = await Scammer.findByIdAndUpdate(id, updates, { new: true });
        return updatedScammer;
    } catch (error) {
        console.error('Error updating scammer:', error);
        throw error;
    }
};

// Delete: Scammer-Eintrag löschen
const deleteScammer = async (id) => {
    try {
        return await Scammer.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting scammer:', error);
        throw error;
    }
};

module.exports = { addScammer, getScammers, updateScammer, deleteScammer };
