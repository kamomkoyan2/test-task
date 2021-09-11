const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const logger = require('morgan')

require('./src/db/mongoose');

const users = require('./src/routes/auth');
const posts = require('./src/routes/post');
const comments = require('./src/routes/comment');
const likes = require('./src/routes/likes');

const app = express()


app.use(express.json())


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(logger("dev"));


app.use('/api/users', users);
app.use('/api/posts', posts)
app.use('/api/post', comments)
app.use('/api/post', likes)

app.get("/", function (req, res) {
    res.send("hello");
  });




app.listen(3000, () => {
    console.log('Server is runing on Port 3000')
})