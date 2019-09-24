var mongo = require('mongoose');

var schema = mongo.Schema;

var bookSchema = new schema({
    id : String,
    user : String,
    num : String,
    cname:String,
    from:String,
    to:String
})

var bookModel = mongo.model("book", bookSchema,'book');

module.exports = bookModel;