import React, { useEffect, useState } from "react";
import "./css/style.css";

const WeatherApp = () => {
  const [theme,setTheme] = useState("light-theme");
 const toggleTheme =()=>{
  if(theme==="dark-theme"){
    alert("trun on Dark Mode");
    setTheme("light-theme");
  } else{
    alert("trun on Light Mode");
    setTheme("dark-theme");
  }
 };
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ba268d1aad198c0503d9a8effebc8bec`;
      const res = await fetch(url);
      const resJson = await res.json();
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);

  useEffect(()=>{
    document.body.className = theme;
  },[theme])

  return (
    <>
    <div className="main">
    <div>
      <button className="btn" onClick={()=>toggleTheme()}>Toggle Mode</button>
    </div>
      <div className="box">
          <h1 className="heading">Weather App</h1>
          <div className="inputData">
            <input
              type="search"
              value={search}
              className="inputfield"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        {!city ? (
          <p>No Data Found</p>
        ) : (
          <div className="infor">
            <h2 className="location">
              <i className="fa-solid fa-location-crosshairs"></i>
              {search}
            </h2>
            <h1 className="temp">{city.temp}°C </h1>
            <h3 className="maxTemp">
              MinTemp : {city.temp_min}°C | MaxTemp : {city.temp_max}°C
            </h3>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default WeatherApp;
