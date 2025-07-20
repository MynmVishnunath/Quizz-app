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

function readData(objectStore,id){
    return new Promise((res,rej) => {
        let request = objectStore.get(id);
        request.onsuccess = (event) => {
            let data = event.target.result;
            res(data);
        }
        request.onerror = (error)=>{
            rej(error);
            throw new Error(`Failed to read data ${error}`);
        }
    });
    
}

function saveSelection(store,id, option) {
    return new Promise((res, rej) => {
      let readreq = store.get(id);
      readreq.onsuccess = event => {
        let obj = event.target.result;
        obj.selectedOption = option;
        store.put(obj).onsuccess = () => {
          res();
        }
      }
      readreq.onerror = event => {
        console.log("cant read question");
        rej();
      }

      
    });
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