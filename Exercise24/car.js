const http = require('http')

class Car {
    constructor(speed, model, brand) {
        this.speed = speed;
        this.model = model;
        this.brand = brand;
        this.serviceStatus = false;
    }
    setModel(model) {
        this.model = model;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    setBrand(brand) {
        this.brand = brand
    }
    speedUp(speed) {
        setTimeout(() => {
            this.speed += speed;
        }, 3000);
    }
    checkService() {
        return new Promise((resolve, reject) => {
            http.get({
                host: 'www.microsoft.com',
                path: '/'
            }, (response) => {
                var body = '';
                response.on('data', (d) => {
                    body += d;
                });
                response.on('end', () => {
                    this.serviceStatus = true; 
                    resolve(true);
                });
                response.on("error", () => {
                    this.serviceStatus = false;
                    reject(false);
                })
            });

        });
    }
    getBrand(){
        return this.brand;
    }
    getModel(){
        return this.model;
    }
    getBrandWithModel()
    {
        var result = "";
        result += this.getBrand();
        result += "/"
        //result += this.model;
        result += this.getModel();
        return result;
    }

}

module.exports = Car;