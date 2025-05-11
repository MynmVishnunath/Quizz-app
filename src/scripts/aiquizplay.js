// Global Variables
let prevIndex, nextIndex = -1;
let totalQuestions;

//select elemnts
const prevbtn = document.querySelector(".prev-btn");
const nextbtn = document.querySelector(".next-btn");
const submitbtn = document.querySelector(".sub-btn");
const generatebtn = document.querySelector(".generate");
const topic = document.querySelector("#topic");
const noofqstns = document.querySelector("#num-of-Qstns");

//page functions

//function to show previous card
function prev() {
    cardStack.swipePrev();
  }
  
//   function to  show next card
  function next() {
    cardStack.swipeNext();
  }
  
// function when submit quiz
  function submit() {
    console.log("answer submitted");
    calculateScore();
  }

  const saveOption = async (qzid, parent, e) => {
    //because of same name for all options of all card in the same document, check attribute of radio input doesnt work as expect 
    //so as an alternative approach i give class name to checked radio inputs
  
    const selectedOption = parent.querySelector(`input[name = "option"]:checked`);
    let checked = selectedOption.classList.contains("checked");
  
    //remove class from radio button wich is previously selected
    const selected_opt_prev = parent.querySelector(`.checked`);
    selected_opt_prev && selected_opt_prev.classList.remove("checked");
  
    //remove cheked if option is already selected otherwise add checked
    if (!checked) {
      //select
      selectedOption.classList.add("checked");
      let Object_Store = await open_transaction();
      await saveSelection(Object_Store, qzid, selectedOption.value);
    } else {
      // Deselect
      let Object_Store = await open_transaction();
      await saveSelection(Object_Store, qzid, "");
    }
  
  }

  function click_to_Large(e) {
    e.target.classList.toggle("readmore");
    console.log("box clicked twice");
  }

  function eventListnerforOptitons(parentCard, qzid) {
    const Options = parentCard.querySelector(".options");
    const radio = parentCard.querySelectorAll('input');
    const largeOptns = Options.querySelectorAll(".large");
    let optionEven = saveOption.bind(undefined, qzid, parentCard);
  
    //Initializing flag variables for double click action
    let clickCount = 0;
    let flag = true;
    // Options.addEventListener("change", optionEven);
  
    //prevent checking radio while  clicking and select option when click twice
    radio.forEach(x => {
      x.addEventListener("click", (e) => {
        
        clickCount = (clickCount == 2) ? 2 : ++clickCount;
        if (flag) {
          setTimeout(() => {
            if (clickCount == 2) {
              optionEven(e);
              console.log("clicked twice");
              // clickCount = 0;
            } else {
              console.log("clicked")
  
            }
            console.log(clickCount);
            clickCount = 0;
            flag = !flag;
          }, 300);
          flag = !flag;
        }
  
      });
      // x.addEventListener("dblclick", optionEven);
    });
    largeOptns.forEach(x => {
      x.addEventListener("click", click_to_Large);
    })
  
  }

  //Index updating functions.
function nextIndexchange() {
    prevIndex = nextIndex;
    nextIndex = (nextIndex + 1) % totalQuestions;
    return nextIndex;
  }
  
  function prevIndexchange() {
    nextIndex = prevIndex;
    prevIndex = (prevIndex - 1 + totalQuestions) % totalQuestions;
    return prevIndex;
  }

  function generate_quiz(){
    console.log("Generate quiz");
    const mode =  document.querySelector("#mode");
    sessionStorage.setItem("aiq_topic",topic.value);
    sessionStorage.setItem("aiq_num",noofqstns.value);
    sessionStorage.setItem("aiq_mode",mode.value);
     const topic_collect = document.querySelector(".topic-collect-dlog");
    topic_collect.close();
  }

  function enable_or_disable_generate(){
    if(noofqstns.value && topic.value)
      generatebtn.disabled = false;
  }
  
  //quiz ui creating function
let createComponent = async (qid = 0) => {
    const currentQzid = qid;
    console.log(currentQzid);
    let Object_Store = await open_transaction();
    const currentQuestion = await readData(Object_Store,currentQzid);
    let component = `
            <div class="qcard">
            <div class="question">
                ${currentQuestion.question}
            </div>
            <div class="options">`;
  
    currentQuestion.options.forEach(x => {
      component += `<label class="option ${(x.length > 30) ? "large" : ""}">${x}
                    <input type="radio" name="option" value="${x}" class=" ${(currentQuestion.selectedOption === x) ? "checked" : ""}" ${(currentQuestion.selectedOption === x) ? "" : ""}>
                    <span class="radio"></span>
                </label>`
    })
  
    component += `
            </div>
        </div>`;
  
    return { component, currentQzid };
  }

  // submit enabling function

function enableSubmit(index) {
    console.log(index, totalQuestions)
    if (index === (0))
      submitbtn.disabled = false;
  
  }

function startQuiz(){

    totalQuestions = 5;
    
    //Load first two questions to first two card.
  (async function firstLoad() {
    let componentObj = await createComponent(nextIndexchange());
    cardStack.cardsOndesk[0].innerHTML = componentObj.component;
    eventListnerforOptitons(cardStack.cardsOndesk[0], componentObj.currentQzid);
    componentObj = (await createComponent(nextIndexchange()));
    cardStack.cardsOndesk[1].innerHTML = componentObj.component;
    eventListnerforOptitons(cardStack.cardsOndesk[1], componentObj.currentQzid);
  })();
}

// set event listners to elements

noofqstns.addEventListener("change",enable_or_disable_generate);
topic.addEventListener("change",enable_or_disable_generate);
generatebtn.addEventListener("click",generate_quiz);
prevbtn.addEventListener("click", prev);
nextbtn.addEventListener("click", next);
submitbtn.addEventListener("click", submit);


// creating cardstack
const cardStack = new CardStack({
    containerclass: "card-container",
    noOfcardsOndesk: 5
  });

  
//call when next card shows
cardStack.funcWithNxt = async () => {
    const index = nextIndexchange();
    const componentObj = await createComponent(index);
    cardStack.cardsOndesk[1].innerHTML = componentObj.component;
    eventListnerforOptitons(cardStack.cardsOndesk[1], componentObj.currentQzid);
    console.log(componentObj.currentQzid);
    enableSubmit(index);
  }
  //call with when previous shows 
  cardStack.funcWithPrev = async () => {
    const componentObj = await createComponent(prevIndexchange());
    cardStack.cardsOndesk[0].innerHTML = componentObj.component;
    eventListnerforOptitons(cardStack.cardsOndesk[0], componentObj.currentQzid);
    console.log(componentObj.currentQzid);
  
  
  }

  
  