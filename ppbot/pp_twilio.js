//sets up Twilio chatbot
const accountSid = 'AC077078c644b83c568c2994f606bebf5a';
const authToken = 'c1b5204b304bf6e99ec77a2a92dadb16';
const client = require('twilio')(accountSid, authToken);

//user prompts for use with shell/terminal
const prompt = require('prompt-sync')();
const name = prompt('What is your name? ');
const medicine = prompt('What is your medicine? ');
const dose_time = prompt('When do you take it? ');

//updates dose_time to 40min ahead in 24 hour time of the form "h:mm"
function update_deadline(dose_time) {
    var [hours, minutes] = dose_time.split(":");
    var dateObj = new Date();
    dateObj.setHours(hours);
    dateObj.setMinutes(minutes);
    dateObj.setTime(dateObj.getTime() + 40 * 60 * 1000);
    var updatedHours = dateObj.getHours();
    var updatedMinutes = dateObj.getMinutes();
    var deadline = `${updatedHours}:${updatedMinutes.toString().padStart(2, "0")}`;
    return deadline;
}

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

//used to send the personalised message when the time to take the dose matches the current time
function sendmessage() {
    if (update_deadline(dose_time) == gettime()) {
        client.messages.create({
            body: `Reminder: ${name} was prescribed to take their dose of ${medicine} at ${dose_time}. Please address!`,
            from: '+15077085452',
            to: '+61472909030'
        }).then(message => {
            console.log('message sent!');
        });
    }
}

sendmessage(); //checks immediately if the dose_time and current time are the same minute
setInterval(sendmessage, 60000); //then checks indefinetely for the follwing minutes