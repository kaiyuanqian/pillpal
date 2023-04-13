const DB_NAME = 'medDB';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'medicines';

var db;

function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
      // Equal to: db = req.result;
      db = this.result;
      console.log("openDb DONE");
    };
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
      console.log("openDb.onupgradeneeded");
      var store = evt.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { keyPath: 'medName', autoIncrement: true });
    };
}

function addMedicine(medObject) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);
	req.onsuccess = function (evt) {
		// Equal to: db = req.result;
		db = this.result;
		console.log("db adding...");
		var transaction = db.transaction(DB_STORE_NAME, "readwrite");
		var objectStore = transaction.objectStore(DB_STORE_NAME);
		objectStore.add(medObject);
	  };
	  req.onerror = function (evt) {
		console.log("error adding");
	  };
}

function handleSubmit(event) {
	  // Get data from form into a JS object
	  event.preventDefault();
	  const data = new FormData(event.target);
	  const value = Object.fromEntries(data.entries());
	  console.log({ value });
	  addMedicine(value);
}
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

openDb();
