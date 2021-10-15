console.log('app is running...');

Vue.component('weather', {

  data: function() {
    return {
        isLoaded: true,
        weatherData: {
            name: null,
            country: null,
            description: null,
            iconUrl: null,
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            speed: 0,
            deg: 0,
            humidity: 0,
            pressure: 0,
            timezone: 0
        }
    }
  },

  mounted: function() {


      navigator.geolocation.getCurrentPosition(res => {

        let longitude = res.coords.longitude;
        let latitude = res.coords.latitude;

        fetch(`/weather?lon=${longitude}&lat=${latitude}`).then(data => {
            return data.json();
        }).then(response => {

            console.log(response);

            const {
                description,
                icon
            } = response.weather[0];

            const {
                temp,
                feels_like,
                temp_min,
                temp_max,
                humidity,
                pressure
            } = response.main;

            const {
                speed,
                deg
            } = response.wind;

            this.weatherData = {
                name: response.name,
                country: response.sys.country,
                description,
                iconUrl: `http://openweathermap.org/img/wn/${icon}@2x.png`,
                temp: temp.toFixed(),
                feels_like: feels_like.toFixed(),
                temp_min: temp_min.toFixed(),
                temp_max: temp_max.toFixed(),
                speed,
                deg,
                humidity,
                pressure,
                time: new Date(response.timezone * 1000)
            }

            console.log(this.weatherData.time);

        }).catch(error => {
            console.log(error);
        });

        
      }, err => {
        console.log(err);
      });
  },
  
  template: `
    <div class="weather-card">

        <div class="weather-card__weather">

            <div class="weather__icon_desc">
                <img v-bind:src=weatherData.iconUrl class="weather__icon" />
                <span class="weather__desc">{{ weatherData.description }}</span>
            </div>

            <div class="weather-text">
                <span class="weather__deg">{{weatherData.temp}} °</span>

                <div class="weather__time_loc">
                    <span class="weather__address">{{ weatherData.name }}</span>
                </div>
                
            </div>
            

        </div>

        <div class="weather-card__details">

            <h3 class="details__header">Weather Details</h3>

            <ul class="details__list">

                <li class="detail__list-item">
                    <span>Temp:</span>
                    <span>{{weatherData.temp}} °</span>
                </li>

                <li class="detail__list-item">
                    <span>Feels Like:</span>
                    <span>{{weatherData.feels_like}} °</span>
                </li>

                <li class="detail__list-item">
                    <span>Min:</span>
                    <span>{{weatherData.temp_min}} °</span>
                </li>

                <li class="detail__list-item">
                    <span>Max:</span>
                    <span>{{weatherData.temp_max}} °</span>
                </li>

                <li class="detail__list-item">
                    <span>Humidity:</span>
                    <span>{{weatherData.humidity}}</span>
                </li>

                <li class="detail__list-item">
                    <span>Pressure:</span>
                    <span>{{weatherData.pressure}}</span>
                </li>
            </ul>
        </div>
    </div>
  `
})

//vue instance
var app = new Vue({
  el: '#app',
  data: {
  }
})