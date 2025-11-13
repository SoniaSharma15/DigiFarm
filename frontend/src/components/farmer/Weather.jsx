import React, { useState, useEffect, useCallback } from 'react';

// --- Weather Code to Icon/Description Mapping ---
const weatherCodes = {
    // Clear Sky
    0: { en: 'Clear sky', hi: 'स्वच्छ आकाश', icon: 'SunIcon' },
    // Mainly clear, partly cloudy, and overcast
    1: { en: 'Mainly clear', hi: 'मुख्यतः साफ़', icon: 'SunCloudIcon' },
    2: { en: 'Partly cloudy', hi: 'आंशिक बादल', icon: 'CloudIcon' },
    3: { en: 'Overcast', hi: 'घने बादल', icon: 'CloudIcon' },
    // Fog and depositing rime fog
    45: { en: 'Fog', hi: 'कोहरा', icon: 'CloudIcon' },
    48: { en: 'Depositing rime fog', hi: 'धुंध', icon: 'CloudIcon' },
    // Drizzle
    51: { en: 'Light drizzle', hi: 'हल्की बूंदाबांदी', icon: 'RainIcon' },
    53: { en: 'Moderate drizzle', hi: 'मध्यम बूंदाबांदी', icon: 'RainIcon' },
    55: { en: 'Dense drizzle', hi: 'घनी बूंदाबांदी', icon: 'RainIcon' },
    // Rain
    61: { en: 'Slight rain', hi: 'हल्की बारिश', icon: 'RainIcon' },
    63: { en: 'Moderate rain', hi: 'मध्यम बारिश', icon: 'RainIcon' },
    65: { en: 'Heavy rain', hi: 'भारी बारिश', icon: 'RainIcon' },
    // Snow
    71: { en: 'Slight snowfall', hi: 'हल्की बर्फबारी', icon: 'SnowIcon' },
    73: { en: 'Moderate snowfall', hi: 'मध्यम बर्फबारी', icon: 'SnowIcon' },
    75: { en: 'Heavy snowfall', hi: 'भारी बर्फबारी', icon: 'SnowIcon' },
    77: { en: 'Snow grains', hi: 'बर्फ के दाने', icon: 'SnowIcon' },
    // Thunderstorm
    95: { en: 'Thunderstorm', hi: 'तूफ़ान', icon: 'ThunderIcon' },
    96: { en: 'Thunderstorm with slight hail', hi: 'ओलों के साथ तूफ़ान', icon: 'ThunderIcon' },
    99: { en: 'Thunderstorm with heavy hail', hi: 'भारी ओलों के साथ तूफ़ान', icon: 'ThunderIcon' },
};

// --- Inline SVG Icons (for visual appeal) ---

const SunIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const CloudIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H17a5 5 0 0 0-3.5-5.6 4 4 0 0 0-7.7.7A5 5 0 0 0 5 19H4.5" />
        <path d="M22 10a3 3 0 0 0-.3-1.4 3 3 0 0 0-4.8 1.4 3 3 0 0 0-4.8-1.4 3 3 0 0 0-4.8 1.4" />
    </svg>
);

const SunCloudIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 11.5c.2-.5.5-1 1-1.3 1-.7 2.4-.4 3 .9.6 1.3-.8 2.5-2.2 2.7-1.4.3-2.6-1.1-2.6-2.3z" />
        <line x1="3" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="21" y2="12" />
        <line x1="12" y1="21" x2="12" y2="20" />
        <path d="M7.3 6.3l-.7-.7" />
        <path d="M17.3 17.3l-.7-.7" />
        <path d="M16 17a5 5 0 0 0-8 0" />
    </svg>
);

const RainIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2" />
        <path d="M18.8 8l-1.4 1.4" />
        <path d="M22 12h-2" />
        <path d="M18.8 15.6l-1.4-1.4" />
        <path d="M12 22v-2" />
        <path d="M5.2 15.6l1.4-1.4" />
        <path d="M2 12h2" />
        <path d="M5.2 8l1.4 1.4" />
        <path d="M16 13a4 4 0 0 0-8 0" />
        <path d="M12 17v-4" />
        <path d="M16 13a4 4 0 0 0-8 0" />
    </svg>
);

const SnowIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2" />
        <path d="M18.8 8l-1.4 1.4" />
        <path d="M22 12h-2" />
        <path d="M18.8 15.6l-1.4-1.4" />
        <path d="M12 22v-2" />
        <path d="M5.2 15.6l1.4-1.4" />
        <path d="M2 12h2" />
        <path d="M5.2 8l1.4 1.4" />
        <path d="M16 13a4 4 0 0 0-8 0" />
        <path d="M12 17v-4" />
        <path d="M16 13a4 4 0 0 0-8 0" />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
        <circle cx="9" cy="15" r="1" fill="currentColor" />
        <circle cx="15" cy="15" r="1" fill="currentColor" />
    </svg>
);

const ThunderIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9v5h4l-7 8v-5H6l7-8z" />
    </svg>
);

const WindIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 16v-4h4" />
        <path d="M18 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M10 20v-4h4" />
        <path d="M4 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M12 4v4h4" />
        <path d="M20 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
);

// Helper to get the correct icon component
const getIconComponent = (iconName) => {
    switch (iconName) {
        case 'SunIcon': return SunIcon;
        case 'CloudIcon': return CloudIcon;
        case 'SunCloudIcon': return SunCloudIcon;
        case 'RainIcon': return RainIcon;
        case 'SnowIcon': return SnowIcon;
        case 'ThunderIcon': return ThunderIcon;
        default: return CloudIcon;
    }
};

// Helper to get weather description and icon name
const getWeatherInfo = (code, lang) => {
    const info = weatherCodes[code] || { en: 'Unknown', hi: 'अज्ञात', icon: 'CloudIcon' };
    return {
        description: info[lang],
        iconName: info.icon,
    };
};

// --- Translation Data ---
const translations = {
    en: {
        title: "Real-Time Weather Tracker",
        searchPlaceholder: "Enter City Name (e.g., Mumbai, Delhi)",
        searchButton: "Search Weather",
        currentWeather: "Current Weather",
        forecast: "14-Day Forecast",
        loading: "Loading weather data...",
        error: "Could not fetch weather data. Please check the city name.",
        wind: "Wind Speed",
        kmh: "km/h",
        today: "Today",
        langToggle: "हिन्दी (Hindi)",
    },
    hi: {
        title: "वास्तविक समय मौसम ट्रैकर",
        searchPlaceholder: "शहर का नाम दर्ज करें (उदाहरण: मुंबई, दिल्ली)",
        searchButton: "मौसम खोजें",
        currentWeather: "वर्तमान मौसम",
        forecast: "14 दिन का पूर्वानुमान",
        loading: "मौसम डेटा लोड हो रहा है...",
        error: "मौसम डेटा नहीं मिल सका। कृपया शहर का नाम जांचें।",
        wind: "हवा की गति",
        kmh: "किमी/घंटा",
        today: "आज",
        langToggle: "English (Eng)",
    },
};

// --- Main App Component ---
const Weather = () => {
    const [language, setLanguage] = useState('en');
    const [locationQuery, setLocationQuery] = useState('Lucknow'); // Default initial city
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentLocation, setCurrentLocation] = useState('Lucknow');

    const T = translations[language];

    // Helper function to convert date to a readable day
    const getDayName = (dateString, lang) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'short' });
    };

    // Helper function to convert date to day/month format
    const getDayMonth = (dateString, lang) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short' });
    };

    // Main function to fetch weather data
    const fetchWeather = useCallback(async (location) => {
        if (!location) return;

        setLoading(true);
        setError('');

        try {
            // 1. Geocoding: Get Latitude and Longitude for the location name
            const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=${language}`;
            const geoResponse = await fetch(geoApiUrl);

            if (!geoResponse.ok) {
                throw new Error('Geocoding failed');
            }

            const geoJson = await geoResponse.json();
            
            if (!geoJson.results || geoJson.results.length === 0) {
                throw new Error('Location not found');
            }

            const { latitude, longitude, name, country } = geoJson.results[0];
            
            // 2. Weather & Forecast Fetch
            const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=14`;
            const weatherResponse = await fetch(weatherApiUrl);

            if (!weatherResponse.ok) {
                throw new Error('Weather API failed');
            }

            const weatherJson = await weatherResponse.json();

            // Structure the data for easy use
            const forecast = weatherJson.daily.time.map((date, index) => ({
                date,
                maxTemp: Math.round(weatherJson.daily.temperature_2m_max[index]),
                minTemp: Math.round(weatherJson.daily.temperature_2m_min[index]),
                weatherCode: weatherJson.daily.weather_code[index],
            }));

            setWeatherData({
                locationName: `${name}, ${country}`,
                currentTemp: Math.round(weatherJson.current.temperature_2m),
                currentWind: Math.round(weatherJson.current.wind_speed_10m),
                currentCode: weatherJson.current.weather_code,
                forecast,
            });
            setCurrentLocation(`${name}, ${country}`);
        } catch (err) {
            console.error(err);
            setError(T.error);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    }, [language, T.error]);

    // Fetch initial weather data on component load and language change
    useEffect(() => {
        fetchWeather(currentLocation || 'New York');
    }, [fetchWeather, currentLocation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(locationQuery);
    };

    const handleLanguageToggle = () => {
        setLanguage(prev => prev === 'en' ? 'hi' : 'en');
    };

    // --- Conditional Rendering ---

    const renderCurrentWeather = () => {
        if (!weatherData) return null;

        const { description, iconName } = getWeatherInfo(weatherData.currentCode, language);
        const Icon = getIconComponent(iconName);

        return (
            <div className={`p-8 rounded-2xl shadow-xl transition-all duration-500 transform bg-white/90 backdrop-blur-sm`}>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{T.currentWeather}</h2>
                <h3 className="text-4xl font-extrabold text-gray-800 mb-4 flex items-center">
                    <span className="mr-3">{weatherData.locationName}</span>
                    <span className="text-base font-normal text-gray-500">({getDayMonth(new Date(), language)})</span>
                </h3>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-7xl font-bold text-gray-900 leading-none mb-1">
                            {weatherData.currentTemp}°C
                        </p>
                        <p className={`text-xl font-medium ${iconName === 'SunIcon' ? 'text-yellow-600' : 'text-sky-700'}`}>
                            {description}
                        </p>
                    </div>

                    <div className={`w-32 h-32 flex-shrink-0 text-sky-500 transition-colors duration-500 ${iconName === 'SunIcon' ? 'text-yellow-500' : ''}`}>
                        <Icon strokeWidth={1.5} />
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                    <div className="flex items-center text-lg font-medium text-gray-600">
                        <WindIcon className="w-6 h-6 mr-2 text-gray-500" />
                        {T.wind}: {weatherData.currentWind} {T.kmh}
                    </div>
                </div>
            </div>
        );
    };

    const renderForecast = () => {
        if (!weatherData || !weatherData.forecast) return null;

        return (
            <div className="mt-8 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{T.forecast} ({weatherData.forecast.length} Days)</h2>
                
                <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-4">
                        {weatherData.forecast.map((day, index) => {
                            const { description, iconName } = getWeatherInfo(day.weatherCode, language);
                            const Icon = getIconComponent(iconName);
                            const isToday = index === 0;

                            return (
                                <div 
                                    key={day.date}
                                    className={`flex-shrink-0 w-40 p-4 text-center rounded-xl transition-all duration-300 transform 
                                        ${isToday ? 'bg-lime-100 border-2 border-green-500 shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`
                                    }
                                >
                                    <p className="text-sm font-semibold text-gray-500 uppercase">
                                        {isToday ? T.today : getDayName(day.date, language)}
                                    </p>
                                    <p className="text-xs text-gray-400 mb-3">{getDayMonth(day.date, language)}</p>

                                    <div className={`w-10 h-10 mx-auto mb-2 text-green-600 ${iconName === 'SunIcon' ? 'text-yellow-500' : ''}`}>
                                        <Icon />
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 mb-2 truncate">{description}</p>
                                    
                                    <div className="text-lg font-bold text-gray-800">
                                        {day.maxTemp}° <span className="text-gray-400 font-normal">/ {day.minTemp}°</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        // Changed gradient to farming (lime-50) and sky blue (sky-100)
        <div className="min-h-screen bg-gradient-to-br from-lime-50 to-sky-100 p-4 sm:p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header and Language Toggle */}
                <div className="flex justify-between items-center mb-6">
                    {/* Changed title color to dark green */}
                    <h1 className="text-3xl font-extrabold text-green-800">{T.title}</h1>
                    <button
                        onClick={handleLanguageToggle}
                        // Changed toggle button color to deep green
                        className="text-sm font-semibold px-3 py-1 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-200"
                    >
                        {T.langToggle}
                    </button>
                </div>
                
                {/* Search Bar */}
                <form onSubmit={handleSubmit} className="mb-8 flex shadow-lg rounded-xl overflow-hidden">
                    <input
                        type="text"
                        placeholder={T.searchPlaceholder}
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        // Changed focus ring color to green
                        className="flex-grow p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                    />
                    <button
                        type="submit"
                        // Changed search button color to dark green
                        className="bg-green-700 text-white px-6 sm:px-8 py-4 font-bold hover:bg-green-800 transition duration-300 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            T.searchButton
                        )}
                    </button>
                </form>

                {/* Status and Data Display */}
                {loading && (
                    // Changed loading text color to green
                    <div className="text-center p-8 bg-white/80 rounded-xl shadow-md text-green-600 font-medium">{T.loading}</div>
                )}

                {error && (
                    <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-md font-medium">{error}</div>
                )}
                
                {weatherData && (
                    <>
                        {renderCurrentWeather()}
                        {renderForecast()}
                    </>
                )}

                {!loading && !error && !weatherData && (
                    <div className="text-center p-12 bg-white/80 rounded-xl shadow-md text-gray-500">
                        <p className="text-xl">Search for a city to see the current conditions and 14-day forecast.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Weather;