// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Parse URL-encoded bodies (som sendes af HTML-forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (som sendes af API-klienter)
app.use(bodyParser.json());

// Tjener statiske filer fra 'public' mappen
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); // Send dem vores hjemmeside-fil.
});

const db = require('./database'); // Importerer database konfiguration

// Importerer routes
const sendPackageRoute = require('./routes/sendPackage');
const trackPackageRoute = require('./routes/trackPackage');

// Opsætter routes
app.post('/send_package', sendPackageRoute);
app.get('/track_package/:id', trackPackageRoute);

// Grundlæggende Fejlhåndtering
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Noget gik galt!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server kører på port ${PORT}`);
});
