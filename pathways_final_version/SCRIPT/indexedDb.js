async function loadFromIndexedDB(storeName, key, database) {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(database);

    dbRequest.onerror = (event) => {
      // console.error('Database error:', event);
      reject(Error('Database open failed'));

    };

    dbRequest.onupgradeneeded = (event) => {
      var db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore('menuObject');
    
      }
      // Optionally reject if you want to stop loading when upgrade is needed

      reject(Error('Database upgrade needed'));
    };

    dbRequest.onsuccess = (event) => {
      var db = event.target.result;
      var transaction = db.transaction([storeName], 'readwrite');
      var objectStore = transaction.objectStore(storeName);
      var objectRequest = objectStore.get(key);

      objectRequest.onsuccess = (event) => {
        if (objectRequest.result) {

          resolve(objectRequest.result);
        } else {
          reject(Error('No data found for key: ' + key));
        }
      };

      objectRequest.onerror = (event) => {
        // console.error('Object request error:', event);
        reject(Error('Error retrieving object'));

      };

      transaction.onerror = (event) => {
        // console.error('Transaction error:', event);

        reject(Error('Transaction failed'));
      };
    };
  });
};

async function saveToIndexedDB(storeName, object, key, databaseName){
    return new Promise(
      function(resolve, reject) {
        if (object.id === undefined) reject(Error('object has no id.'));
        var dbRequest = indexedDB.open(databaseName);
  
        dbRequest.onerror = function(event) {
          reject(Error("IndexedDB database error"));
        };
  
        dbRequest.onupgradeneeded = function(event) {
          var database    = event.target.result;
  
          if (!database.objectStoreNames.contains(storeName)) {
            database.createObjectStore('menuObject');
            
          }
        };
  
        dbRequest.onsuccess = function(event) {
          var database      = event.target.result;
          var transaction   = database.transaction([storeName], 'readwrite');
          var objectStore   = transaction.objectStore(storeName);
          var objectRequest = objectStore.put(object, key); // Overwrite if exists
  
          objectRequest.onerror = function(event) {
            reject(Error('Error text'));
          };
  
          objectRequest.onsuccess = function(event) {
  
            setTimeout(() => (resolve(event.target.result)),);
  
          };
          objectRequest.oncomplete = function(event) {
            var data = event.target.result;
            data.close();
          }
        };
      }
    );
  };



 async function openDB(databaseName){
    var dbRequest = indexedDB.open(databaseName);

    dbRequest.onupgradeneeded = function(event) {
        var db    = event.target.result;
       db.createObjectStore('menuObject');

           
    };

    dbRequest.onsuccess = function(event) {
        var db = event.target.result;
        db.close();
    }

    dbRequest.onerror = function(event) {
        reject(Error('Error text'));
    };

};

 async function updateDelDB(storeName, databaseName, version){
  var dbRequest = indexedDB.open(databaseName, version);

  dbRequest.onupgradeneeded = (event) => {
    var database    = event.target.result;

    database.createObjectStore(storeName, {autoIncrement: false});



  };

  dbRequest.onsuccess = function(event) {

    var data = event.target.result;
    data.close();
  }

  dbRequest.onerror = function(event) {

  };

};


async function deleteDB(databaseName) {
  var db = indexedDB.deleteDatabase(databaseName);
  db.onsuccess = function (event) {



  }
  db.oncomplete = function (event) {
    var database = event.target.result;
    database.close();
  }

  db.onerror = function (event) {

  }
}