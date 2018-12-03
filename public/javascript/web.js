$(document).ready(function () {

    // loading the db of jobs on the job posting #box  
    $.getJSON("/find", function (data) {
        data.forEach(function (data) {

            // creating and converting data into HTML also adding classes 
            let $div = $("<div>");
            $div.addClass("jobBox");
            $div.attr("data-value", data.link);
            let title = $("<h3>" + data.title + "</h3>");
            title.addClass("searchTitle")
            let location = $("<h5>" + data.location + "</h5>");
            location.addClass("location")
            let details = $("<p>" + data.details + "</p>");
            details.addClass("details")

            // attaching everything to the main div
            $div.append(title, location, details);

            // attaching the main div to the job posting #box
            $("#box").prepend($div);
        })
    })
})

//once user enters a search and submits 
$(document).on("submit", "#jobSearchForm", function () {
    //prevents reload
    event.preventDefault();
    // emptys the job posting #box 
    $("#box").empty();

    // grabs the users search input 
    let search = $("#jobSearch").val().trim();

    //gets JSON info from scape and applys it to job posting #box 
    $.getJSON("/scrape/" + search, function (dataArr) {
        dataArr.forEach(function (data) {
            console.log(data)


            //creating and converting data into HTML and adding classes 
            let $div = $("<div>");
            $div.addClass("jobBox");
            $div.addClass("jobBox");
            $div.attr("data-value", data.link);
            let title = $("<h3>" + data.title + "</3>");
            title.addClass("searchTitle")
            let location = $("<h5>" + data.location + "</h5>");
            location.addClass("location")
            let details = $("<p>" + data.details + "</p>");
            details.addClass("details")

            // attaching everything to the main div
            $div.append(title, location, details);
            
            // attaching the main div to the job posting #box
            $("#box").prepend($div);
        })
    })

});


//once the job posting #box post is selected 
$(document).on("click", ".jobBox", function () {
    console.log("working")
})
