# Weather-Project
This is a weather widget that lets users check the weather of any city. It fetches data from an external weather API and shows temperature, weather conditions, and other details. You can also mark cities as favorites and view their weather.

Setup Instructions:

1- Clone the repository:
git clone https://github.com/your-repository/weather-widget.git
cd weather-widget

2-Install dependencies:
npm install

3-Set up the API key:
Get an API key from WeatherAPI.
Replace the key in the API URL in WeatherWidget.tsx.

4-Run the app:
npm run dev

5-Build for production (optional):
npm run build

Structure

WeatherWidget.tsx: Main component for displaying the weather and favorite cities.

FavouriteCities.tsx: Shows the weather of favorite cities.

CitiesOptions.tsx: Lets you mark cities as favorites.

cities-data.ts: Contains city data.

default-cities.ts: Holds default cities for initial weather data.


