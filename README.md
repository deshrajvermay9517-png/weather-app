# Weather App

A simple and responsive Weather App built using **HTML, CSS, and JavaScript**.  
This app allows users to search for any city and view current weather details along with a 5-day forecast.

## Live Demo

```text
 https://deshrajvermay9517-png.github.io/weather-app/
```

## Features

- Search weather by city name
- Display city and country name
- Show current temperature
- Show weather condition
- Show feels-like temperature
- Show humidity
- Show wind speed
- Show 5-day weather forecast
- Show loading and error messages
- Responsive design for mobile and desktop
- No API key required

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Open-Meteo API

## API Used

This project uses **Open-Meteo API**.

### 1. Geocoding API

Used to convert city name into latitude and longitude.

Example:

```text
City Name → Latitude and Longitude
```

### 2. Weather Forecast API

Used to fetch current weather and 5-day forecast using latitude and longitude.

It provides:

- Temperature
- Weather condition
- Humidity
- Feels-like temperature
- Wind speed
- Daily forecast

## Project Workflow

1. User enters a city name.
2. User clicks the search button or presses Enter.
3. JavaScript gets the city name from the input field.
4. The Geocoding API converts the city name into latitude and longitude.
5. The Weather Forecast API fetches weather data using latitude and longitude.
6. JavaScript receives the weather data in JSON format.
7. Current weather details are displayed on the screen.
8. 5-day forecast is displayed below the current weather card.
9. If the city is invalid, an error message is shown.

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
```

2. Open the project folder:

```bash
cd weather-app
```

3. Open `index.html` in your browser.

Or use **Live Server** in VS Code.

## Author

**Deshraj Verma**

- GitHub: [deshrajvermay9517-png](https://github.com/deshrajvermay9517-png)

## Conclusion

This Weather App is a beginner-friendly frontend project that demonstrates API integration, DOM manipulation, event handling, and responsive UI design using HTML, CSS, and JavaScript.
