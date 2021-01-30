
/* Global Variables */
const apiKey = '7743c0da8ed6533b23d63c005660ad8c';
const baseURL = "http://api.openweathermap.org/data/2.5/weather?appid=";
const generateBtn = document.querySelector("#generate");
const dateArea = document.querySelector("#date");
const tempArea = document.querySelector("#temp");
const contentArea = document.querySelector("#content");
let feelingArea = document.querySelector("#feelings");
let zip = document.querySelector("#zip");
let entryArea = document.querySelector("#entryArea")
let closeSign = document.querySelector(".close")
let temp
let icon
let dataFromOpenWeather=[]
let storedValue = []

/*fetch data from open weather api*/

   async function getWeather(zip) {
    
        const myPromise = await fetch(baseURL + apiKey + "&units=metric&zip="+ zip);    
        const myData = await myPromise.json();  
        console.log(myData)
        temp = myData.main.temp;  
        icon = myData.weather[0].icon
        dataFromOpenWeather.push(temp,icon)
        return (dataFromOpenWeather)
        
   
      }


/*post request*/
const postData = async (url="", data = {}) => {
   
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
       

    });
    console.log(data)
     
    try{
        const newData = await response.json()
        console.log("This is new data", newData)
        return newData

    } catch(error){
        console.log("Something wrong", error)
    }

}


generateBtn.addEventListener("click", function(){
    
    getWeather(zip.value).then((data)=>{
        console.log("getWeatherThen", data)
        if (feelingArea.value.length ===0){
            return postData("/", {date:newDate, temp:data, feeling: "No feeling" })
        
            
            
        }else {
           return  postData("/", {date:newDate, temp:data,feeling: `${feelingArea.value}` })
            }
    })
    .then((getdata)=>{
        storedData = [zip.value, getdata.temp, getdata.feeling, getdata.date]
        updateUi(getdata)
        console.log("sotredData in GET", storedData)
    })

})

function updateUi(data){
    
    zip.value=``;
    feelingArea.value=``;
    
    dateArea.innerHTML = `
        <p>${data.date}</p>
        `
        tempArea.innerHTML = `
        <p>Temperature: ${dataFromOpenWeather[0]}</p>
        `

        contentArea.innerHTML = `
        <p>You are feeling ${data.feeling}</p>
        `
    entryArea.style.display="block"
    closeSign.style.display="block"
    console.log("storedData In Update UI", storedData)

}

closeSign.addEventListener("click", function(){
    closeSign.style.display = "none";
    entryArea.style.display="none";
   
        const newElement = document.createElement('div');
        newElement.classList.add("entryHistory-content")
        newElement.innerHTML = `
        <img class="entryHistory-content-icon" src = "http://openweathermap.org/img/wn/${dataFromOpenWeather[1]}.png"/>
        <h5 class="entryHistory-content-title">Your Weather Journal on ${storedData[3]}</h5>
        <p class="entryHistory-content-zip">zip: ${storedData[0]}<p>    
        <p class="entryHistory-content-temp">temp:  ${dataFromOpenWeather[0]}</p>
        <p class="entryHistory-content-feeling">feeling: ${storedData[2]}</p>
        `
        document.querySelector("#entryHistory").appendChild(newElement);
        dataFromOpenWeather=[];

})




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();




