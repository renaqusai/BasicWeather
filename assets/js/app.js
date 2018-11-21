// This is pulling your personal API key out of the config.js file
var myApiKey = apiKeys.MY_KEY;
// console.log(new Date())
// console.log(new Date().getTime())
// console.log(new moment().format("HH:mm"));
var d = ["Sunday","Monday", "Tuesday", "Wednesday", 
			"Thursday", "Friday", "Saturday"];
			var n = new Date().getDay();
			$("#today").text(d[n]);
			$("#time-display").append(new moment().format("HH:mm"))
			
			var m = new Date().getMonth() + 1;
			var t = new Date().getDate();
			var y = new Date().getFullYear();
			$("#date").append(m + "/" + t + "/" + y);

// On click of the #find-zip button trigger the api
// calls with the construted URLs.
$("#find-zip").on("click", function (event) {
	event.preventDefault();

	// Grab the zipcode from the input box
	var zip = $("#zip-input").val();

	// URL
	var queryURL = "https://dataservice.accuweather.com/locations/v1/postalcodes/search" + "?apikey=" + myApiKey + "&q=" + zip;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response[0].Key)
			
		// API url for Current Condition Card
		var currentURL = "https://dataservice.accuweather.com/currentconditions/v1/" + response[0].Key + "?apikey=" + myApiKey + "&details=true";
		
		$.ajax({
			url: currentURL,
			method: "GET"
		}).then(function (response) {
			console.log(response)
			$("#day1Visibility").append( + response[0].Visibility.Imperial.Value + " " + response[0].Visibility.Imperial.Unit);
			$("#day1Pressure").append(  + response[0].Pressure.Imperial.Value + " " + response[0].Pressure.Imperial.Unit);
		});

		// API url for Forecast Cards
		var forecastURL = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + response[0].Key + "?apikey=" + myApiKey + "&details=true&metric=false";
		
		$.ajax({
			url: forecastURL,
			method: "GET"
		}).then(function (response) {
			// console.log(response);
			// console.log(new Date());
			$("time-display").text();
			$("date").append(new Date());
			var d = ["Sunday","Monday", "Tuesday", "Wednesday", 
			"Thursday", "Friday", "Saturday"];

			// Day1 
			// Grab the data, put it in the containers
			
			// Day of the week calculation 
			var n = new Date().getDay();
			if (n < 7){
			$("#day1").text(d[n]);
			} else {
				$("#day1").text(d[n - 7]);
			};

			// Icon
			var weatherIconContainer1 = $('#weather-icon1');
			var iconNumber = "0" + response.DailyForecasts[0].Day.Icon
			var imageURL = "assets/images/accuWeatherIcons/"
			weatherIconContainer1.attr('src', imageURL + iconNumber + '-s.png');
			
			// Temp.
			var temp = $("#day1temp");
			temp.append(response.DailyForecasts[0].Temperature.Minimum.Value + " - ");
			temp.append(response.DailyForecasts[0].Temperature.Maximum.Value + "&#8457;");

			// Chance of precipitation
			var rain = $("#day1Rain");
			rain.append(response.DailyForecasts[0].Day.PrecipitationProbability);
			rain.append("%");

			// Wind speed
			var wind = $("#day1Wind");
			wind.append(response.DailyForecasts[0].Day.Wind.Speed.Value);
			wind.append(response.DailyForecasts[0].Day.Wind.Speed.Unit);

			// Sunrise time
			var sunrise = $("#day1Sunrise");
			const unformattedSunriseTime1 = response.DailyForecasts[0].Sun.Rise;
			const formattedSunriseTime1 = moment(unformattedSunriseTime1).format("h:mm");
			sunrise.append(formattedSunriseTime1);
			sunrise.append(" am");

			// Sunset time
			var sunset = $("#day1Sunset");
			const unformattedSunsetTime1 = response.DailyForecasts[0].Sun.Set;
			const formattedSunsetTime1 = moment(unformattedSunsetTime1).format("h:mm");
			sunset.append(formattedSunsetTime1);
			sunset.append(" pm");

			// Weather description text
			var phase = $("#day1Phase");
			phase.append(response.DailyForecasts[0].Day.LongPhrase)

			// Hours of sunlight
			var Suntime = $("#day1SunTime")
			Suntime.append(response.DailyForecasts[0].HoursOfSun)
			

			// Day 2
			// Grab the data, put it in the containers

			// Day of the week calculation 
			var n = new Date().getDay() + 1;
			if (n < 7){
				$("#day2").text(d[n]);
				}else{
					$("#day2").text(d[n - 7]);
				};

			// Icon
			var weatherIconContainer2 = $('#weather-icon2');
			var iconNumber = "0" + response.DailyForecasts[1].Day.Icon
			var imageURL = "assets/images/accuWeatherIcons/"
			weatherIconContainer2.attr('src', imageURL + iconNumber + '-s.png');

			// Temp.
			var temp = $("#day2temp");
			temp.text(response.DailyForecasts[1].Temperature.Minimum.Value + " - ");
			temp.append(response.DailyForecasts[1].Temperature.Maximum.Value + "&#8457;");

			// Chance of precipitation
			var rain = $("#day2Rain");
			rain.append(response.DailyForecasts[1].Day.PrecipitationProbability);
			rain.append("%");

			// Wind speed
			var wind = $("#day2Wind");
			wind.append(response.DailyForecasts[1].Day.Wind.Speed.Value);
			wind.append(response.DailyForecasts[1].Day.Wind.Speed.Unit);

			// Sunrise time 
			var sunrise = $("#day2Sunrise");
			const unformattedSunriseTime2 = response.DailyForecasts[1].Sun.Rise;
			const formattedSunriseTime2 = moment(unformattedSunriseTime2).format("h:mm");
			sunrise.append(formattedSunriseTime2);
			sunrise.append(" am");

			// Sunrise time
			var sunset = $("#day2Sunset");
			const unformattedSunsetTime2 = response.DailyForecasts[1].Sun.Set;
			const formattedSunsetTime2 = moment(unformattedSunsetTime2).format("h:mm");
			sunset.append(formattedSunsetTime2);
			sunset.append(" pm");

			// Weather description text
			var phase = $("#day2Phase");
			phase.append(response.DailyForecasts[1].Day.LongPhrase)

			// Hours of sunlight
			var Suntime = $("#day2SunTime")
			Suntime.append(response.DailyForecasts[1].HoursOfSun)


			// Day3
			// Grab the data, put it in the containers

			// Day of the week calculation 
			var n = new Date().getDay() + 2;
			if (n < 7){
				$("#day3").text(d[n]);
				}else{
					$("#day3").text(d[n - 7]);
				};

			// Icon
			var weatherIconContainer3 = $('#weather-icon3');
			var iconNumber = "0" + response.DailyForecasts[2].Day.Icon
			var imageURL = "assets/images/accuWeatherIcons/"
			weatherIconContainer3.attr('src', imageURL + iconNumber + '-s.png');

			// Temp.
			var temp = $("#day3temp");
			temp.text(response.DailyForecasts[2].Temperature.Minimum.Value + " - ");
			temp.append(response.DailyForecasts[2].Temperature.Maximum.Value + "&#8457;");

			// Chance of precipitation 
			var rain = $("#day3Rain");
			rain.append(response.DailyForecasts[2].Day.PrecipitationProbability);
			rain.append("%");

			// Wind speed
			var wind = $("#day3Wind");
			wind.append(response.DailyForecasts[2].Day.Wind.Speed.Value);
			wind.append(response.DailyForecasts[2].Day.Wind.Speed.Unit);
			
			// Sunrise time
			var sunrise = $("#day3Sunrise");
			const unformattedSunriseTime3 = response.DailyForecasts[2].Sun.Rise;
			const formattedSunriseTime3 = moment(unformattedSunriseTime3).format("h:mm");
			sunrise.append(formattedSunriseTime3);
			sunrise.append(" am");

			// Sunset time
			var sunset = $("#day3Sunset");
			const unformattedSunsetTime3 = response.DailyForecasts[2].Sun.Set;
			const formattedSunsetTime3 = moment(unformattedSunsetTime3).format("h:mm");
			sunset.append(formattedSunsetTime3);
			sunset.append(" pm");

			// Weather description text
			var phase = $("#day3Phase");
			phase.append(response.DailyForecasts[2].Day.LongPhrase)

			// Hours of sunlight
			var Suntime = $("#day3SunTime")
			Suntime.append(response.DailyForecasts[2].HoursOfSun)


			// Day 4
			// Grab the data, put it in the containers

			// Day of the week calculation 
			var n = new Date().getDay() + 3;
			if (n < 7){
				$("#day4").text(d[n]);
				}else{
					$("#day4").text(d[n - 7]);
				};

			// Icon
			var weatherIconContainer4 = $('#weather-icon4');
			var iconNumber = "0" + response.DailyForecasts[3].Day.Icon
			var imageURL = "assets/images/accuWeatherIcons/"
			weatherIconContainer4.attr('src', imageURL + iconNumber + '-s.png');

			// Temp.
			var temp = $("#day4temp");
			temp.text(response.DailyForecasts[3].Temperature.Minimum.Value + " - ");
			temp.append(response.DailyForecasts[3].Temperature.Maximum.Value + "&#8457;");

			// Chance of precipitation 
			var rain = $("#day4Rain");
			rain.append(response.DailyForecasts[3].Day.PrecipitationProbability);
			rain.append("%");

			// Wind speed
			var wind = $("#day4Wind");
			wind.append(response.DailyForecasts[3].Day.Wind.Speed.Value);
			wind.append(response.DailyForecasts[3].Day.Wind.Speed.Unit);
			
			// Sunrise time
			var sunrise = $("#day4Sunrise");
			const unformattedSunriseTime4 = response.DailyForecasts[3].Sun.Rise;
			const formattedSunriseTime4 = moment(unformattedSunriseTime4).format("h:mm");
			sunrise.append(formattedSunriseTime4);
			sunrise.append(" am");

			// Sunset time
			var sunset = $("#day4Sunset");
			const unformattedSunsetTime4 = response.DailyForecasts[3].Sun.Set;
			const formattedSunsetTime4 = moment(unformattedSunsetTime4).format("h:mm");
			sunset.append(formattedSunsetTime4);
			sunset.append(" pm");
			
			// Weather description text
			var phase = $("#day4Phase");
			phase.append(response.DailyForecasts[3].Day.LongPhrase)

			// Hours of sunlight
			var Suntime = $("#day4SunTime")
			Suntime.append(response.DailyForecasts[3].HoursOfSun)
			
			
			// Day 5
			// Grab the data, put it in the containers

			// Day of the week calculation 
			var n = new Date().getDay() + 4;
			if (n < 7){
				$("#day5").text(d[n]);
				}else{
					$("#day5").text(d[n - 7]);
				};

			// Icon
			var weatherIconContainer5 = $('#weather-icon5');
			var iconNumber = "0" + response.DailyForecasts[4].Day.Icon
			var imageURL = "assets/images/accuWeatherIcons/"
			weatherIconContainer5.attr('src', imageURL + iconNumber + '-s.png');

			// Temp.
			var temp = $("#day5temp");
			temp.text(response.DailyForecasts[4].Temperature.Minimum.Value + " - ");
			temp.append(response.DailyForecasts[4].Temperature.Maximum.Value + "&#8457;");

			// Chance of precipitation
			var rain = $("#day5Rain");
			rain.append(response.DailyForecasts[4].Day.PrecipitationProbability);
			rain.append("%");

			// Wind speed
			var wind = $("#day5Wind");
			wind.append(response.DailyForecasts[4].Day.Wind.Speed.Value);
			wind.append(response.DailyForecasts[4].Day.Wind.Speed.Unit);

			// Sunrise time
			var sunrise = $("#day5Sunrise");
			const unformattedSunriseTime5 = response.DailyForecasts[4].Sun.Rise;
			const formattedSunriseTime5 = moment(unformattedSunriseTime5).format("h:mm");
			sunrise.append(formattedSunriseTime5);
			sunrise.append(" am");

			// Sunset time
			var sunset = $("#day5Sunset");
			const unformattedSunsetTime5 = response.DailyForecasts[4].Sun.Set;
			const formattedSunsetTime5 = moment(unformattedSunsetTime5).format("h:mm");
			sunset.append(formattedSunsetTime5);
			sunset.append(" pm");

			// Weather description text
			var phase = $("#day5Phase");
			phase.append(response.DailyForecasts[4].Day.LongPhrase);

			// Hours of sunlight
			var Suntime = $("#day5SunTime")
			Suntime.append(response.DailyForecasts[4].HoursOfSun);
			
			// Adding the current zipcode for the weather currently being display
			var userZip= $("#zip2");
			userZip.append(zip);
		})
	});
	hideEntryShowForm();
	
	// On page load, show day 1 additional information
	$(".day1AdditionalInfo").show();
	// hide day 2 - 5 additional information
	$(".day2AdditionalInfo").hide();
	$(".day3AdditionalInfo").hide();
	$(".day4AdditionalInfo").hide();
	$(".day5AdditionalInfo").hide();
});


function hideEntryShowForm() {
	$(".entry-container").hide();
	$("#zip-display-return").show();
	$(".card-container").show();
}

function showEntryHideForm() {
	$(".entry-container").show();
	$("#zip-display-return").hide();
	$(".card-container").hide();
}

// Click interactions for the forecast cards
$(".forecast-card1").on("click", function() {
	// remove bg-dark classes 3 of them
	if ($(".forecast-card1").hasClass("bg-dark")) {
		// remove dark class on card 1 an add light backgrounds and selected class
		$(".forecast-card1").removeClass("bg-dark");
		$(".sunrise-time1").removeClass("bg-dark");
		$(".sunset-time1").removeClass("bg-dark");
		// add light class
		$(".forecast-card1").addClass("bg-light");
		$(".sunrise-time1").addClass("bg-light");
		$(".sunset-time1").addClass("bg-light");
		$(".forecast-card1").addClass("selected");

		// show day1additional information
		$(".day1AdditionalInfo").show();
		// hide day 2 - 5 additional information
		$(".day2AdditionalInfo").hide();
		$(".day3AdditionalInfo").hide();
		$(".day4AdditionalInfo").hide();
		$(".day5AdditionalInfo").hide();

		// Remove light classes from all other cards
		$(".forecast-card2").addClass("bg-dark");
		$(".sunrise-time2").addClass("bg-dark");
		$(".sunset-time2").addClass("bg-dark");

		$(".forecast-card3").addClass("bg-dark");
		$(".sunrise-time3").addClass("bg-dark");
		$(".sunset-time3").addClass("bg-dark");

		$(".forecast-card4").addClass("bg-dark");
		$(".sunrise-time4").addClass("bg-dark");
		$(".sunset-time4").addClass("bg-dark");

		$(".forecast-card5").addClass("bg-dark");
		$(".sunrise-time5").addClass("bg-dark");
		$(".sunset-time5").addClass("bg-dark");
	}
});

$(".forecast-card2").on("click", function() {
	// remove bg-dark classes 3 of them
	if ($(".forecast-card2").hasClass("bg-dark")) {
		// remove dark class on card 2 and add light backgrounds and selected class
		$(".forecast-card2").removeClass("bg-dark");
		$(".sunrise-time2").removeClass("bg-dark");
		$(".sunset-time2").removeClass("bg-dark");

		$(".forecast-card2").addClass("bg-light");
		$(".sunrise-time2").addClass("bg-light");
		$(".sunset-time2").addClass("bg-light");
		$(".forecast-card2").addClass("selected");

		// show day2additional information
		$(".day2AdditionalInfo").show();
		// hide day 1 & 3 - 5 additional information
		$(".day1AdditionalInfo").hide();
		$(".day3AdditionalInfo").hide();
		$(".day4AdditionalInfo").hide();
		$(".day5AdditionalInfo").hide();

		// Remove light classes from all other cards
		$(".forecast-card1").addClass("bg-dark");
		$(".sunrise-time1").addClass("bg-dark");
		$(".sunset-time1").addClass("bg-dark");

		$(".forecast-card3").addClass("bg-dark");
		$(".sunrise-time3").addClass("bg-dark");
		$(".sunset-time3").addClass("bg-dark");

		$(".forecast-card4").addClass("bg-dark");
		$(".sunrise-time4").addClass("bg-dark");
		$(".sunset-time4").addClass("bg-dark");

		$(".forecast-card5").addClass("bg-dark");
		$(".sunrise-time5").addClass("bg-dark");
		$(".sunset-time5").addClass("bg-dark");
	}
});

$(".forecast-card3").on("click", function() {
	// remove bg-dark classes 3 of them
	if ($(".forecast-card3").hasClass("bg-dark")) {
		// remove dark class on card 3 an add light backgrounds and selected class
		$(".forecast-card3").removeClass("bg-dark");
		$(".sunrise-time3").removeClass("bg-dark");
		$(".sunset-time3").removeClass("bg-dark");
		// add light class
		$(".forecast-card3").addClass("bg-light");
		$(".sunrise-time3").addClass("bg-light");
		$(".sunset-time3").addClass("bg-light");
		$(".forecast-card3").addClass("selected");

		// show day3additional information
		$(".day3AdditionalInfo").show();
		// hide day 1, 2, 4, 5 additional information
		$(".day1AdditionalInfo").hide();
		$(".day2AdditionalInfo").hide();
		$(".day4AdditionalInfo").hide();
		$(".day5AdditionalInfo").hide();

		// Remove light classes from all other cards
		$(".forecast-card1").addClass("bg-dark");
		$(".sunrise-time1").addClass("bg-dark");
		$(".sunset-time1").addClass("bg-dark");

		$(".forecast-card2").addClass("bg-dark");
		$(".sunrise-time2").addClass("bg-dark");
		$(".sunset-time2").addClass("bg-dark");

		$(".forecast-card4").addClass("bg-dark");
		$(".sunrise-time4").addClass("bg-dark");
		$(".sunset-time4").addClass("bg-dark");

		$(".forecast-card5").addClass("bg-dark");
		$(".sunrise-time5").addClass("bg-dark");
		$(".sunset-time5").addClass("bg-dark");
	}
});

$(".forecast-card4").on("click", function() {
	// remove bg-dark classes 3 of them
	if ($(".forecast-card4").hasClass("bg-dark")) {
		// remove dark class on card 4 an add light backgrounds and selected class
		$(".forecast-card4").removeClass("bg-dark");
		$(".sunrise-time4").removeClass("bg-dark");
		$(".sunset-time4").removeClass("bg-dark");
		// add light class
		$(".forecast-card4").addClass("bg-light");
		$(".sunrise-time4").addClass("bg-light");
		$(".sunset-time4").addClass("bg-light");
		$(".forecast-card4").addClass("selected");

		// show day4additional information
		$(".day4AdditionalInfo").show();
		// hide day 1, 2, 3, 5 additional information
		$(".day1AdditionalInfo").hide();
		$(".day2AdditionalInfo").hide();
		$(".day3AdditionalInfo").hide();
		$(".day5AdditionalInfo").hide();

		// Remove light classes from all other cards
		$(".forecast-card1").addClass("bg-dark");
		$(".sunrise-time1").addClass("bg-dark");
		$(".sunset-time1").addClass("bg-dark");

		$(".forecast-card2").addClass("bg-dark");
		$(".sunrise-time2").addClass("bg-dark");
		$(".sunset-time2").addClass("bg-dark");

		$(".forecast-card3").addClass("bg-dark");
		$(".sunrise-time3").addClass("bg-dark");
		$(".sunset-time3").addClass("bg-dark");

		$(".forecast-card5").addClass("bg-dark");
		$(".sunrise-time5").addClass("bg-dark");
		$(".sunset-time5").addClass("bg-dark");
	}
});

$(".forecast-card5").on("click", function() {
	// remove bg-dark classes 3 of them
	if ($(".forecast-card5").hasClass("bg-dark")) {
		// remove dark class on card 5 an add light backgrounds and selected class
		$(".forecast-card5").removeClass("bg-dark");
		$(".sunrise-time5").removeClass("bg-dark");
		$(".sunset-time5").removeClass("bg-dark");
		// add light class
		$(".forecast-card5").addClass("bg-light");
		$(".sunrise-time5").addClass("bg-light");
		$(".sunset-time5").addClass("bg-light");
		$(".forecast-card5").addClass("selected");

		// show day5additional information
		$(".day5AdditionalInfo").show();
		// hide day 1, 2, 3, 4 additional information
		$(".day1AdditionalInfo").hide();
		$(".day2AdditionalInfo").hide();
		$(".day3AdditionalInfo").hide();
		$(".day4AdditionalInfo").hide();

		// Remove light classes from all other cards
		$(".forecast-card1").addClass("bg-dark");
		$(".sunrise-time1").addClass("bg-dark");
		$(".sunset-time1").addClass("bg-dark");

		$(".forecast-card2").addClass("bg-dark");
		$(".sunrise-time2").addClass("bg-dark");
		$(".sunset-time2").addClass("bg-dark");

		$(".forecast-card3").addClass("bg-dark");
		$(".sunrise-time3").addClass("bg-dark");
		$(".sunset-time3").addClass("bg-dark");

		$(".forecast-card4").addClass("bg-dark");
		$(".sunrise-time4").addClass("bg-dark");
		$(".sunset-time4").addClass("bg-dark");
	}
});

// Didn't get this validation working quite right yet
// I want to check for - and . characters then trigger an
// alert letting the user know they can only enter 1 - 0 on the keyboard

// $("#zip-input").keyup(function(){
// 	console.log("keyup triggered");
// 	var text = $("#zip-input").val();
// 	console.log(text);

// 	if (this.text === ".") {
// 		alert('You can only enter numerical characters.');
// 		return false;
// 	}
// 	else if (this.text === "-") {
// 		alert('No spaces allowed');
// 		return false;
// 	}
// });