
/* Global Variables */

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=1259969657dfbfc713f6f6cb7caa2d64';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWheather(baseURL, zipCode, apiKey)
    .then(function(data){
      postData('/add', {date:newDate, location:data.name, temp:data.main.temp, feelings:feelings});
    })
    .then(
      updateUI('/all')
    )
}

/* Function to GET Web API Data*/
const getWheather = async (baseURL, zipCode, apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey);
    try {
      const data = await res.json();
      return data;
    }
    catch(error) {
      console.log("error", error);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
    });
    try {
      const newData = await res.json();
      return newData;
    }
    catch(error) {
      console.log("error", error);
    }
  }

/* Function to GET Project Data */
const updateUI = async () => {
  const req = await fetch('/all');
  try{
    const allData = await req.json();
    console.log(allData);
    document.getElementById('date').innerHTML = allData[allData.length - 1].date;
    document.getElementById('location').innerHTML = allData[allData.length - 1].location;
    document.getElementById('temp').innerHTML = allData[allData.length - 1].temp;
    document.getElementById('content').innerHTML = allData[allData.length - 1].feelings;

  }catch(error){
    console.log("error", error);
  }
}
