require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('./database/connection');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const conversationsRouter = require('./routes/conversations');
const messagesRouter = require('./routes/messages');
const multerRouter = require('./routes/multer');
const port = process.env.PORT;

//MIDDLEWARES
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ROUTERS
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/upload', multerRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/messages', messagesRouter);


app.listen(port, () => {
    console.log(`\n\nServer Connected Successfully :: ${port}\n\n`);
});
