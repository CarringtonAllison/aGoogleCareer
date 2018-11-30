$(document).on("click", "#jobSubmit", function(data){
    event.preventDefault();
    
    let search = $("#jobSearch").val();

    $.ajax({
        method:"GET",
        url: "/scrape/" + search
    }).then(function(data){
        console.log(data)
        $("#box").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#box").append("<h4>" + data.location + "</h4>");
    });

});