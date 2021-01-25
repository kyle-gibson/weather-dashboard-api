let saveCity = [];
let lat = "";
let lon = "";
let navDiv = $(".list-group-flush");
let city = "San Diego, California";

// if(localStorage.getItem("weather") === null){ 
//     city = "San Diego, California";
//     populate();
//   } else{    
//     saveCity = JSON.parse(localStorage.getItem("weather"));
//     city = saveCity[saveCity.length - 1];
//     saveCity.forEach(e => {    
//       let name = e.split(",")
//       navDiv.append(`<a href="#" class="list-group-item list-group-item-action bg-light" data-city="${e}">${name[0]}</a>`);
//     })  
//     populate();
//   }


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
        console.log(lat, lon);

        cityName.append(iconImage);
        cardBody.append(cityName, temperature, humidity, windSpeed, uvIndex);
        cardContainer.append(cardBody);
        
        $("#current-weather").append(cardContainer);

        getUV (); //calling function to get UV information

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
              let uvDisplay = "badge badge-secondary";
              if(uvValue < 3){
                uvDisplay = "badge badge-success";
              } else if (uvValue >= 3 && uvValue < 7){
                uvDisplay = "badge badge-warning";
              } else {
                uvDisplay = "badge badge-danger";
              };
              
              
              document.getElementsByClassName("card-text-uv")[0].textContent+= response.value;
              $("#card-text-uv").addClass("card-text-uv badge badge-warning");
        
        
            
        });

};


function storage(){
    if(localStorage.getItem("weather") === null){
      localStorage.setItem("weather", JSON.stringify([city]));
    } else{
      let saveCity = JSON.parse(localStorage.getItem("weather"));
      saveCity[saveCity.length] = city;
      localStorage.setItem("weather", JSON.stringify(saveCity));
    }
  }

});
