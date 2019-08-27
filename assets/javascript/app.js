$(document).ready(function(){
    var options = ["ryan gosling", "jack black", "michael j fox", "john stamos", "steve carrell"];
    var userInput;

    // function to make buttons from array and append to html
    function renderButtons() {
        for (var i = 0; i < options.length; i++) {
            var btn = $("<button>");
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



    renderButtons();
});