require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}


app.get('/api/weather', async (req, res) => {
  const location = req.query.location;
  if (!location || location.trim() === '') {
    return res.status(400).json({ error: 'Location parameter is missing.' });
  }

  const encodedLocation = encodeURIComponent(location);
  const APIkey = process.env.API_KEY;
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${encodedLocation}&apikey=${APIkey}`;

  try {
    const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
    console.log("Data received:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.get('/api/forecast', async (req, res) => {
    const location = req.query.location;
    if (!location || location.trim() === '') {
      return res.status(400).json({ error: 'Location parameter is missing.' });
    }
  
    const encodedLocation = encodeURIComponent(location);
    const APIkey = process.env.API_KEY;
    // Request both hourly and daily data in one API call
    const url = `https://api.tomorrow.io/v4/timelines?location=${encodedLocation}&fields=temperature&timesteps=1h,1d&units=metric&apikey=${APIkey}`;
  
    try {
      const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
      
      // Initialize containers for the data
      const hourlyData = [];
      const dailyData = [];
  
      // Loop through timelines and split the data accordingly
      response.data.data.timelines.forEach((timeline) => {
        if (timeline.timestep === '1h') {
          hourlyData.push(...timeline.intervals);
        } else if (timeline.timestep === '1d') {
          dailyData.push(...timeline.intervals);
        }
      });
  
      // Construct the forecast data object
      const forecastData = {
        hourly: hourlyData,
        daily: dailyData
      };
  
      res.json(forecastData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
  });
  

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// prevs endpoint routing for forecast data:


// app.get('/api/forecast', async (req, res) => {
//     const location = req.query.location;
//     if (!location || location.trim() === '') {
//       return res.status(400).json({ error: 'Location parameter is missing.' });
//     }
  
//     const encodedLocation = encodeURIComponent(location);
//     const APIkey = process.env.API_KEY;
//     const hourlyUrl = `https://api.tomorrow.io/v4/timelines?location=${encodedLocation}&fields=temperature&timesteps=1h&units=metric&apikey=${APIkey}`;
//     const dailyUrl = `https://api.tomorrow.io/v4/timelines?location=${encodedLocation}&fields=temperature&timesteps=1d&units=metric&apikey=${APIkey}`;
  
//     try {
//       const [hourlyResponse, dailyResponse] = await Promise.all([
//         axios.get(hourlyUrl, { headers: { 'Accept': 'application/json' } }),
//         axios.get(dailyUrl, { headers: { 'Accept': 'application/json' } })
//       ]);
  
//       const forecastData = {
//         hourly: hourlyResponse.data.data.timelines[0].intervals,
//         daily: dailyResponse.data.data.timelines[0].intervals
//       };
  
//       res.json(forecastData);
//     } catch (error) {
//       console.error("Error fetching forecast data:", error);
//       res.status(error.response ? error.response.status : 500).json({ error: error.message });
//     }
//   });