class Progress{
    constructor(){
      this.#root = document.querySelector(':root');
      this.#percent_meter = document.querySelector(".percentmeter");
      this.#percent_status = document.querySelector(".percent-status");
    }

    //private properties
    #root = null;
    #percent_meter = null;
    #percent_status = null;

    //public methods
    growProgress(value){
        this.#root.style.setProperty("--percent",value);
        console.log(value);
        this.changemeter(`${value}%`);
    }

    changestatus(value){
        this.#percent_status.innerHTML = value;
    }

    changemeter(value){
        this.#percent_meter.innerHTML = value;
    }
}