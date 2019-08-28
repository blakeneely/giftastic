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
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=08uHsmK4UzYd8KoIXuWdAWPu4gZtNIB5&limit=10";
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        // actor + "&api_key=08uHsmK4UzYd8KoIXuWdAWPu4gZtNIB5&limit=10";

        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            for (var i = 0; i < results.length; i++){                       // Loop 
                var card = $("<div>");                                      // Create a div element and assign to variable
                card.addClass("card m-2 border-dark");                      // Add bootstrap classes to div
                card.css("width","16rem");                                  // Add bootstrap style of 16rem width to div
                var image = $("<img>");                                     // Create img element and assign to variable
                image.attr("src",results[i].images.fixed_height.url)        // Attach url source to image element
                image.addClass("card-img-top");                             // Add bootstrap class to img
                card.append(image);                                         // Append img to card div
                var cardBody = $("<div>");                                  // Create div element and assign to variable
                cardBody.addClass("card-body bg-dark text-white-50");       // Add bootstrap class to cardBody
                var p = $("<p>");                                           // Create p element and assign to variable
                var title = results[i].title;                               // Get title info and assign to variable
                title = title.toLowerCase()                                 
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
                p.html("Title: " + title);                                  // Add title info to p
                cardBody.append(p);                                         // Append p to cardBody div
                var pTwo = $("<p>");                                        // Create another p element and assign to variable
                var rating = results[i].rating                              // Get rating info and assign to variable
                rating = rating.toUpperCase();                              // Make rating uppercase
                pTwo.html("Rating: " + rating);                             // Add rating info to p 
                cardBody.append(pTwo);                                      // Append p to cardBody
                card.append(cardBody)                                       // Append cardBody to card
                $(".gif-container").prepend(card);                          // Append card to gif-container
            }
        });

    });

    renderButtons();                                                        // Load buttons on page
});