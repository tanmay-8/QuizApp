const mongoose = require('mongoose');
const {Schema} = mongoose


const QuestionSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    options:{
        type:[String],
    }

})

const Question = mongoose.model('Question',QuestionSchema)

module.exports = Question