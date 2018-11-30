$(document).ready(function(){

    $.getJSON("/find",function(data){
        data.forEach(function(data){
            let $div = $("<div>");
            $div.addClass("jobBox");
            $div.attr("data-value", data.link);
            let title = $("<h2>" + data.title + "</h2>");
            let location = $("<h4>" + data.location + "</h4>");
            let details = $("<p>" + data.details + "</p>");
            
            $div.append(title,location,details);
            $("#box").prepend($div);
        })
    })
})
    
    
$(document).on("click", "#jobSubmit", function(){
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
            let title = $("<h2>" + data.title + "</h2>");
            let location = $("<h4>" + data.location + "</h4>");
            let details = $("<p>" + data.details + "</p>");
            
            $div.append(title,location,details);
            $("#box").prepend($div);
        })
    })

});

$(document).on("click", ".jobBox", function(){
    console.log("working")
})