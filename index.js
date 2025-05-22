const express = require('express');
const app = express();
// const routes = require('./routes/routes');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const path = require("path");
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
// const cors = require('cors');
// const rateLimit = require('express-rate-limit');
// const BlockedTokensModel = require("./models/BlockedTokensModel");
// const http = require('http');
// const socketIo = require('socket.io');
// const jwt = require("jsonwebtoken");
const upload = require("./helpers/uploadFiles");

    i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        preload: ['en', 'ar'], // preload all supported languages
        backend: {
            loadPath: path.join(__dirname, 'locales/{{lng}}.json')
        }
    });
app.use(middleware.handle(i18next));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// const router = express.Router();
const ProductController = require("./controller/ProductController");

app.post('/product/create', upload.single('image'), ProductController.create);
app.post('/product/creates', upload.array('images'), ProductController.creates);

app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/myapp_db', )
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // Start the server *after* successful DB connection
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });


