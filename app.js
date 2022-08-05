require("dotenv").config()
const request = require("request")
const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const { count } = require("console")
const date = require(__dirname + "/date.js")
//console.log(date);
const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname))
let temp,
	tempmin,
	tempmax,
	tempunit,
	description,
	imageurl,
	query,
	country,
	symbol

// console.log(temp1);
app.get("/", function (request, response) {
	response.render("form")
})
app.post("/", function (request, response) {
	let units = request.body.TemperatureUnit
	// console.log(request.body.TemperatureUnit);
	//console.log(units);
	query = request.body.cityname
	//console.log(query);
	country = request.body.countryname
	//console.log(country);
	const appid = process.env.API_ID
	//const units = "metric"
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		query +
		"&appid=" +
		appid +
		"&units=" +
		units +
		""
	if (units == "metric") {
		tempunit = "Celsius"
		symbol = "C"
	} else {
		tempunit = "Fahrenheit"
		symbol = "F"
	}
	https.get(url, function (res) {
		//console.log(res.statusCode)
		res.on("data", function (data) {
			const Weatherdata = JSON.parse(data)
			//console.log(Weatherdata)
			// const object={
			//       name: "Vishal",
			//       favouriteActor: "Akshay Kumar"
			// }
			// console.log(JSON.stringify(object));
			temp = Weatherdata.main.temp
			//console.log(temp);
			tempmin = Weatherdata.main.temp_min
			tempmax = Weatherdata.main.temp_max
			description = Weatherdata.weather[0].description
			//console.log(description);
			const icon = Weatherdata.weather[0].icon
			//console.log(icon)
			imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
			//console.log(imageurl);
			response.redirect("/weatherapp")
		})
	})
})
app.get("/weatherapp", function (request, response) {
	const day = date.headerdate
	// console.log(day)
	let today = new Date()
	let time = today.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	})
	response.render("list", {
		temperature: temp,
		temperaturemax: tempmax,
		temperaturemin: tempmin,
		temperatureunit: tempunit,
		temperaturedesc: description,
		temperatureimage: imageurl,
		temperaturecity: query,
		dayclock: day,
		countryname: country,
		symboltemp: symbol,
		timeclock: time,
	})
})

app.listen(process.env.PORT || 3000, function () {
	console.log("Server is running on port 3000")
})
