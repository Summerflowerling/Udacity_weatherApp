/* Global Variables */
const apiKey = '7743c0da8ed6533b23d63c005660ad8c';
const baseURL = "http://api.openweathermap.org/data/2.5/weather?appid=";
const generateBtn = document.querySelector("#generate");
let userText

/*fetch data from open weather api*/

   async function getWeather(zip) {
    
        const myPromise = await fetch(baseURL + apiKey + "&units=metric&zip="+ zip);    
        const myData = await myPromise.json();  
        let temp = myData.main.temp;  
        console.log(temp)
   
      }

   
generateBtn.addEventListener("click", function(){
    userText = document.querySelector("#feelings").value
   
    if (userText.length ===0){
        postData("/", {feeling: "No feeling" })
        
    }else {
        postData("/", {feeling: `${userText}` })
        }
   
    getWeather(85001)

})



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




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();