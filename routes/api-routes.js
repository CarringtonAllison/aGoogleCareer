const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models")


module.exports = function (app) {


    app.get("/scrape/:id", function (req, res) {

        let choice = req.params.id;

        axios.get("https://www.ziprecruiter.com/candidate/search?search=" + choice + "&days=&refine_by_salary=&refine_by_tags=&refine_by_title=&refine_by_org_name=Google").then(function (response) {

            // Load the Response into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            let $ = cheerio.load(response.data);
            // An empty array to save the data that we'll scrape
            // With cheerio, find each p-tag with the "title" class
            // (i: iterator. element: the current element)
            $("div.job_content").each(function (i, element) {
                //create an empty object called results
                let results = {};
                // Save the text of the element into key value pairs to the results obj
                results.title = $(this).children("a").children("h2").text().trim();
                results.location = $(this).children("p").children("a.t_location_link.location").text().trim();
                results.details = $(this).children("p.job_snippet").children("a").text().trim();

                db.Post.create(results).then(function(data){
                    console.log(data)

                }).catch(function(err){
                    if (err) throw err; 
                })
            });

        });

    })

}