# PillPal

![PillPal Logo](resources/pillpal-logo.png)

PillPal was initially inspired by Henry's father, a not so tech-savvy man with a dubious memory who has been a long-time culprit of fumbling his scheduled medication consumption. However, not long into the planning process, our team decided that PillPal could and should cater to a much broader range of Australians in the healthcare sector.

PillPal is a software designed to help nurses, age-care workers, and other carers to alleviate some of their stress within their high-pressure working environments. It does this by providing daily reminders of what drugs needs to be administered to which patients at what times. When reminders are overdue without having been checked off, PillPal will send the user a notification on their phone, reminding them to administer the drug.

As not all users are tech-savvy and many caretakers work in a fast-paced environment, we endeavoured to make the interface clean and intuitive. We employed strategic choices within our html, CSS, and Javascript to achieve our desired front-end. For the back-end, we used indexedDB and Javascript to store patient and drug data locally, protecting caretakers and their patients from network outages.

## Henry

My involvement in PillPal consisted primarily of creating the ‘backend’ functionality for the site.

I chose to implement the local storage mechanism through IndexedDB, which stores each prescription as an object with all its relevant details. I had never used IndexedDB, or any DBMS prior to the hackathon commencing. I toyed with the idea of using MongoDB, and pouchDB, as I had seen previous entrants use that, but ending up choosing IndexedDB as it comes installed into each browser and thus requires minimal overhead to set up and implement local storage, which is all that was required for this project.

I found it particularly challenging to navigate how to initialise and fill up the database, but made use of Mozilla’s documentation as a guide to the point where I am comfortable creating a database, adding data, reading data and updating data in it. 

Javascript was utilised as the backend language of choice due to the fact it interacts with IndexedDB, and one script could simulatneously interact with the Front End DOM and the backend DB. Prior to this hackathon I have only had small dealings with Javascript before, mainly dealing with things like DOM events and handling. This was a new challenge for me, but now I feel much more comfortable dealing with JS code. 

--- 

