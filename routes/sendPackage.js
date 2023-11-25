const db = require('../database');

module.exports = (req, res) => {
    const { sender_address, receiver_address, package_size, weight } = req.body;

    if (!sender_address || !receiver_address || !package_size || weight <= 0) {
        return res.status(400).send('Ugyldige data indsendt');
    }

    const stmt = db.prepare("INSERT INTO packages (sender_address, receiver_address, package_size, weight) VALUES (?, ?, ?, ?)");
    stmt.run(sender_address, receiver_address, package_size, weight, function(err) {
        if (err) {
            return res.status(500).send('Fejl ved indsættelse af data');
        }
        res.send(`Pakke med ID ${this.lastID} er registreret!`);
    });
    stmt.finalize();
};
