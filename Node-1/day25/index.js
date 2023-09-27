const url = require('url');
const http = require('http');

const cities = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
  { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
  { name: 'Rome', lat: 41.9028, lng: 12.4964 },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
];

const Data = async (lat, lng) => {
  const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
  return await data.json();
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/weather") {
    if ('city' in parsedUrl.query) {
      console.log(parsedUrl.query.city);
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].name.toLowerCase() === parsedUrl.query.city.toLowerCase()) {
          const it = await Data (cities[i].lat, cities[i].lng);;
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`Weather in ${cities[i].name} is: ${it.current_weather.temperature}°C`);
          console.log(`Weather in ${cities[i].name}is: ${it.current_weather.temperature}°C`);
        }
      }
    };
  } else res.writeHead(404, { 'Content-Type': 'text/plain' });
});

server.listen(() => console.log(`Server is listening to port 3000`))