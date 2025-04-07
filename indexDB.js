
  //Database setup functions

  //database connecting function
  let dbqs;

  function openDatabase() {
    return new Promise((res, rej) => {
      let request = indexedDB.open("QuizzApp", 1);
      request.onsuccess = evnt => {
        let db = evnt.target.result;
        console.log("connection is successfull");
        res(db);
      }
      request.onerror = error => {
        console.log("Failed to connect", error);
        rej(error);
      }
    });
  }

  //getting total num of questions
  function readMeta() {
    return new Promise((res, rej) => {
      let transaction = dbqs.transaction("Quizz meta", "readonly");
      let store = transaction.objectStore("Quizz meta");
      let readreq = store.get(qzid);
      readreq.onsuccess = event => {
        let obj = event.target.result;
        res(obj);
      }

      readreq.onerror = event => {
        console.error(event.target.error);
        rej();

      }
    });
  }

  //read question object from database

  function getQuestion(id) {
    // console.log("inside getqustn" + id)
    return new Promise((res, rej) => {
      // console.log("inside getQuestion func " + dbqs);
      let transaction = dbqs.transaction("Quizz list", "readonly");
      let store = transaction.objectStore("Quizz list");
      let readreq = store.get(id);
      readreq.onsuccess = event => {
        let obj = event.target.result;
        // console.log(Object.keys(obj));
        console.log(obj);
        res(obj);

      }

      readreq.onerror = event => {
        console.log("cant read question");
        rej();
      }
    });
  }

  //store selected option
  function saveSelection(id, option) {
    return new Promise((res, rej) => {
      let transaction = dbqs.transaction("Quizz list", "readwrite");
      let store = transaction.objectStore("Quizz list");
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

      transaction.onerror = (event) => {
        console.log("failed to store selected option due to", event.target.error);
        rej();
      }
    });
  }

  function clearOption(id) {
    return new Promise((res, rej) => {
      let transaction = dbqs.transaction("Quizz list", "readwrite");
      let store = transaction.objectStore("Quizz list");
      let readreq = store.get(id);
      readreq.onsuccess = event => {
        let obj = event.target.result;
        obj.selectedOption = "";
        store.put(obj).onsuccess = () => {
          res();
        }
      }
      readreq.onerror = event => {
        console.log("cant clear this, id not matching");
        rej();
      }

      transaction.onerror = (event) => {
        console.log("failed to clear due to", event.target.error);
        rej();
      }
    });
  }




