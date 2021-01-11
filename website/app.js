/* Global Variables */
const apiKey = '7743c0da8ed6533b23d63c005660ad8c';
const CompleteURL = "api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=743c0da8ed6533b23d63c005660ad8c";


/*fetch data from open weather api*/

async function getWeather() {
    
     const myPromise = await fetch(CompleteURL);
    
     const myData = await myPromise.json();
     let finalData = myData.list;
    
     console.log(finalData)
    
   }

   
document.addEventListener("click", getWeather)



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