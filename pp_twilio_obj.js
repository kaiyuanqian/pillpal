//mimics array of prescriptions
const activePrescriptions = [
    { name: 'John', time: '8:00', medicine: 'Aspirin' },
    { name: 'Jane', time: '12:00', medicine: 'Ibuprofen' },
    { name: 'Bob', time: '22:54', medicine: 'Tylenol' }
  ];

//sets up Twilio chatbot
const accountSid = 'AC077078c644b83c568c2994f606bebf5a';
const authToken = 'c1b5204b304bf6e99ec77a2a92dadb16';
const client = require('twilio')(accountSid, authToken);

//returns a string representing 24-hour time of the form: "h:mm"
function gettime() {
    var today = new Date();
    if (today.getMinutes() < 10) {
        var curr_time = today.getHours() + ":" + "0" + today.getMinutes();
    }
    else {
        var curr_time = today.getHours() + ":" + today.getMinutes();
    }
    return curr_time;
}

//used to send the personalised message when the time to take the dose matches the current time for any prescription
function sendmessage() {
    // loop through the activePrescriptions array
    activePrescriptions.forEach(record => {
        if (record.time == gettime()) {

            //prints details to console
            console.log(`Name: ${record.name}, Time: ${record.time}, Medicine: ${record.medicine}`);

            //sends message using Twilio
            client.messages.create({
                body: `${record.name}, it is ${record.time} and you need to take your dose of ${record.medicine}`,
                from: '+15077085452',
                to: '+61472909030'
            }).then(message => {
                //prints succesful 'message sent' to console
                console.log('message sent!');
            });
        }
    });
}

sendmessage(); //checks immediately if the dose_time and current time are the same minute for any prescription in the activePrescriptions
setInterval(sendmessage, 60000); //then checks indefinetely for the follwing minutes