const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser : true,
            useCreateIndex : true,
            useUnifiedTopology : true
        });

        console.log(`Mongo DB connected successfully ${conn.connection.host}`);

    }catch(err){
        console.log(`Error : ${err.message}`);
        process.exit(1);
    }
}

module.exports = dbConnection;