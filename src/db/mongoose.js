const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const URI = "mongodb://127.0.0.1:27017/test";

mongoose.connect(
    URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    async (error, success) => {
        if (error) {
            return console.error(`Start to connect DB --- ${error}`)
        }
        console.log("Success connected to MongoDB")
    }
)
