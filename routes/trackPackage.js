// routes/trackPackage.js
const db = require('../database');

module.exports = (req, res) => {
    const packageId = req.params.id;

    db.get("SELECT * FROM packages WHERE id = ?", [packageId], (err, row) => {
        if (err) {
            return res.status(500).send('Fejl ved søgning af pakke');
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).send('Pakke ikke fundet');
        }
    });
};
    