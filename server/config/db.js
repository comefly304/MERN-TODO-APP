const { default: mongoose } = require('mongoose')
const mogoose=require('mongoose')

function Connection(){
    mongoose.connect(process.env.MONGODB_URL)
    console.log('database connected')
}


module.exports=Connection