const config = {
    base: {
        imgUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.8.113:8080/static/img/' : `http://${window.location.host}/machine/weather/static/img/`
    }
};

export default config;
