"use client"; // Enables client-side rendering for this component
// Import necessary hooks and types from React
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
// Import custom UI components from the UI directory
import { Button, Card, CardHeader, Col, Container, Row } from "react-bootstrap";
import { CITIESDATA } from "./cities-data";
import FavouriteCities from "./Favourite-Cities";
import CitiesOptions from "./cities-options";
import { DEFAULTCITIES } from "./default-cities";

// Define a TypeScript interface for weather data
interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}

const citiesData = CITIESDATA;

// Default export of the WeatherWidgetComponent function
export default function WeatherWidget() {
  // State hooks for managing location input, weather data, error messages, and loading state
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false); // Flag to track fetching status
  const [cities, setCities] = useState(citiesData);

  const defaultCities = DEFAULTCITIES;
  // Function to handle the search form submission
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("Please enter a valid location."); // Set error message if location input is empty
      setWeather(null); // Clear previous weather data
      return;
    }

    setIsLoading(true); // Set loading state to true
    setError(null); // Clear any previous error messages

    try {
      // Fetch weather data from the weather API
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=af4b84a13ea8420eaff153755250202&q=${trimmedLocation}`
      );
      if (!response.ok) {
        // throw new Error("City not found");
        setError("City not found"); // Set error message
        setWeather(null); // Clear previous weather data
      }
      const data = await response.json();
      const weatherData: WeatherData = {
        temperature: data.current?.temp_c, // Get temperature in Celsius
        description: data.current?.condition.text, // Get weather description
        location: data.location?.name, // Get location name
        unit: "C", // Unit for temperature
      };
      setWeather(weatherData); // Set the fetched weather data
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found. Please try again."); // Set error message
      setWeather(null); // Clear previous weather data
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  useEffect(() => {
    const fetchBorderCountries = async () => {
      if (isFetched) return; // Stop fetching if already fetched

      try {
        const results = await Promise.all(
          defaultCities.map(async (city) => {
            const response = await fetch(
              `https://api.weatherapi.com/v1/current.json?key=af4b84a13ea8420eaff153755250202&q=${city.name}`
            );

            if (!response.ok) {
              //throw new Error("Network response was not ok");
              setError("City not found. Please try again."); // Set error message
              setWeather(null); // Clear previous weather data
            }

            const data = await response.json();
            return data;
          })
        );

        setBorderCountries(results);
        setIsFetched(true); // Set flag to true after fetching
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBorderCountries();
  }, [defaultCities, isFetched]); // Add isFetched to the dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to get a temperature message based on the temperature value and unit
  function getTemperatureMessage(temperature: number, unit: string): string {
    if (unit === "C") {
      if (temperature < 0) {
        return `It's freezing at ${temperature}°C! Bundle up!`;
      } else if (temperature < 10) {
        return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
      } else if (temperature < 20) {
        return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
      } else if (temperature < 30) {
        return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
      } else {
        return `It's hot at ${temperature}°C. Stay hydrated!`;
      }
    } else {
      // Placeholder for other temperature units (e.g., Fahrenheit)
      return `${temperature}°${unit}`;
    }
  }

  // Function to get a weather message based on the weather description
  function getWeatherMessage(description: string): string {
    switch (description.toLowerCase()) {
      case "sunny":
        return "It's a beautiful sunny day!";
      case "partly cloudy":
        return "Expect some clouds and sunshine.";
      case "cloudy":
        return "It's cloudy today.";
      case "overcast":
        return "The sky is overcast.";
      case "rain":
        return "Don't forget your umbrella! It's raining.";
      case "thunderstorm":
        return "Thunderstorms are expected today.";
      case "snow":
        return "Bundle up! It's snowing.";
      case "mist":
        return "It's misty outside.";
      case "fog":
        return "Be careful, there's fog outside.";
      default:
        return description; // Default to returning the description as-is
    }
  }

  // Function to get a location message based on the current time
  function getLocationMessage(location: string): string {
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6; // Determine if it's night time

    return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
  }

  const toggleFavorite = (cityName) => {
    setCities(
      cities.map((city) =>
        city.name === cityName
          ? { ...city, isFavorite: !city.isFavorite }
          : city
      )
    );
  };

  const sortedCities = cities.sort(
    (a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)
  );

  const favoriteCities = sortedCities?.filter(
    (city) => city.isFavorite === true
  );


  return (
    <Container>
      <Row style={{ marginTop: "30px" }}>
        <Col>
          {/* Form to input and submit the location */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              className="inputField"
              type="text"
              placeholder="Enter a city name"
              value={location}
              onChange={
                (e: ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value) // Update location state on input change
              }
            />

            <Button
              className="searchButton"
              type="submit"
              disabled={isLoading}
              variant="dark"
            >
              {isLoading ? "Loading..." : "Search"}{" "}
              {/* Show "Loading..." text while fetching data */}
            </Button>
          </form>
          {/* Display error message if any */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {/* Display weather data if available */}
          {weather && (
            <div className="mt-4 grid gap-2">
              {/* Display temperature message with icon */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {getTemperatureMessage(weather.temperature, weather.unit)}
                </div>
              </div>
              {/* Display weather description message with icon */}
              <div className="flex items-center gap-2">
                {/* <CloudIcon className="w-6 h-6 " /> */}
                <div>{getWeatherMessage(weather.description)}</div>
              </div>
              {/* Display location message with icon */}
              <div className="flex items-center gap-2">
                {/* <MapPinIcon className="w-6 h-6 " /> */}
                <div>{getLocationMessage(weather.location)}</div>
              </div>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3>Your Favorite Cities Are: </h3>
          <FavouriteCities favoriteCities={favoriteCities} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>Please select your favorite cities: </h4>
          <CitiesOptions
            sortedCities={sortedCities}
            toggleFavorite={toggleFavorite}
          />
        </Col>
      </Row>

      <Row
        style={{ margin: "20px 0px 40px 0px" }}
        xs={1}
        md={2}
        xl={5}
        lg={5}
        className="g-4"
      >
        {borderCountries.map((country, index) => (
          <Col key={index} className="colEdit">
            <Card className="bg-opacity-75 shadow  rounded cardStyle">
              <CardHeader
                style={{
                  backgroundColor: "#3399cc",
                  color: "white",
                  padding: "18px",
                }}
              >
                <div className="cardTitle">
                  <h6 style={{ fontWeight: "800" }}>
                    {country?.location.name}
                  </h6>
                  <h6>{country.current.last_updated.split(" ")[1]}</h6>
                </div>
              </CardHeader>
              <Card.Body>
                <div className="temperature p-3 mb-5 ">
                  <h3>{country?.current.temp_c}&deg;C</h3>
                  <p> {country?.current.condition.text}</p>
                </div>

                <div className="cardTitle">
                  <ul>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-wind mr-12"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                      </svg>
                      {country?.current.wind_kph + " km/h"}
                    </li>
                    <li>
                      <strong>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fillRule="currentColor"
                          className="bi bi-droplet"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"
                          />
                        </svg>
                      </strong>
                      {country?.current.humidity}
                    </li>
                  </ul>
                  <img
                    style={{ width: "40%" }}
                    src={country?.current.condition.icon}
                    alt="icon"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
