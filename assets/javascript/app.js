$(document).ready(function(){
    var options = ["ryan gosling", "emma stone", "michael j fox", "john stamos", "steve carrell"];
    var userInput;
    var actor;

    // function to get gifs from giphy
    function renderGifs(){
        var actor = $(this).attr("data-name");
        console.log(this)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q" + actor + "&api_key=08uHsmK4UzYd8KoIXuWdAWPu4gZtNIB5&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++){
                var card = $("<div>");
                card.addClass("card");
                card.css("width","18rem");
                var image = $("<img>");
                image.attr("src",results[i].images.fixed_height.url)
                image.addClass("card-img-top");
                card.append(image);
                $(".gif-container").append(card);
            }
        });
    };

    // function to make buttons from array and append to html
    function renderButtons() {
        for (var i = 0; i < options.length; i++) {
            var btn = $("<button>");
            btn.addClass("actor");
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

    // AJAX call function

    // function on click 

    $(document).on("click", ".actor", function(){
        renderGifs();
    });

    renderButtons();
});