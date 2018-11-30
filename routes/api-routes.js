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
            $("div.job_content").each(function (i, element) {
                let results = {};
                //create an empty object called results
                // Save the text of the element into key value pairs to the results obj
                results.title = $(this).children("a").children("h2").text().trim();
                results.location = $(this).children("p").children("a.t_location_link.location").text().trim();
                results.description = $(this).children("p.job_snippet").children("a").text().trim();


                db.Post.create(results).then(function(data){
                    console.log(data)

                }).catch(function(err){
                    if (err) throw err; 
                })
            });

            // Log the results once you've looped through each of the elements found with cheerio
            res.json(results)
        });

    })

}