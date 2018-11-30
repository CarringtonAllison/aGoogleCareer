$(document).ready(function(){

    $.getJSON("/find",function(data){
        data.forEach(function(data){
            let $div = $("<div>");
            $div.addClass("jobBox");
            $div.attr("data-value", data.link);
            let title = $("<h3>" + data.title + "</h3>");
            title.addClass("searchTitle")
            let location = $("<h5>" + data.location + "</h5>");
            location.addClass("location")
            let details = $("<p>" + data.details + "</p>");
            details.addClass("details")
            $div.append(title,location,details);
            $("#box").prepend($div);
        })
    })
})
    
    
$(document).on("submit", "#jobSearch", function(){
    console.log("working")
    event.preventDefault();
    $("#box").empty();  
    
    let search = $("#jobSearch").val().trim();
    
    $.getJSON("/scrape/" + search,function(data){
        data.forEach(function(data){
            console.log(data)
            let $div = $("<div>");
            $div.addClass("jobBox");
            $div.attr("data-value", data.link);
            let title = $("<h3>" + data.title + "</3>");
            let location = $("<h5>" + data.location + "</h5>");
            let details = $("<p>" + data.details + "</p>");
            
            $div.append(title,location,details);
            $("#box").prepend($div);
        })
    })

});

$(document).on("click", ".jobBox", function(){
    console.log("working")
})