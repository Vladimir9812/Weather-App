import React  from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "826de8b8669f502a876c2b11aa328179";
class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
     e.preventDefault();
     const city = e.target.elements.city.value;
     const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
     const data = await api_url.json();
     console.log(data);
    
     if(city) {
     let date_set = new Date(data.sys.sunset*1000);
     let hours = date_set.getHours(); // Minutes part from the timestamp
     let minutes = "0" + date_set.getMinutes(); // Seconds part from the timestamp
     let seconds = "0" + date_set.getSeconds();
     let sunset_date = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

     let date_rise = new Date(data.sys.sunrise*1000);
     let hour = date_rise.getHours(); // Minutes part from the timestamp
     let minute = "0" + date_rise.getMinutes(); // Seconds part from the timestamp
     let second = "0" + date_rise.getSeconds();
     let sunrise_date = hour + ':' + minute.substr(-2) + ':' + second.substr(-2);

     
     this.setState({
      temp: data.main.temp,
      city: data.name,
      country: data.sys.country,
      sunrise: sunrise_date,
      sunset:  sunset_date,
      error: undefined
     });
  } else {
    this.setState ({
      temp: undefined,
      city: undefined,
      country: undefined,
      sunrise: undefined,
      sunset: undefined,
      error: "Введите название города"
    })
  }
}
  render() {
    return (
      <div className="wrapper">
        <div className="main"> 
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info"> 
              <Info />
            </div>
            <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather} />
              <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
        </div> 
      </div>
    );
  }
}
export default App;