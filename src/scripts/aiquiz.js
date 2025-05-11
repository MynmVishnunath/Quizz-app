// Global variables
const progress = new Progress();
let totalQuestions;//global for aiquizplay, aiquiz, progress and scoreai
let res = `<<Quiz>> [
  {
    "Qno":0,
    "question": "Which temple hosts Thrissur Pooram?",
    "options": ["Vadakkunnathan Temple", "Guruvayur Temple", "Padmanabhaswamy Temple", "Sabarimala Temple"],
    "answer": "Vadakkunnathan Temple"
  },
  {
    "Qno":1,
    "question": "Which musical instrument is prominently played during Thrissur Pooram?",
    "options": ["Chenda", "Veena", "Flute", "Sitar"],
    "answer": "Chenda"
  },
  {
    "Qno":2,
    "question": "What is a key highlight of Thrissur Pooram?",
    "options": ["Traditional Dance Performances", "Grand Fireworks Display", "Boat Race", "Street Parades"],
    "answer": "Grand Fireworks Display"
  },
  {
    "Qno":3,
    "question": "Which two temples are the main participants in the festival?",
    "options": ["Paramekkavu & Thiruvambadi", "Vadakkunnathan & Guruvayur", "Chottanikkara & Sabarimala", "Padmanabhaswamy & Thrissur Temple"],
    "answer": "Paramekkavu & Thiruvambadi"
  },
  {
   "Qno":4,
    "question": "What is the purpose of Kudamattam during Thrissur Pooram?",
    "options": ["Changing elephant decorations", "Fireworks contest", "Boat parade", "Cooking festival food"],
    "answer": "Changing elephant decorations"
  }
] <</Quiz>>
`
// Select topic collect dialog 

//Load function
window.onload = async () => {
  await openDatabase();
  clearAllrecord();
  const topic_collect = document.querySelector(".topic-collect-dlog");
  topic_collect.showModal();



}
// functions

function parseToObject(string) {
  let startIndex = string.match("<<Quiz>>").index + "<<Quiz>>".length;
  let lastIndex = string.match("<</Quiz>>").index;
  string = string.slice(startIndex, lastIndex);
  return JSON.parse(string);

}


function responsetoDb(Object_Store, response) {
  // progress status
  progress.changestatus("store quiz to database...");

  qzObj = parseToObject(response);
  totalQuestions = qzObj.length;
  sessionStorage.setItem("aiq_num",totalQuestions);

  let i = 0;
  qzObj.forEach(element => {
    console.log(element);
    store(Object_Store, element);
    // Updating progress while filling data to Object store
    progress.growProgress(50 + (50/totalQuestions)*(++i));
  });
  progress.changestatus("completed");
  // Enabling the play button  in progress dialog
  document.querySelector(".start-quiz").disabled = false;
}

function make_quiz(topic, mode, noofqstns) {
  // progress status
  progress.changestatus("waiting for response...");
  const prompt = `Generate quiz using the following details
   Topic : ${topic}
    Mode : ${mode}
     number of questions : ${noofqstns} 
     using the following format to create quiz 
     <<Quiz>> [ {"Qno":0, "question":question1,"options":[op1,op2,op3,op4],"answer":op1 ] <</Quiz>> 
     response should be in json varified string inside those two tags, 
     nb : if the topic is not recoganisable choose a random topic as your wish, Qno is like index start it from 0`;
     puter.ai.chat(prompt).then(async (response) => {
      // update progress status
      progress.changestatus("response received");
      progress.growProgress(50);
      // open transaction
      let Object_Store = await open_transaction();
      // store data to indexedDB
      responsetoDb(Object_Store, response);
     });
}

