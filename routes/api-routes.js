// dependencies 
const axios = require("axios");
const cheerio = require("cheerio");

// my database for the job posts 
const db = require("../models")

module.exports = function (app) {

    app.get("/scrape/:id", function (req, res) {

        let choice = req.params.id;

        let scrapes = [];
        //call to ziprecruiter returning the users choice of position with 10 days of posting and full time
        axios.get("https://www.ziprecruiter.com/candidate/search?search=" + choice + "&days=10&refine_by_salary=&refine_by_tags=&refine_by_title=&refine_by_org_name=Google").then(function (response) {
            // Load the Response into cheerio and save it to a variable
            let $ = cheerio.load(response.data);
          
            $("div.job_content").each(function (i, element) {
                console.log(element);
                //created an empty object called result
                let result = {};
                // saved post information into object
                result.title = $(this).children("a").children("h2").text().trim();
                result.location = $(this).children("p").children("a.t_location_link.location").text().trim();
                result.details = $(this).children("p.job_snippet").children("a").text().trim();
                result.link = $(this).children("p.job_snippet").children("a").attr("href");

                //issues with scrape have resulted in sometimes not pulling all info so conditional requited
                if(result.title && result.location && result.details && result.link){
                    scrapes.push(result)
                }
            });
            // save scraped info to the scrapes Array
            return scrapes
        })
        .then(function (result) {
            // sending the info as JSON
            res.json(result)

            result.forEach(function (x) {
                db.Post.create(x).then(function (data) {
                    console.log(data)

                }).catch(function (err) {
                    if (err) throw err;
                })
    
            });
        })
    })
    
}
