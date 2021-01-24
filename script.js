$(document).ready(function() {
    $("#search-btn").on("click", function(){
        const userInput = $("#search-input").val();          
            searchCurrent(userInput);    
    })   

    apiKey="&appid=28a251366afe42620dacd55b2d9f72b3";

    function searchCurrent(userInput){ 
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + apiKey + "&units=imperial";
    $.ajax({
      url: queryURL,
      method: "GET"
      //promise
    }).then(function(response) {
        $("#current-weather").empty()
        console.log(response)
        //cardbody bootstrap dynamically created
        let cityName = $("<h5>").addClass("card-title").text(response.name);
        let windSpeed = $("<p>").addClass("card-text").text("Windspeed: " + response.wind.speed + " MPH");
        let humidity = $("</p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
        let temperature = $("</p>").addClass("card-text").text("Current Temperature: " + response.main.temp * 1.80 + 32 + " °F");  
            
            console.log(response.main.temp * 1.80 + 32)

        let cardBody = $("<div>").addClass("card-body")
        let iconImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            //https://openweathermap.org/img/w/01n.png

        let cardContainer = $("<div>").addClass("card")

        cityName.append(iconImage)
        cardBody.append(cityName, temperature, humidity, windSpeed)
        cardContainer.append(cardBody)
        
        $("#current-weather").append(cardContainer)

    });

}







   



























//Wrap around everything, document.ready function    
});