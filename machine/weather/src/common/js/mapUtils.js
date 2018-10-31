export default {
    getAddress({longitude, latitude}) {
        return new Promise((resolve, reject) => {
            window.AMap.service('AMap.Geocoder', () => {
                let geocoder = new window.AMap.Geocoder();
                geocoder.getAddress([longitude, latitude], (status, {info, regeocode}) => {
                    resolve(status === 'complete' && info === 'OK' ? regeocode.addressComponent : '');
                });
            });
        });
    },
    getWeather(city) {
        return new Promise((resolve, reject) => {
            window.AMap.plugin('AMap.Weather', () => {
                let weather = new window.AMap.Weather();
                weather.getLive(`${city}市`, (err, day) => {
                    if (!err) {
                        weather.getForecast(`${city}市`, (err, {forecasts}) => {
                            if (!err) {
                                resolve({day, days: forecasts});
                            }
                        });
                    }
                });
            });
        });
    }
};
