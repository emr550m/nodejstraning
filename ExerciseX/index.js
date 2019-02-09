

class OutOfContext {

    constructor() {
        this.name = "My Name is Emrah";
        this.Age = "1500";
        this.color = "Reddish" 
    }

    showMeData() {
        setTimeout(function(){
            this.print();
        }, 200);

        /*
         setTimeout(()=>{
            this.print();
        }, 200);
        */
    }

    print() {
        console.log(this.name);
        console.log(this.Age);
        console.log(this.color);
    }
}

var a = new OutOfContext();

a.showMeData();