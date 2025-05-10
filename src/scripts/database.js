let db;
let qzlist=document.getElementsByClassName("qzlist")[0];
const dbObj ={
  doWith : (data)=>{
    console.log(data);
  },
}
function openDatabase(){

return new Promise((res,rej)=>{
 let req=indexedDB.open("QuizzApp",2);
 req.onupgradeneeded=event=>{
  db=event.target.result;
  let objStore=db.createObjectStore("Quizz list",{keyPath:"Qstnid"});
  let metaStore=db.createObjectStore("Quizz meta",{keyPath:"Quizid"});
  let aiStore=db.createObjectStore("Ai_Gen_Quiz",{keyPath:"Qno"});
  
}
 req.onsuccess=event=>{
 db=event.target.result;
 res(db);
 }
 req.onerror=()=>{
 console.error("connection failed");
 res();
 }
})

}

//read data
function readEachrecord(db){
  let transaction = db.transaction("Quizz meta","readonly");
  let objStore=transaction.objectStore("Quizz meta");
  objStore.openCursor().onsuccess=event=>{
   let cursor=event.target.result;
   if(cursor){
    dbObj.doWith(cursor);
    cursor.continue();
   }else{
     console.log("Kainj");
   }
}
}

async function Listelems(){
    let db=await openDatabase();
    await readEachrecord(db);
}