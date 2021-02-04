let saveCity = [];
let lat = "";
let lon = "";
let navDiv = $(".list-group-flush");
let city = "San Diego, California";


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
        let uvIndex = $("</p>").addClass("card-text-uv").text("UV: ");        
            
        let cardBody = $("<div>").addClass("card-body")
        let iconImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            //https://openweathermap.org/img/w/01n.png

        let cardContainer = $("<div>").addClass("card")
        
        lat = response.coord.lat;
        lon = response.coord.lon;        

        cityName.append(iconImage);
        cardBody.append(cityName, temperature, humidity, windSpeed, uvIndex);
        cardContainer.append(cardBody);

        let historyLinks = document.querySelectorAll("a");
        let history = false;
        for(let i = 0; i < historyLinks.length; i++){
            if(historyLinks[i].dataset.city === userInput){
              history = true;            
          }
        }
        if(!history){          
          navDiv.append(`<a href="#" class="list-group-item list-group-item-action bg-light" data-city="${userInput}">${response.name}</a>`);
        }
        
        $("#current-weather").append(cardContainer);

        getUV (); //calling function to get UV information
        getFiveDay (); //calling function to get 5 day forecast

    });
};
 
    function getUV(){
        var apiKey = "&appid=28a251366afe42620dacd55b2d9f72b3";
        let queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + apiKey + "&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"     
          }).then(function(response) {             
              console.log(response)            
                let uvValue = response.value;
                let uvDisplay = "badge badge-secondary";
                if(uvValue < 3){
                    uvDisplay = "badge badge-success";
                    } else if (uvValue >= 3 && uvValue < 7){
                    uvDisplay = "badge badge-warning";
                    } else {
                    uvDisplay = "badge badge-danger";
                };
                
              
              let uvp = document.getElementsByClassName("card-text-uv")[0]
              uvp.textContent+= response.value;
              uvp.setAttribute("class","card-text-uv " + uvDisplay);     

        });

};

function getFiveDay(){
  var apiKey = "&appid=28a251366afe42620dacd55b2d9f72b3";
  let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&cnt=6"+ apiKey + "&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
  console.log(response);
  forecast=$(".card-group");
  forecast.html("");
  for(let i = 1; i < 6; i++){
    let histDate = moment.unix(response.daily[i].dt).format("MM/DD/YYYY");
    forecast.append(`<div class="card text-white bg-primary mr-2" style="max-width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${histDate}</h5>
      <img src="https://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png">
      <p class="card-text">Temp: ${response.daily[i].temp.day}°F</p>
      <p class="card-text">Humidity: ${response.daily[i].humidity}</p>
    </div>
  </div>`)
  }



})
}

$(".list-group-flush").on("click", "a", function(event){
  event.preventDefault();      
  city_name = $(this).data("city");
  searchCurrent(city_name);
});




});
