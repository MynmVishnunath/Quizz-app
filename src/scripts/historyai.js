// Modification of history js file

// Global variables
let totalQuestions = 5;
const body = document.querySelector(".history-container");
const home_btn = document.querySelector(".home");
const quiz_btn = document.querySelector(".quiz");

// onload function

window.onload = async () => {
    // qzid = await localStorage.getItem("selectedValue");
     await openDatabase();
    console.log("line 2");
    console.log(totalQuestions);
    readDatabase();

}

// Collectiong question from indexedDB
async function readDatabase() {
    console.log("function working");
    for (let i = 0; i < totalQuestions; i++) {
        let object_Store = await open_transaction();
        const qobj = await readData(object_Store,i);
        // new QuestionHis(qobj);
        console.log(qobj);
       await createQuizcard(qobj);
    }
}

// function to create each card that holds the quiz
async function createQuizcard(qobj) {
    const quiz_box = document.createElement("div");
    quiz_box.className = "quiz-box";

    const status = document.createElement("div");
    status.className = "status";
    status.classList.add(whatsThe_status_class(qobj));

    const question = document.createElement("div");
    question.className = "question";

    const options = document.createElement("div");
    options.className = "options";

    body.appendChild(quiz_box);
    quiz_box.appendChild(status);
    status.innerHTML = whatsThe_status_value(qobj);
    quiz_box.appendChild(question);
    question.innerHTML = qobj.question;
    quiz_box.appendChild(options);
    options.innerHTML = optionList(qobj);
}

function optionList(quiz_obj) {
    let optnstring = ``;
    quiz_obj.options.forEach(option => {
        optnstring += `
         <div class="opt-box ${whatsThe_status(option,quiz_obj).class}">
                <img src="${whatsThe_status(option,quiz_obj).img}" alt="">
                <div class="option">
                  ${option}
                </div>
            </div>
        `

    });

    return optnstring;
}

function whatsThe_status_class(quiz_obj){
 if(quiz_obj.selectedOption === "" || !quiz_obj.selectedOption){
    return "noanswer";
 }else if(quiz_obj.selectedOption === quiz_obj.answer){
    return "right";
 }else{
    return "wrong";
 }
}

function whatsThe_status(option,quiz_obj){
    const obj = {};
    if((option === quiz_obj.selectedOption) && (option === quiz_obj.answer)){
        obj.img = "../src/icons/like.svg";
        obj.class = "right"
    }else if((option === quiz_obj.selectedOption) && !(option === quiz_obj.answer)){
        obj.img = "../src/icons/deslike.svg";
        obj.class = "wrong";
    }else if(option === quiz_obj.answer){
        obj.img = "../src/icons/tick.svg";
        obj.class = "right";
    }else{
        obj.img = "";
        obj.class = "";
    }

    return obj;
  
}

function whatsThe_status_value(quiz_obj){
    if(quiz_obj.selectedOption === "" || !quiz_obj.selectedOption){
        return "Not answered";
     }else if(quiz_obj.selectedOption === quiz_obj.answer){
        return "Right";
     }else{
        return "Wrong";
     }
     
}

function gotoHome(){
    window.open("../chooseQuiz.html","_self");
}

function backToQuiz(){
    // window.open("../Pages/gamePlay.html","_self");
}

// Event Listneres
home_btn.addEventListener("click",gotoHome);
quiz_btn.addEventListener("click",backToQuiz);