  class Swiper {
    constructor(elem = document) {
      this.#element = elem;
      this.#elementProp = this.#element.getBoundingClientRect();

      //touch events
      // this.#element.addEventListener("touchstart",this.#startMove);
      this.#element.addEventListener("mousedown", this.#startMove);

    }
    //private properties
    #element = null;
    #elementProp = null;
    //Private function.
    #letsMove = function () { };
    //touch handling functions.
    #startMove = (e) => {
      // this.#element.addEventListener("touchmove",this.#moveWithtouch);
      this.#element.addEventListener("mousemove", this.#moveWithtouch);
      // this.#element.addEventListener("touchend",this.#endMove);
      this.#element.addEventListener("mouseup", this.#endMove);
      this.doFunc.onstart();
    }

    #moveWithtouch = (e) => {
      //console.log("i like to moving moving");
      this.#elementProp = this.#element.getBoundingClientRect();
      // let {clientX,clientY}=e.touches[0];
      let { clientX, clientY } = e;
      this.touch = { x: clientX, y: clientY };
      this.#letsMove();
      this.doFunc.onmove(this.touch);

    }

    #endMove = (e) => {

      this.doFunc.onend();
      this.#element.removeEventListener("mousemove", this.#moveWithtouch)
    }

    //public properties
    doFunc = {
      onend: function () { },
      onstart: function () { },
      onmove: function () { },
    };
    //Methods of swiper object
    //Moves element with touch position.
    translateWith(Pos, moveType) {
      let shiftElement = {};
      switch (Pos) {
        case 'middle':
          shiftElement.x = (this.#elementProp.width) / 2;
          shiftElement.y = (this.#elementProp.height) / 2;
          break;
        default:
          shiftElement.x = 0;
          shiftElement.y = 0;
          break;
        case 'top-right':
          shiftElement.x = this.#elementProp.width;
          shiftElement.y = 0;
          break;
        case 'bottom-left':
          shiftElement.x = 0;
          shiftElement.y = this.#elementProp.height;
          break;
        case 'bottom-right':
          shiftElement.x = this.#elementProp.width;
          shiftElement.y = this.#elementProp.height;
          break;

      }

      if (moveType === "translateMove") {
        let origin = {};
        origin.x = this.#elementProp.x;
        origin.y = this.#elementProp.y;

        console.log(origin.x, origin.y)
        this.#letsMove = () => {
          //console.log(`Touch x:${this.touch.x}, y:${this.touch.y} | Og  x:${origin.x}, y:${origin.y}`);
          this.#element.style.transform = `translateX(${this.touch.x - origin.x - shiftElement.x}px) translateY(${this.touch.y - origin.y - shiftElement.y}px)`;
        }


      } else {
        this.#element.style.position = "absolute";
        this.#letsMove = () => {
          this.#element.style.left = `${this.touch.x - shiftElement.x}px`;
          this.#element.style.top = `${this.touch.y - shiftElement.y}px`;
        }
      }
    }

    stopMove() {
      this.#letsMove = function () { };
    }

    stopSwipe() {
      this.#element.removeEventListener("touchstart", this.#startMove);
      this.#element.removeEventListener("touchmove", this.#moveWithtouch);
      this.#element.removeEventListener("touchend", this.#endMove)
    }
    get elementProperties() {
      return this.#elementProp;
    }
  }
