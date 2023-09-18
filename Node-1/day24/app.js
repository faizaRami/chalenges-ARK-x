const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// async function createinput() {
//   fs.writeFileSync("input.txt", strCity, (err) => {
//     if (err) console.log("error ");
//   });
// }
async function fetchCity(lat, lng) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
  );
  const data = await response.json();
  return data;
}
// let cities;
// fs.readFile('input.txt',(err,data)=>{
//     if(err){
//         console.log("error while fetching data from input.txt");
//         return;
//     }
//         cities = JSON.parse(data)

// })
function readCityDataFromFile() {
  try {
    const data = fs.readFileSync("input.txt", "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading city data from file: ${error.message}`);
  }
}
const cities = readCityDataFromFile();
console.log(cities);
async function getInput() {
  rl.question(`Enter the city : `, async (cityName) => {
    console.log("your city is : " + cityName);
    let cityFound = false;

    for (let i = 0; i < cities.length; i++) {
      let current = cities[i];
      if (current.name.toLowerCase() === cityName.toLowerCase()) {
        console.log(current.name);
        const d = await fetchCity(current.lat, current.lng);
        console.log(
          "Name is : " + current.name + " Weather : " + JSON.stringify(d)
        );
        cityFound = true;
        fs.writeFile(`${current.name}.txt`, JSON.stringify(d), (err) => {
          if (!err) console.log("file created success");
          else {
            console.log("error while creating file");
          }
        });
        break;
      }
    }

    if (!cityFound) {
      console.log("Enter correct city");
    }
  });
}
getInput();

//   let cities;
//   fs.readFile('input.txt',(_err,data)=>{
//     cities = JSON.parse(data);
//     rl.question("enter city:",(cityName)=>{
//         console.log(cityName);
//         for(let i=0; i< cities.length; i++){
//             console.log(cities[i]);
//         }
//     })
//   })
