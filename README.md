# PillPal

![PillPal Logo](resources/pillpal-logo.png)

PillPal was initially inspired by Henry's father, a not so tech-savvy man with a dubious memory who has been a long-time culprit of fumbling his scheduled medication consumption. However, not long into the planning process, our team decided that PillPal could and should cater to a much broader range of Australians in the healthcare sector.

PillPal is a software designed to help nurses, age-care workers, and other carers to alleviate some of their stress within their high-pressure working environments. It does this by providing daily reminders of what drugs needs to be administered to which patients at what times. When reminders are overdue without having been checked off, PillPal will send the user a notification on their phone, reminding them to administer the drug.

As not all users are tech-savvy and many caretakers work in a fast-paced environment, we endeavoured to make the interface clean and intuitive. We employed strategic choices within our html, CSS, and Javascript to achieve our desired front-end. For the back-end, we used indexedDB and Javascript to store patient and drug data locally, protecting caretakers and their patients from network outages.

Whilst other competitors such as the 'MedicineWise app' offer similar capbilities, PillPal distinguishes itself with its multi-patient support that allows multiple patients to be catered for on one simple and effective webapp, rather than catering for just one individual who must also take responsiblity for their medication management.

As the SMS messaging feature failed to integrate into the webapp, this is a future task for PillPal's creators. When completed, it will allow the carer to input their number on the webapp and receive a reminder if any patient's medication hasn't been "checked off" on the webapp 40 minutes after the prescribed time.

## Henry

My involvement in PillPal consisted primarily of creating the ‘backend’ functionality for the site.

I chose to implement the local storage mechanism through IndexedDB, which stores each prescription as an object with all its relevant details. I had never used IndexedDB, or any DBMS prior to the hackathon commencing. I toyed with the idea of using MongoDB, and pouchDB, as I had seen previous entrants use that, but ending up choosing IndexedDB as it comes installed into each browser and thus requires minimal overhead to set up and implement local storage, which is all that was required for this project.

I found it particularly challenging to navigate how to initialise and fill up the database, but made use of Mozilla’s documentation as a guide to the point where I am comfortable creating a database, adding data, reading data and updating data in it. 

Javascript was utilised as the backend language of choice due to the fact it interacts with IndexedDB, and one script could simulatneously interact with the Front End DOM and the backend DB. Prior to this hackathon I have only had small dealings with Javascript before, mainly dealing with things like DOM events and handling. This was a new challenge for me, but now I feel much more comfortable dealing with JS code. 

--- 

## Kaiyuan

My involvement consisted of project planning, front-end design, writing, and directing the pitch video.

Through PillPal, I gained valuable experience in the strategic designing of the front-end using html, CSS, and for the first time, Javascript. Some of my strategic design choices include the usage of a smart-casual looking rounded font, which gives off a comforting and non-confrontational vibe necessary to not increase user stress levels.

I found it challenging to come up with a video idea that is both engaging and effiectively demonstrates PillPal's functionality and real-word use. I decided to consult with a friend, who is a current med-school student and thus familiar with hospital protocol and the current status quo of nurses. As such, I believe I was able to create a relatively accurate skit depicting our product's features and relevance within a significant part of the healthcare industry.

---

## Enrique

My contribution to PillPal included designing the logo and colour themes for Pillpall, as well as creating the SMS messaging function. 

To design the logo, I used LOGO.com as well as Adobe photoshop, utilising a green colour scheme to symbolise health and prosperity which reflects our track of 'Health and Society'. It proved difficult in designing the logo with photoshop as I had no prior experience, but nevertheless learnt valuable design editing skills. 

For the SMS reminder function, I wrote the code using Javascript and node.js in conjuction with a Twilio web service API. Javascript and node.js were used to write code in a language that can be used by the webapp, and Twilio because it offered a free usage of a number and a corresponding chatBot. This was challenging due to the fact I had no experience with git/GitHub, Javascript, or using APIs. However, it proved to be a steep learning curve and was quickly familiar with these languages and tools. 
Integrating this into the webapp in the final stages of the project was a problem. Due to the fact that to run Twilio on the webapp and not a node.js environment, we needed a server side implementation. Due to time constraints we could not achieve this, so PillPal is currently not capable of all its desired functionalities. 

---