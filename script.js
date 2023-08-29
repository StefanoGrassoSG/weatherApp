const { createApp } = Vue

  createApp({
    data() {
      return {
        showDetails: false,
        title: 'Weather app',
        city: '',
        lat: '',
        lon: '',
        weather: '',
        cityRes: '',
        temperature: '',
        wind: '',
        humidity: '',
        showError: false
      }
    },
    methods: {
        call() {
            axios.get("http://api.openweathermap.org/geo/1.0/direct?", {
                params: {
                    q: this.city,
                    appid: '0ece716e399cf3e867041243cb9ed938',
                    limit: '10'

                }
            }).
            then(res => {
                console.log(res.data)
                this.lat = res.data[0].lat
                this.lon = res.data[0].lon
                console.log(this.lat)
                console.log(this.lon)
                this.cityRes = res.data[0].name

                axios.get("https://api.openweathermap.org/data/2.5/weather?", {
                    params: {
                        lat: this.lat,
                        lon: this.lon,
                        appid: '0ece716e399cf3e867041243cb9ed938',
                        units: 'metric'
                    }
                }).
                then(response => {
                    console.log(response.data)
                    this.weather = response.data.weather[0].description
                    console.log(this.weather)
                    this.temperature = Math.floor(response.data.main.temp)
                    this.wind = response.data.wind.speed
                    this.humidity = response.data.main.humidity
                    this.showDetails = true

                })
                .catch(error => {
                    console.error("Errore nella seconda richiesta axios:", error);
                });
            })
            .catch(error => {
                console.error("Errore nella prima richiesta axios:", error);
                this.showError = true
                this.showDetails = false
            })
        },
    },
    computed: {
        stringToIcon() {
            if(this.weather == 'overcast clouds' || this.weather == 'broken clouds' || this.weather == 'scattered clouds') {
                return 'fa-solid fa-cloud fa-8x'
            }
            else if (this.weather == 'light rain') {
                return 'fa-solid fa-cloud-rain fa-8x'
            }
            else if (this.weather == 'few clouds') {
                return 'fa-solid fa-cloud-sun fa-8x'
            }
            else if(this.weather == 'clear sky') {
                return 'fa-solid fa-sun fa-8x'
            }
        },
        changeColor() {
            if(this.weather == 'clear sky') {
                return 'color: #8aaa18;'
            }
        }

    }
  }).mount('#app')
