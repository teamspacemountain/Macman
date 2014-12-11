

var query = "http://localhost:8080/updateTable";
$.ajax({
        // the URL for the request
        url: query,
     
        // whether this is a POST or GET request
        type: "GET",
        
        // Whether to cache the result. 
        cache: false,
     
        // the type of data we expect back
        dataType : "json",
     
        // code to run if the request succeeds;
        // the response is passed to the function
        success: function( json ) {
            console.log(json);
                $("#name1").html(json.name1);
                $("#name2").html(json.name2);
                $("#name3").html(json.name3);
                $("#name4").html(json.name4);
                $("#name5").html(json.name5);

                $("#score1").html(json.score1);
                $("#score2").html(json.score2);
                $("#score3").html(json.score3);
                $("#score4").html(json.score4);
                $("#score5").html(json.score5);


        },
     
        // code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: function( xhr, status, errorThrown ) {
            alert( "Sorry, there was a problem!" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
        },
     
        // code to run regardless of success or failure
        complete: function( xhr, status ) {
            console.log("status: "+status);
        }
    });