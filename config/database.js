const mongoose = require('mongoose')
require('dotenv').config()

const mongoDatabase = () =>{
    mongoose.connect(process.env.DATABASE_URI).then(()=>{
        console.log('[SUCCESS] - Database Connected')
    }).catch((err)=>{
        console.error(err)
        console.log('[FAILED]- Database failed to connect..')
    })
}

module.exports = mongoDatabase();