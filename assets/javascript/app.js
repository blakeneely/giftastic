$(document).ready(function(){
    var options = ["ryan gosling", "emma stone", "michael j fox", "will smith", "steve carrell"];
    var userInput;

    // Function to pause and play gifs
    function animateGifs(){
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    };

    // Function to render gifs from ajax call to giphy api
    function renderGifs() {
        var actor = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=08uHsmK4UzYd8KoIXuWdAWPu4gZtNIB5&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++){                       // Loop to make card for each returned gif from giphy
                var card = $("<div>");                                      // Create a div element and assign to variable
                card.addClass("card m-2 border-dark");                      // Add bootstrap classes to div
                card.css("width","16rem");                                  // Add bootstrap style of 16rem width to div
                var image = $("<img>");                                     // Create img element and assign to variable
                image.attr("src",results[i].images.fixed_height_still.url)        // Attach url source to image element
                image.attr("data-still",results[i].images.fixed_height_still.url);
                image.attr("data-animate",results[i].images.fixed_height.url);
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
    };
    
    // Function to push new strings to options array from input box
    function pushToArray(){
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
    };
    
    // Function to make buttons from array and append to html
    function renderButtons() {
        for (var i = 0; i < options.length; i++) {
            var btn = $("<button>");
            btn.addClass("actor btn btn-success");
            btn.attr("data-name", options[i]);
            var actorBtn = btn.text(options[i]);
            $(".btn-container").append(actorBtn);
        }
    };
    $(document).on("click", ".card-img-top", animateGifs);                  // Event listener to animate gifs
    $(document).on("click", "#submit", pushToArray);                        // Event listener to for input box
    $(document).on("click", ".actor", renderGifs);                          // Event listener to load gifs on html
    renderButtons();                                                        // Render buttons on html
});