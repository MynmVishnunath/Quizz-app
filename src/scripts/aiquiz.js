// Global variables
let  Object_Store;
let res = `<<Quiz>> [
  {
    "question": "Which temple hosts Thrissur Pooram?",
    "options": ["Vadakkunnathan Temple", "Guruvayur Temple", "Padmanabhaswamy Temple", "Sabarimala Temple"],
    "answer": "Vadakkunnathan Temple"
  },
  {
    "question": "Which musical instrument is prominently played during Thrissur Pooram?",
    "options": ["Chenda", "Veena", "Flute", "Sitar"],
    "answer": "Chenda"
  },
  {
    "question": "What is a key highlight of Thrissur Pooram?",
    "options": ["Traditional Dance Performances", "Grand Fireworks Display", "Boat Race", "Street Parades"],
    "answer": "Grand Fireworks Display"
  },
  {
    "question": "Which two temples are the main participants in the festival?",
    "options": ["Paramekkavu & Thiruvambadi", "Vadakkunnathan & Guruvayur", "Chottanikkara & Sabarimala", "Padmanabhaswamy & Thrissur Temple"],
    "answer": "Paramekkavu & Thiruvambadi"
  },
  {
    "question": "What is the purpose of Kudamattam during Thrissur Pooram?",
    "options": ["Changing elephant decorations", "Fireworks contest", "Boat parade", "Cooking festival food"],
    "answer": "Changing elephant decorations"
  }
] <</Quiz>>
`
//Load function
window.onload = async () => {
    await openDatabase();
    Object_Store = await open_transaction();
    responsetoDb(res);

}
// functions

function parseToObject(string){
    let startIndex = string.match("<<Quiz>>").index + "<<Quiz>>".length;
    let lastIndex = string.match("<</Quiz>>").index;
    string = string.slice(startIndex,lastIndex);
    return  JSON.parse(string);
    
}
function responsetoDb(response){
    qzObj = parseToObject(response);
    qzObj.forEach(element => {
        console.log(element);
        store(Object_Store,element);
    });
}

