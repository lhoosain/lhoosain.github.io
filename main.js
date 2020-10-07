
// Toggle Register Create password 
var state= false;

function toggle1(){
    if(state){
    document.getElementById("password1").setAttribute("type","password");
	state = false;
     }
     else{
    document.getElementById("password1").setAttribute("type","text");
	state = true;
     }
}

// Toggle Register Confirm password
function toggle2(){
    if(state){
    document.getElementById("password2").setAttribute("type","password");
	state = false;
     }
     else{
    document.getElementById("password2").setAttribute("type","text");
	state = true;
     }
}

// Toggle Login form password
function toggle3(){
    if(state){
    document.getElementById("password").setAttribute("type","password");
	  state = false;
     }
     else{
    document.getElementById("password").setAttribute("type","text");
	  state = true;
     }
}




const api = {  
    key: "efb6c45cb1049dd3d9ff22b6c9898d41",          //my openweathermap api key
    base: "https://api.openweathermap.org/data/2.5/"  //base url which we add key and other params to (units=metric)
}



const getWeatherButton = document.querySelector(".getWeather-btn");
const searchBox = document.querySelector(".search-box");

getWeatherButton.addEventListener("click", function() {
  const query = searchBox.value;
  getResults(query)
});


function getResults(query){
    fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`) 
        .then(weather => {
          return weather.json();
    }) .then(displayResults);
}


//This function gets all the information about weather and manipulates HTML DOM to display on page
function displayResults (weather) { //Passing weather as an arg/param in the function, this is used inside my function

  //City
  let city = document.querySelector('.info .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
 
  //Date
  let now = new Date();
  let date = document.querySelector('.info .date');
  date.innerText = dateBuilder(now);  //Datebiulder function defined below to get current dates that is updated

  //Temperature - Rounding temperature down using Math.round()
  let temp = document.querySelector('.info .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  //Weather conditions (Sunny, Rainy, Cloudy, Storms etc etc.)
  let conditions = document.querySelector('.info .weather');
  conditions.innerText = weather.weather[0].main;

  //Changes temperature color based on conditons (= or over 20 will be red/ 19 and under will be blue)
  let temperature = document.querySelector(".temp");  //Assigning the temperature value to a variable 

  if (parseInt(temperature.innerHTML) >= 20) { //parseInt to convert result to an int before comparing
    temperature.style.color = "#f74020"; //Styling based on conditions 
  } else {
    temperature.style.color = "#2997ff";
  }


}

function dateBuilder (d) { 

  //Array of months and days that uses a get method to get the current day/month etc
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  //Getting current day,date,month,year
  let day = days[d.getDay()];  
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
} 


//Temperature conversion calculations
function getConversion(){ //Function for temperature conversion

  //Celsius to fahrenheit calculation
  let cValue = document.getElementById("C").value;
  let conversion1 = cValue * 9 / 5 + 32;
  document.getElementById("result1").innerHTML = `${cValue} &#8451; is equal to ${conversion1} &#8457;`;
  
  //Fahrenheit to celsius calculation
  let fValue = document.getElementById("F").value;
  let conversion2 = Math.floor((fValue - 32) * 5 / 9); //Math.floor() - rounds down a result
  document.getElementById("result2").innerHTML = `${fValue} &#8457; is equal to ${conversion2} &#8451;`;
}



const clearButton = document.getElementById("clear-btn");

clearButton.addEventListener("click", function() {
  document.getElementById('result1').innerHTML = '';
  document.getElementById('result2').innerHTML = '';
})

// 2  functions to open and close the contact form (contact button)
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

