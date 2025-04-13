
  //Main Script

  //Global variables

  let prevIndex, nextIndex = -1;
  let totalQuestions;
  let qzid;

  //select elemnts
  const prevbtn=document.querySelector(".prev-btn");
  const nextbtn=document.querySelector(".next-btn");
  const submitbtn=document.querySelector(".sub-btn");

  //page functions

  //function to show previous card
  function prev() {
    cardStack.swipePrev();
  }
  
  function next() {
    cardStack.swipeNext();
  }

  function submit(){
    console.log("answer submitted");
  }

  const saveOption =async (qzid,e)=>{
    const allOptions = document.querySelectorAll(`input[name = option]`);
    allOptions.forEach(x =>{
      x.classList.remove("checked");
    });
    const selectedOption = document.querySelector(`input[name = "option"]:checked`);
    selectedOption.classList.add("checked");
    await saveSelection(qzid,selectedOption.value); 

  }

   function eventListnerforOptitons(parentCard,qzid){
      let Options = parentCard.querySelector(".options");
      let optionEven = saveOption.bind(undefined,qzid);
      Options.addEventListener("change", optionEven);
  
  }

  //Index updating functions.
  function nextIndexchange(){
    prevIndex = nextIndex;
    nextIndex = (nextIndex + 1) % totalQuestions;
    return nextIndex;
}

function prevIndexchange(){
   nextIndex = prevIndex;
   prevIndex = (prevIndex - 1 + totalQuestions) % totalQuestions;
   return prevIndex;
}



  //quiz ui creating function
  let createComponent = async (qid = 0) => {
    const currentQzid = qzid + qid;
    const currentQuestion = await getQuestion(currentQzid);
    let component =  `
          <div class="qcard">
          <div class="question">
              ${currentQuestion.question}
          </div>
          <div class="options">`;

    currentQuestion.options.forEach(x => {
      component += `<label class="option ${(x.length > 30) ? "large" : ""}">${x}
                  <input type="radio" name="option" value="${x}" class=" ${'sorry'/*(currentQuestion.selectedOption===x)?"checked":""*/}">
                  <span class="radio"></span>
              </label>`
    })

    component += `
          </div>
      </div>`;
    
    return {component,currentQzid};
  }

  // submit enabling function

  function enableSubmit(index){
    console.log(index, totalQuestions)
    if(index === (0))
      submitbtn.disabled = false;

  }


  // set event listners to elements

  prevbtn.addEventListener("click",prev);
  nextbtn.addEventListener("click",next);
  submitbtn.addEventListener("click",submit);

  // creating cardstack
  const cardStack = new CardStack({
    containerclass: "card-container",
    noOfcardsOndesk: 5
  });

  

  window.onload = async () => {
    qzid = await localStorage.getItem("selectedValue");
    dbqs = await openDatabase();
    console.log("line 2");
    //console.log(totalQuestions);
    let metaData = await readMeta();
    console.log(metaData);
    totalQuestions = metaData.numOfQstns;
    console.log(totalQuestions);
    console.log(qzid);

    //clear all options selected if some one have previously attend this.
    for (let i = 0; i < totalQuestions; i++) {
      await clearOption(qzid + i);

    }

    //Load first two questions to first two card.
    (async function firstLoad(){
    const componentObj =  await createComponent(nextIndexchange());
    cardStack.cardsOndesk[0].innerHTML =componentObj.component;
    eventListnerforOptitons(cardStack.cardsOndesk[0],componentObj.currentQzid);
    cardStack.cardsOndesk[1].innerHTML = (await createComponent(nextIndexchange())).component;
    })();


  }


  //call when next card shows
  cardStack.funcWithNxt = async () => {
    const index = nextIndexchange();
    const componentObj =  await createComponent(index);
    cardStack.cardsOndesk[1].innerHTML = componentObj.component;
    eventListnerforOptitons(cardStack.cardsOndesk[0],componentObj.currentQzid);
    enableSubmit(index);
  }
  //call with when previous shows 
  cardStack.funcWithPrev =async () => {
    const componentObj = await createComponent(prevIndexchange());
    cardStack.cardsOndesk[0].innerHTML = componentObj.component;
    eventListnerforOptitons(cardStack.cardsOndesk[0],componentObj.currentQzid);

  }

