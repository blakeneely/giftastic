$(document).ready(function(){
    var options = ["ryan gosling", "emma stone", "michael j fox", "will smith", "steve carrell"];
    var userInput;

    // Function to pause and play gifs
    function animateGifs(){
        var state = $(this).attr("data-state");                             // Gets data-state attribute from image
        if (state === "still") {                                            // Checks if data-state is "still"
            $(this).attr("src", $(this).attr("data-animate"));              // Changes img src to "data-animate" src url
            $(this).attr("data-state", "animate");                          // Updates "data-state" attribute of img element to "animate"
          }
        else {
            $(this).attr("src", $(this).attr("data-still"));                // Changes img src to "data-still" src url
            $(this).attr("data-state", "still")                             // Updates "data-state" attribute of img element to "still"
        }
    };

    // Function to render gifs from ajax call to giphy api
    function renderGifs() {
        var actor = $(this).attr("data-name");                              // Get "data-name" attribute from clicked button and assign to variable
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=08uHsmK4UzYd8KoIXuWdAWPu4gZtNIB5&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;                                    // Save response to variable
            for (var i = 0; i < results.length; i++){                       // Loop to make card for each returned gif from giphy
                var card = $("<div>");                                      // Create a div element and assign to variable
                card.addClass("card m-2 border-dark text-center");          // Add bootstrap classes to div
                card.css("width","16rem");                                  // Add bootstrap style of 16rem width to div
                var image = $("<img>");                                     // Create img element and assign to variable
                image.attr("src",results[i].images.fixed_height_still.url)  // Attach url source to image element
                image.attr("data-state", "still");                          // Add "data-state=still" attribute to image
                image.attr("data-still",results[i].images.fixed_height_still.url);  // Add "data-still" src to image
                image.attr("data-animate",results[i].images.fixed_height.url);      // Add "data-animate" src to image
                image.addClass("card-img-top");                             // Add bootstrap class to img
                card.append(image);                                         // Append img to card div
                var cardBody = $("<div>");                                  // Create div element and assign to variable
                cardBody.addClass("card-body text-light");       // Add bootstrap class to cardBody
                var p = $("<p>");                                           // Create p element and assign to variable
                var title = results[i].title;                               // Get title info and assign to variable
                title = title.toLowerCase()                                 // ES6 code snippet from Stack Overflow to cap first letter of each word in title string
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) // I have no idea how this works.... magic
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
        event.preventDefault();                                             // Stop default action of button
        userInput = $("#userInput").val().trim();                           // Assign typed data from input to variable
        if (userInput == "") {                                              // Checks if input was blank
            return false;                                                   // If blank submit button won't work
        }
        else {                                                              // Else if input has text continue
            options.push(userInput);                                        // Push typed data to options array
            $(".btn-container").empty();                                    // Empty btn-container or else buttons will duplicate
            $("#userInput").val("");                                        // Clear out inpuot box on submit
            renderButtons();                                                // Run function to render buttons from array strings
        };
    };
    
    // Function to make buttons from array and append to html
    function renderButtons() {
        for (var i = 0; i < options.length; i++) {                          // Loop options array
            var btn = $("<button>");                                        // Create and assign button to variable
            btn.addClass("actor btn btn-danger");                          // Add bootstrap class and custom actor class to button
            btn.attr("data-name", options[i]);                              // Add "data-name" attribute to button
            var actorBtn = btn.text(options[i]);                            // Create button text and assign to variable
            $(".btn-container").append(actorBtn);                           // Append button to btn-container
        }
    };
    $(document).on("click", ".card-img-top", animateGifs);                  // Event listener to animate gifs
    $(document).on("click", "#submit", pushToArray);                        // Event listener to for input box
    $(document).on("click", ".actor", renderGifs);                          // Event listener to load gifs on html
    renderButtons();                                                        // Render buttons on html
});