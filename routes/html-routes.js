db = require("../models")

module.exports = function (app) {

app.get("/", function (req, res) {
    db.Post.find({})
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        if (err) throw err
    });
});

}