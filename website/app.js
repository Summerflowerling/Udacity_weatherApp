
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

   async function getWeather(zip, input) {
    
        const myPromise = await fetch(baseURL + apiKey + "&units=metric&zip="+ zip);    
        
        try{const myData = await myPromise.json();  
            temp = myData.main.temp;  
            icon = myData.weather[0].icon
            dataFromOpenWeather.push(temp,icon, zip, input)
            return (dataFromOpenWeather)}
        catch(error){
            alert("Please enter America zip code")
            return;
        }

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
   
     
    try{
        const newData = await response.json()
        console.log(newData)
        return newData

    } catch(error){
    
       console.log("Something went wrong",error)
    }

}

function updateUi(data){
    console.log("data inside updateUi", data)
    
    zip.value=``;
    feelingArea.value=``;
    
    dateArea.innerHTML = `
        <p>${data.date}</p>
        `
        tempArea.innerHTML = `
        <p>Temperature: ${data.temp}</p>
        `

        contentArea.innerHTML = `
        <p>You are feeling ${data.feeling}</p>
        `
    entryArea.style.display="block"
    closeSign.style.display="block"

}


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




closeSign.addEventListener("click", function(){
    closeSign.style.display = "none";
    entryArea.style.display="none";
   
        const newElement = document.createElement('div');
        newElement.classList.add("entryHistory-content")
        newElement.innerHTML = `
        <img class="entryHistory-content-icon" src = "http://openweathermap.org/img/wn/${dataFromOpenWeather[1]}.png"/>
        <h5 class="entryHistory-content-title">Your Weather Journal on ${storedData[3]}</h5>
        <p class="entryHistory-content-zip">zip: ${dataFromOpenWeather[2]}<p>    
        <p class="entryHistory-content-temp">temp:  ${dataFromOpenWeather[0]}</p>
        <p class="entryHistory-content-feeling">feeling: ${dataFromOpenWeather[3]}</p>
        `
        document.querySelector("#entryHistory").appendChild(newElement);
        dataFromOpenWeather=[];

})




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();




