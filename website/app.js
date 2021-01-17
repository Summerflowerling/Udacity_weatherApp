/* Global Variables */
const apiKey = '7743c0da8ed6533b23d63c005660ad8c';
const baseURL = "http://api.openweathermap.org/data/2.5/weather?appid=";
const generateBtn = document.querySelector("#generate");
const dateArea = document.querySelector("#date");
const tempArea = document.querySelector("#temp");
const contentArea = document.querySelector("#content");
let userText
let zip
let temp

/*fetch data from open weather api*/

   async function getWeather(zip) {
    
        const myPromise = await fetch(baseURL + apiKey + "&units=metric&zip="+ zip);    
        const myData = await myPromise.json();  
        console.log(myData)
        temp = myData.main.temp;  
        return temp;
        
   
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
    userText = document.querySelector("#feelings").value
    zip = document.querySelector("#zip").value
    getWeather(zip).then((data)=>{
        
        if (userText.length ===0){
            postData("/", {body:{date:newDate, temp:data, feeling: "No feeling" }})
            
        }else {
            postData("/", {body:{date:newDate, temp:data,feeling: `${userText}` }})
            }
    })
    .then((getPostedData)=>{
        return getPostedData.json()
    })
    .then((finalData)=>{
        console.log(finalData)
    })

})

/*Get the data from user imput*/
/*async function getUserInput() {
    
    const userInput = await fetch("");    
    const myData = await userInput.json();  
    console.log("This is user input",myData)
  }
*/



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();