$.getJSON("/find",function(data){
    data.forEach(function(data){
        let $div = $("<div>");
        $div.addClass("jobBox");
        let title = $("<h2>" + data.title + "</h2>");
        let location = $("<h4>" + data.location + "</h4>");
        let details = $("<p>" + data.details + "</p>");
        
        $div.append(title,location,details);
        $("#box").append($div);


    })
})


$(document).on("click", "#jobSubmit", function(data){
    event.preventDefault();
    
    let search = $("#jobSearch").val();

    $.ajax({
        method:"GET",
        url: "/scrape/" + search
    }).then(function(data){
        console.log(data);
        $("#box").append("<h2>" + data.title + "</h2>");
        $("#box").append("<h4>" + data.location + "</h4>");
        $("#box").append("<h4>" + data.details + "</h4>");

    });

});