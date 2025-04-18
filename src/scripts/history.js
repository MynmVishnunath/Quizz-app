// Global variables
let totalQuestions;
const body = document.querySelector(".history-container");
const home_btn = document.querySelector(".home");
const quiz_btn = document.querySelector(".quiz")

//onload function

window.onload = async () => {
    qzid = await localStorage.getItem("selectedValue");
    dbqs = await openDatabase();
    console.log("line 2");
    const metaData = await readMeta();
    console.log(metaData);
    totalQuestions = metaData.numOfQstns;
    console.log(totalQuestions);
    readDatabase();

}

async function readDatabase() {
    console.log("function working");
    for (let i = 0; i < totalQuestions; i++) {
        
        const qobj = await getQuestion(qzid + i);
        // new QuestionHis(qobj);
        console.log(qobj);
       await createQuizcard(qobj);
    }
}

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
 if(quiz_obj.selectedOption === ""){
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
    if(quiz_obj.selectedOption === ""){
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
    window.open("../Pages/gamePlay.html","_self");
}

// Event Listneres
home_btn.addEventListener("click",gotoHome);
quiz_btn.addEventListener("click",backToQuiz);