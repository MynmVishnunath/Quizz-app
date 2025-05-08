let db;
function openDatabase(){
    return new Promise((res,rej)=>{
        let req = indexedDB.open("QuizzApp",2);
        req.onsuccess = (event) =>{
            db = event.target.result;
            res(db);
        }

        req.error = error=>{
            console.error("Failed to open database")
            console.error(error);
            rej();
        }
    })
}

function open_transaction(){
    return new Promise(res=>{
    let transaction = db.transaction("Ai_Gen_Quiz","readwrite");
    let objectStore = transaction.objectStore("Ai_Gen_Quiz");
    res(objectStore);
    });
}

function store(objectStore,data){
    let req = objectStore.add(data);
    req.onerror = (error)=>{
      throw new Error(`Failed to store ${data} because ${error}`);
    }
}

function clearAllrecord(){
    const transaction = db.transaction("Ai_Gen_Quiz","readwrite");
    const objsectstore = transaction.objectStore("Ai_Gen_Quiz");
    const request = objsectstore.clear();
    request.onsuccess = ()=>{
        console.log("clear all record");
    }

    request.onerror = err=>{
        console.error("Failed to clear records");
    }
}