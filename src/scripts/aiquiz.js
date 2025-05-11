// Global variables
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
    let  Object_Store = await open_transaction();
    responsetoDb(Object_Store, res);
    setTimeout(startQuiz,1000);

}
// functions

function parseToObject(string){
    let startIndex = string.match("<<Quiz>>").index + "<<Quiz>>".length;
    let lastIndex = string.match("<</Quiz>>").index;
    string = string.slice(startIndex,lastIndex);
    return  JSON.parse(string);
    
}


function responsetoDb(Object_Store,response){
    qzObj = parseToObject(response);
    qzObj.forEach(element => {
        console.log(element);
        store(Object_Store,element);
    });
    // alert(Object_Store,"from aiquiz");
}

