let qzdb;//for connecting with Quizz database;
window.onload=async ()=>{
  qzdb=await openDatabase();  
  
};

//DB related oprations

//Database connection.
function openDatabase(){
  let db;
  return new Promise((res,rej)=>{
  let req=indexedDB.open("QuizzApp",1);
  req.onupgradeneeded=event=>{
    db=event.target.result;
    let objStore=db.createObjectStore("Quizz list",{keyPath:"Qstnid"});
    let metaStore=db.createObjectStore("Quizz meta",{keyPath:"Quizid"});
    
  }
  
  req.onsuccess=evnt=>{
    db=evnt.target.result;
    res(db);
  }
  
 req.onerror=error=>{
   console.log("Failed to connect",error);
   rej(error);
 }
  });
  
}

//add value to indexedDB function

function addQuizz(obj){
return new Promise((res,rej)=>{
 let transaction=qzdb.transaction("Quizz list","readwrite");
 let objStore=transaction.objectStore("Quizz list");
 objStore.add(obj);
 transaction.oncomplete=()=>{
   res(true);
 }
 transaction.onerror=(err)=>{
   alert("Failed to save",err);
   rej(err);
 }
});
}


//initialize metadata object in indexed db or update the number of existing metadata object
function modifyQmeta(qid,qnum,metaObj){
 let transaction=qzdb.transaction("Quizz meta","readwrite");
 let store=transaction.objectStore("Quizz meta");
 if(metaObj){
  store.add(metaObj);
 }else{
  let request=store.get(qid);
 
  request.onsuccess=()=>{
    let data=event.target.result;
    data.numOfQstns=qnum;
    store.put(data);
    console.log("updated");
  };
 
  request.onerror=()=>{
    console.error("updation failed");
  }
 }
}
