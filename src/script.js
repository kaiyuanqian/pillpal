const DB_NAME = 'medDB';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'patientsWithMedicines';

var db;

const bodycontainer = document.querySelector('body');

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
        DB_STORE_NAME, { keyPath: 'nameAndMedAndTimes', autoIncrement: false });
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
		console.error("DbAdding:", evt.target.errorCode);
	  };
}


function readPrescriptions() {
	var req = indexedDB.open(DB_NAME, DB_VERSION);

	req.onsuccess = function (evt) {
		// Equal to: db = req.result;
		db = this.result;
		console.log("db reading...");
		var transaction = db.transaction(DB_STORE_NAME, "readonly");
		var objectStore = transaction.objectStore(DB_STORE_NAME);

		objectStore.getAll().onsuccess = function (event) {
			event.target.result.forEach((element) => {
				console.log(element);
				// only want to add a prescription to the dom if it is a valid date
				const curDate = new Date();
				if (new Date(element["startDate"]) <= curDate && new Date(element["endDate"]) >= curDate) {
					console.log("prescription active");
					activePrescriptions.push(element);
				}
			})
		}
	  };
	  req.onerror = function (evt) {
		console.error("DbReading:", evt.target.errorCode);
	  };

}

// Takes in a given prescription object and adds it to the DOM
function addPrescriptionToDOM(prescription) {

	const hourClassString = `${prescription['nameAndMedAndTimes']}`

	const rightdiv = document.querySelector('#right');

	const prescriptionDiv = document.createElement('div');
	prescriptionDiv.classList.add('prescription');
	// prescriptionDiv.textContent = `${prescription['recName']} is taking ${prescription['medName']} at ${prescription['times']}`;

	const name = document.createElement('p');
	name.textContent = `${prescription['recName']}`;
	name.style.fontWeight = 'bold';
	name.style.fontSize = '25px';
	name.style.padding = '0px';
	name.style.margin = '0px';
	name.style.textAlign = 'left';

	const medicine = document.createElement('p');
	medicine.textContent = `${prescription['medName']} at ${prescription['times']}`;
	medicine.style.textAlign = 'right';


	prescriptionDiv.appendChild(name);
	prescriptionDiv.appendChild(medicine);

	// first entry of a prescription with this integer hour
	if (document.getElementById(hourClassString) == null) {
		console.log(`new div for ${hourClassString}`);
		const hourlyDiv = document.createElement('div');
		hourlyDiv.setAttribute('id', hourClassString);
		hourlyDiv.classList.add("hourlyBox");

		rightdiv.appendChild(hourlyDiv);

		// adds a checkbox to each hourly schedule box
		// const checkbox = document.createElement('INPUT');
		// checkbox.setAttribute("type", "checkbox");
		// hourlyDiv.appendChild(checkbox);
	} 

	document.getElementById(hourClassString).appendChild(prescriptionDiv);

	var today = new Date();
	var time = today.getHours() + ':' + today.getMinutes();
	if (prescription['times'] < time) {
		document.getElementById(hourClassString).style.backgroundColor = "#ffbaba";
		// document.getElementById(hourClassString).style.border = "solid #ff0000";
		if (prescription['given'] === false) {
			document.getElementById(hourClassString).classList.add('overdue');
		} else {
			document.getElementById(hourClassString).classList.add("notoverdue");
		}
	}

	// allows boxes to listen for a click 
	const hourlyBoxes = document.querySelectorAll('.hourlyBox');
	hourlyBoxes.forEach(hourlybox => {
		hourlybox.addEventListener('click', updateMedAsGiven);
	})

}


function handleSubmit(event) {
	// Get data from form into a JS object
	event.preventDefault();
	const data = new FormData(event.target);
	const value = Object.fromEntries(data.entries());

	// provides a unique identifer for each prescription
	const value_with_uniqueid = {nameAndMedAndTimes: value["recName"]+value["medName"]+value["times"]};
	Object.assign(value_with_uniqueid, value);

	// all meds start of with not being given for the day
	const finalObject = {given: false};
	Object.assign(finalObject, value_with_uniqueid);

	console.log({ finalObject });

	// adds the prescription to the database
	addMedicine(finalObject);

	activePrescriptions = [];
	readPrescriptions();

	const inputField = document.getElementById('times');
	inputField.value = '';
}

function updateClock() {
	const date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	// This arrangement can be altered based on how we want the date's format to appear.
	let currentDate = `${day}-${month}-${year}`;
	// console.log(currentDate); // "17-6-2022"
	document.querySelector('#time').textContent = currentDate;

	// Delete all things with prescription class before adding a new ones
	document.querySelectorAll('.prescription').forEach(e => e.remove());
	document.querySelectorAll('.hourlyBox').forEach(e => e.remove());

	activePrescriptions.sort(prescriptionDateComparison);
	activePrescriptions.forEach(prescriptions => addPrescriptionToDOM(prescriptions));
}

function prescriptionDateComparison(p1, p2) {
	if (p1['times'] < p2['times']) {
		return -1;
	} else if (p1['times'] > p2['times']) {
		return 1;
	} else {
		return 0;
	}
}

function resetForm() {
	var form = document.querySelector('form');
	form.reset();
}

function updateMedAsGiven(event) {
	console.log(`${this.id} has been clicked`);
	var req = indexedDB.open(DB_NAME, DB_VERSION);

	const idofclicker = this.id;

	req.onsuccess = function (evt) {
		// Equal to: db = req.result;
		db = this.result;
		console.log("db updating...");
		var transaction = db.transaction(DB_STORE_NAME, "readwrite");
		var objectStore = transaction.objectStore(DB_STORE_NAME);

		const request = objectStore.get(idofclicker);

		request.onerror = (event) => {
			console.log("id dont exist tryna read it");
		};

		request.onsuccess = (event) => {
			console.log("success");
			const data = event.target.result;
			console.log(`OLD DATA= ${data.given}`);
			// update value of data
			data.given = !data.given;

			// Put this updated object back into the database.
			const requestUpdate = objectStore.put(data);
			requestUpdate.onerror = (event) => {
				console.log("update of info failed");
			};
			requestUpdate.onsuccess = (event) => {
				console.log(`WAS ${!data.given} NOW ${data.given}`);
			};
		};
	  };
	  req.onerror = function (evt) {
		console.error("DbReading:", evt.target.errorCode);
	  };
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
form.addEventListener('reset', resetForm);

openDb();
// must run at least once to show previously added prescriptions upon refresh
var activePrescriptions = [];
readPrescriptions();
setInterval(updateClock, 1000);