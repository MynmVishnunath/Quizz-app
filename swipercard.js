
  class CardStack {
    constructor(cardStackObj) {
      this.#container = document.querySelector(cardStackObj.containerclass);
      this.cardsOndesk = [];
      this.#initializer(cardStackObj);

    }

    //private properties
    #container = null;
    #swipeLeftfunc = this.#nextcard;
    #swipeRightfunc = this.#previouscard.bind(this, -1);
    #swipeTopfunc = this.#nextcard;
    #swipeBottomfunc = this.#nextcard;

    //private methods
    #initializer(cardStackObj) {
      try {
        let className = cardStackObj.containerclass || "card-container";
        let container = document.querySelector("." + className);
        container.innerHTML;
        this.#container = container;
      } catch (e) {
        console.error(`Error ${e} Sol:create a div with class name "card-container" or give a valid class name inside object passed with constructor as property containerclass`);

      }

      try {
        let no = Math.ceil(cardStackObj.noOfcardsOndesk);
        console.log(no);
        if (!no) {
          throw new TypeError("Invalid type for noOfcardsOndesk. Expected a number but received " + typeof no);
        }
        this.#createFirstStack(no);
      } catch (e) {
        console.error(e);
      }

      let blank = () => { };
      this.onmove = cardStackObj.onmove || blank;
      this.onend = cardStackObj.onend || blank;
      this.onstart = cardStackObj.onstart || blank;


      if (cardStackObj.swipeFunc) {
        this.setSwiperFunction(cardStackObj.swipeFunc);
      } else {
        this.setSwiperFunction({});
      }


      if (cardStackObj.swipeBoarder) {
        this.setSwipeboarders(cardStackObj.swipeBoarders.top, cardStackObj.swipeBoarders.left, cardStackObj.swipeBoarders.bottom, cardStackObj.swipeBoarders.right);
      } else {
        this.setSwipeboarders();
      }

    }
    #createFirstStack(noofCards) {

      for (let i = 0; i < noofCards; i++) {
        this.#addCard();
      }
      this.#createSwiper(this.cardsOndesk[0])
    }

    #createSwiper(element) {
      let swipecard = new Swiper(element);
      swipecard.translateWith("middle", "translateMove");
      this.swipeElement = swipecard;

      this.swipeElement.doFunc.onmove = (touch) => {
        let elementLiveProperty = this.swipeElement.elementProperties;


      }

      this.swipeElement.doFunc.onend = () => {
        let elementLiveProperty = this.swipeElement.elementProperties;
        if (elementLiveProperty.left > this.swipeBoarderLeft) {
          console.log("dead at right");
          this.#swipeRightfunc(element);

        } else if (elementLiveProperty.right < this.swipeBoarderRight) {
          console.log("dead at left");
          this.#swipeLeftfunc(element);



        } else if (elementLiveProperty.bottom < this.swipeBoarderBottom) {
          console.log("dead at top");
          this.#swipeTopfunc(element);


        } else if (elementLiveProperty.top > this.swipeBoarderTop) {
          console.log("dead at bottom");
          this.#swipeBottomfunc(element);


        } else {
          console.log("safe");
          element.style.transform = "";
        }

      }
    }




    #nextcard(element) {

      element.style.transform = `translate3d(0px,0px,-15px) scale(0.8) rotate(16deg)`;
      element.classList.add("next");
      this.swipeElement.stopMove();
      setTimeout(() => {
        this.#container.removeChild(element);
      }, 300);
      this.#addCard();
      this.cardsOndesk.shift();
      this.#createSwiper(this.cardsOndesk[0]);
      this.funcWithNxt();

    }

    #previouscard(leftOrRight, element) {
      element.style.transform = '';
      this.swipeElement.stopSwipe();
      this.#container.removeChild(this.cardsOndesk[this.cardsOndesk.length - 1]);
      this.cardsOndesk.pop();
      let parent = this.#container;
      let card = document.createElement('div');
      card.classList.add("previous");
      card.style.setProperty("--i", leftOrRight);
      card.classList.add("card");
      parent.append(card);
      card.innerHTML = "previous card";
      this.cardsOndesk.unshift(card);
      this.#createSwiper(this.cardsOndesk[0]);
      this.funcWithPrev();

    }

    #addCard() {
      let parent = this.#container;
      let card = document.createElement('div');
      card.classList.add("card");
      parent.prepend(card);
      this.cardsOndesk.push(card);

    }


    //public properties and methods
    funcWithNxt = () => { }
    funcWithPrev = () => { }

    setSwipeboarders(top, left, bottom, right) {

      //Error Handling
      if (top) {
        if (!(typeof (top) === "number")) {
          throw new Error("Border Top value should be a number value given is a " + typeof (top));
        }
      }

      if (left) {
        if (!(typeof (left) === "number")) {
          throw new Error("Border Left value should be a number value given is a " + typeof (left));
        }
      }

      if (bottom) {
        if (!(typeof (bottom) === "number")) {
          throw new Error("Border Bottom value should be a number value given is a " + typeof (bottom));
        }
      }

      if (right) {
        if (!(typeof (right) === "number")) {
          throw new Error("Border Top value should be a number value given is a " + typeof (right));
        }
      }
      //setting values
      let elementProps = this.swipeElement.elementProperties;
      this.swipeBoarderLeft = left || (elementProps.left + elementProps.right) / 2;
      this.swipeBoarderRight = right || (elementProps.left + elementProps.right) / 2;
      this.swipeBoarderTop = top || (elementProps.top + elementProps.bottom) / 2;
      this.swipeBoarderBottom = bottom || (elementProps.top + elementProps.bottom) / 2;

      console.log(this.swipeBoarderLeft)
      console.log(this.swipeBoarderRight)
      console.log(this.swipeBoarderTop)
      console.log(this.swipeBoarderBottom)
    }

    setSwiperFunction(swipeActn) {


      switch (swipeActn.left) {
        case ("previous"):
          this.#swipeLeftfunc = this.#previouscard.bind(this, 1);
          break;
        case ("next"):
          this.#swipeLeftfunc = this.#nextcard;
          break;
        default:
          this.#swipeLeftfunc = this.#nextcard;
          break;

      }

      switch (swipeActn.right) {
        case ("previous"):
          this.#swipeRightfunc = this.#previouscard.bind(this, -1);
          break;
        case ("next"):
          this.#swipeRightfunc = this.#nextcard;
          break;
        default:
          this.#swipeRightfunc = this.#nextcard;
          break;

      }

      switch (swipeActn.top) {
        case ("previous"):
          this.#swipeTopfunc = this.#previouscard.bind(this, 1);
          break;
        case ("next"):
          this.#swipeTopfunc = this.#nextcard;
          break;
        default:
          this.#swipeTopfunc = this.#nextcard;
          break;

      }

      switch (swipeActn.bottom) {
        case ("previous"):
          this.#swipeBottomfunc = this.#previouscard.bind(this, -1);
          break;
        case ("next"):
          this.#swipeBottomfunc = this.#nextcard;
          break;
        default:
          this.#swipeBottomfunc = this.#nextcard;
          break;

      }
    }

    swipeNext() {
      this.#nextcard(this.cardsOndesk[0]);
    }

    swipePrev(pos = -1) {
      this.#previouscard(pos, this.cardsOndesk[0]);
    }
  }
