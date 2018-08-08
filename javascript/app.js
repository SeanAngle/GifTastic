var sports = ["Football", "Lacrosse", "Hockey"];

renderButtons();

function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < sports.length; i++) {

        // Then dynamicaly generates buttons for each sports in the array
        var addSport = $("<button>");
        // Adds a class of sport to our button
        addSport.addClass("sport");
        // Added a data-attribute
        addSport.attr("data-name", sports[i]);
        // Provided the initial button text
        addSport.text(sports[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(addSport);
    }
    $("button").on("click", function(){
        var sport = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=25pm525lAvfypLYEB4fcUy7jZ5yd4e8U&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
            console.log(response);

            var results = response.data;
            console.log(results.length);

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
                // Creating a div with the class "item"
                var gifDiv = $("<div class='sport'>");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating.toUpperCase());

                // Creating an image tag
                var sportImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                sportImage.attr("src", results[i].images.fixed_height_still.url);
                sportImage.attr("still", results[i].images.fixed_height_still.url);
                sportImage.attr("animated", results[i].images.fixed_height.url);
                sportImage.attr("state", "still");



                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(sportImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gif-view").prepend(gifDiv);
            }

            $("img").on("click", function(){
                if($(this).attr("state") === "still"){
                    $(this).attr("src", $(this).attr("animated"));
                    $(this).attr("state", "animated");

                }else{
                    $(this).attr("src", $(this).attr("still"));
                    $(this).attr("state", "still");

                }

            });

        });
    });
}




// This function handles events where the add movie button is clicked
$(".addNow").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var sport = $("#sport-input").val().trim();

    // The sport from the textbox is then added to our array
    sports.push(sport);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of ".sport"
// $(document).on("click", ".sport", gifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
