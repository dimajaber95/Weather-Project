Weather Widget Application

This is a weather widget that lets users check the weather of any city. It fetches data from an external weather API and shows temperature, weather conditions, and other details. You can also mark cities as favorites and view their weather.

Setup Instructions
1. Clone the Repository
Clone the repository to your local machine.

git clone https://github.com/dimajaber95/Weather-Project.git
cd weather-widget
2. Install Dependencies
Install the required packages by running the following command:

npm install
3. Set Up API Key
Obtain an API key from WeatherAPI.
Replace the key value in the weather API request URL with your API key in WeatherWidget.tsx.

4. Run the Application
Start the application using:

npm run dev
This will run the app on http://localhost:3000.

5. Build for Production (optional)
To build the application for production, run:

npm run build
This will create a build folder with the optimized production build.

Application Structure
WeatherWidget.tsx: The main component for the weather widget. It manages the location input, fetches weather data, and handles errors and loading states. It also displays favorite cities and their weather.
FavouriteCities.tsx: Displays a list of favorite cities and their weather information.
CitiesOptions.tsx: A component for selecting and toggling favorite cities.
cities-data.ts: Contains static data for cities and their information.
default-cities.ts: Contains default cities to fetch weather data for initial display.
Weather Data Interface
The weather data is represented by the following TypeScript interface:

interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}
Fetching Weather Data
Weather data is fetched from the WeatherAPI using a GET request. The city name is passed as a query parameter to retrieve the current weather details, including temperature, humidity, wind speed, and condition.

const response = await fetch(
  `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${cityName}`
);
If the API request is successful, the application displays the temperature, weather description, and location. If not, it shows an error message.

Features
Search Weather by City: Users can input a city name and search for its weather.
Favorite Cities: Users can toggle favorite cities, and these will be listed under "Your Favorite Cities".
Default Cities: Weather data for default cities is displayed when the app loads.
Weather Messages: Custom messages based on temperature and weather condition.
