$(document).ready(function(){
    var options = ["ryan gosling", "emma stone", "michael j fox", "john stamos", "steve carrell"];
    var userInput;
    var actor;

    // function to get gifs from giphy
    function renderGifs(){
        // var actor = $(this).attr("data-name");
        // console.log(this)
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q" + actor + "&api_key=08uHsmK4UzYd8KoIXuWdAWPu4gZtNIB5&limit=10";

        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function(response){
        //     console.log(response);
        //     var results = response.data;
        //     for (var i = 0; i < results.length; i++){
        //         var card = $("<div>");
        //         card.addClass("card");
        //         card.css("width","18rem");
        //         var image = $("<img>");
        //         image.attr("src",results[i].images.fixed_height.url)
        //         image.addClass("card-img-top");
        //         card.append(image);
        //         $(".gif-container").append(card);
        //     }
        // });
    };

    // function to make buttons from array and append to html
    function renderButtons() {
        for (var i = 0; i < options.length; i++) {
            var btn = $("<button>");
            btn.addClass("actor btn btn-success");
            btn.attr("data-name", options[i]);
            var actorBtn = btn.text(options[i]);
            $(".btn-container").append(actorBtn);
        }
    };

    // function on click to push new strings to array from input box
    $(document).on("click", "#submit", function(event){
        event.preventDefault();
        userInput = $("#userInput").val().trim();
        if (userInput == "") {
            return false;
        }
        else {
            options.push(userInput);
            $(".btn-container").empty();
            $("#userInput").val("");
            renderButtons();    
        };
    });

    // function on click 

    $(document).on("click", ".actor", function(){
        var actor = $(this).attr("data-name");
        console.log($(this).attr("data-name"))
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q" + actor + "&api_key=08uHsmK4UzYd8KoIXuWdAWPu4gZtNIB5&limit=10";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actor + "&api_key=08uHsmK4UzYd8KoIXuWdAWPu4gZtNIB5&limit=10";

        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++){
                var card = $("<div>");                                      // Create a div element and assign to variable
                card.addClass("card m-2 border-dark");                      // Add bootstrap classes to div
                card.css("width","16rem");                                  // Add bootstrap style of 16rem width to div
                var image = $("<img>");                                     // Create img element and assign to variable
                image.attr("src",results[i].images.fixed_height.url)        // Attach url source to image element
                image.addClass("card-img-top");                             // Add bootstrap class to img
                card.append(image);                                         // Append img to card div
                var cardBody = $("<div>");                                  // Create div element and assign to variable
                cardBody.addClass("card-body bg-dark text-white");
                var p = $("<p>");
                p.html("Title: " + results[i].title);
                var pTwo = $("<p>");
                cardBody.append(p);
                var rating = results[i].rating
                rating = rating.toUpperCase();
                pTwo.html("Rating: " + rating);
                cardBody.append(pTwo);
                card.append(cardBody)
                $(".gif-container").prepend(card);                          
            }
        });

    });

    renderButtons();
});