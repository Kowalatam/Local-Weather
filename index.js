setLocationText();

function setLocationText(){
  $.getJSON("https://ipinfo.io", function(response) {
    $("#location").html(response.city + ", " + response.region);
  }, "jsonp");
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  	var latitude = position.coords.latitude;
  	var longitude = position.coords.longitude;
    //dark sky section
	key = "cc0d5ea98d6b9028349995cd2ef7cf1e"
	api_url = "https://api.darksky.net/forecast/" + key + "/" + latitude + "," + longitude
	$.getJSON(api_url + "?callback=?", function(forecast) {
		var temp = Math.floor(forecast.currently.temperature);
		var theSummary = forecast.currently.summary;
		var theIcon = forecast.currently.icon;
		$("#tempValue").html(temp);
		$("#icon").html(theIcon);
		$("#tempP").html(" F");
		$("body").css("background-image", "url" + "(" + backgroundImages[theIcon] + ")");
		//the weather icons
		var skycons = new Skycons({ color: "black" });
		skycons.add(document.getElementById('skycon'), forecast.currently.icon);
		skycons.play();
		//convert to celcuis and fahrenheit
		$("button").on("click", function convertToC() {
		    var fahrenheit = temp;
		    if($("span").html() == temp){
			  	celsius = Math.floor((fahrenheit - 32)/1.8);
			   	$("#tempValue").html(celsius);
			   	$("#tempP").html(String.fromCharCode(176) + "C");
			   	$("button").html("To F");
		    } else {
		    	$("#tempValue").html(temp);
		    	$("#tempP").html(" F");
		    	$("button").html("To C");
		    }			  
		})
	});
}

function error() {
  alert("Geocoder failed");
}

var backgroundImages = {
	"clear-sky": "https://source.unsplash.com/9NUeLk0uqME",		
	"clear-night": "https://source.unsplash.com/_4Ib-a8g9aA",
	"partly-cloudy-day": "https://source.unsplash.com/KFnu4Y0uNJA",
	"partly-cloudy-night": "https://source.unsplash.com/fa73YB-Vono", 
	"cloudy": "https://source.unsplash.com/6nujnINwRz4",
	"rain": "https://source.unsplash.com/soGoAfesWO8",
	"sleet": "http://www.abccolumbia.com/wp-content/uploads/2016/01/Image4.jpg",
	"snow": "https://source.unsplash.com/WXvt3b8w98E",
	"wind": "https://source.unsplash.com/ifpIUxbtu7M",
	"fog": "https://source.unsplash.com/_cxR2y8TsXQ",
	"clear-day": "https://source.unsplash.com/qPJ6eRAMmCM"

}
