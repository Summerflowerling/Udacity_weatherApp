
/* Global Variables */
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
let dataFromOpenWeather
let storedValue = []
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



/*Note: require doesn't exit in client side, need to use webpack*/




    
    


/*post request*/
const postData =  async (url="", data = {}) => {
   
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
       

    })

    .then(res=> res.json())
    .then(json=>{
        storedValue = json
        
    })
   
     
    

}

/*fetch data from open weather api*/

    async function getWeather() {
        const weatherCall = await fetch("/getWeather");  
         try{
             const finalWeatherData = await weatherCall.json()
             updateUi(finalWeatherData)
             dataFromOpenWeather = finalWeatherData
             console.log("Weather call in client",dataFromOpenWeather)

         }
         catch(err){
            console.log("Something wrong when fetching the data", err)
         }
       
     }
     

function updateUi(apiData){
    const {temp, feels_like} =apiData.main
    const cityName = apiData.name
    //const {id, main, description, icon } = data.weather
    console.log("data inside updateUi", apiData)
    
    
    
    dateArea.innerHTML = `
        <p>${apiData.date}</p>
        `
        tempArea.innerHTML = `
        <p>Temperature: ${temp}</p>
        `

        contentArea.innerHTML = `
        <p>It feels like: ${feels_like}</p>
        <p>Note for today: ${feelingArea.value} </p>
        `
    entryArea.style.display="block"
    closeSign.style.display="block"
    

}

generateBtn.addEventListener("click",  async function(){
    if(zip.value.length !=5){
        return (alert("Please enter America zip code"))
     }

     postData("/", {"zip":zip.value, "feeling":feelingArea.value})
     try{

        getWeather()
     }
     catch(err){
         console.log("Oopse, something is wring", err)
     }

     

        

    })

/*
generateBtn.addEventListener("click", function(){
    
        if(zip.value.length !=5){
       return (alert("Please enter America zip code"))
    }
    getWeather(zip.value, feelingArea.value).then((data)=>{
        
        if (data[3].length ===0){
           
            return postData("/", {date:newDate, temp:data[0], feeling: "No feeling", zip:data[2], icon:data[1] })
        
            
        }else {
           
           return  postData("/", {date:newDate, temp:data[0],feeling: data[3],zip:data[2], icon:data[1] })
            }
    })
   .then(()=>
    fetch("http://localhost:8080/getData").then(function(response) {
        const myData = response.json()
        return myData
       })
       .then((data)=>{
           console.log(data)
         if(data.temp === undefined)return
         storedData = [zip.value, data.temp, data.feeling, data.date]
         updateUi(data)
             })
             
         .catch((err)=>{
             console.log(err)
         })
 
   )
        
})

*/


closeSign.addEventListener("click", function(){
    closeSign.style.display = "none";
    entryArea.style.display="none";
   
        const newElement = document.createElement('div');
        newElement.classList.add("entryHistory-content")
        newElement.innerHTML = `
        <img class="entryHistory-content-icon" src = "http://openweathermap.org/img/wn/${dataFromOpenWeather.weather[0].icon}.png"/>
        <h5 class="entryHistory-content-title">Your Weather Journal on ${newDate}</h5>
        <p class="entryHistory-content-zip">zip: ${zip.value}<p>    
        <p class="entryHistory-content-temp">temp:  ${dataFromOpenWeather.main.temp}</p>
        <p class="entryHistory-content-feeling">Your feeling note: ${feelingArea.value}</p>
        `
        document.querySelector("#entryHistory").appendChild(newElement);
        dataFromOpenWeather=[];
        zip.value=``;
        feelingArea.value=``;

})







