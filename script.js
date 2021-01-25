let lat = "";
let lon = "";

$(document).ready(function() {
    $("#search-btn").on("click", function(){
        const userInput = $("#search-input").val();          
            searchCurrent(userInput);    
    })   

    var apiKey="&appid=28a251366afe42620dacd55b2d9f72b3";

    function searchCurrent(userInput){ 
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + apiKey + "&units=imperial";
        
    $.ajax({
      url: queryURL,
      method: "GET"     
    }).then(function(response) {
        $("#current-weather").empty()
        console.log(response)
        //cardbody bootstrap dynamically created
        let cityName = $("<h5>").addClass("card-title").text(response.name);
        let windSpeed = $("<p>").addClass("card-text").text("Windspeed: " + response.wind.speed + " MPH");
        let humidity = $("</p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
        let temperature = $("</p>").addClass("card-text").text("Current Temperature: " + response.main.temp + " °F");
        //let getUV = $("<p>").addClass("card-text").text("UV: " + response.wind.speed);
          
            
        let cardBody = $("<div>").addClass("card-body")
        let iconImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            //https://openweathermap.org/img/w/01n.png

        let cardContainer = $("<div>").addClass("card")

        lat = response.coord.lat;
        lon = response.coord.lon;
        console.log(lat, lon);

        cityName.append(iconImage);
        cardBody.append(cityName, temperature, humidity, windSpeed);
        cardContainer.append(cardBody);
        
        $("#current-weather").append(cardContainer);

        getUV (); //calling function to get UV information

    });
};
 
    // function getUV(){
    //     var apiKey = "&appid=28a251366afe42620dacd55b2d9f72b3";
    //     let queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon" + lon + apiKey + "&units=imperial";
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"     
    //       }).then(function(response) {             
    //           console.log(response)    
    //     });

};




});
