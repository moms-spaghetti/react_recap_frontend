# React Re:Cap

This is the final 16 week project at the School of Code. It was built in a team of six over one month utilising all the skills we have learned over the 16 weeks. I have modified this project code from the original to fix bugs and features which were not possible to implement before the final presentation of the project due to time constraints.\
<br/>
[View Demo](https://moms-spaghetti-reactrecap.netlify.app/)\
<br/>
You can log into the site as a user or admin:

- user@mail.com
- admin@mail.com\
  GreyHound123! (for both)
  <br/><br/>

[Frontend Repo](https://github.com/moms-spaghetti/react_recap_frontend/)\
[Backend Repo](https://github.com/moms-spaghetti/react_recap_backend/)\
<br/>

## Details

The problem presented on the 16 week project was to improve the delivery of lecture resources used by bootcampers at the School of Code. Supplementing this problem were keypoints such as, making resources shareable. The structure of the project consisted of a week of planning, followed by three weeks of programming culminating in a presentation and demo of product.\

Planning consisted of taking time to understand the problem followed by ideating through potential solutions which would meet demands. After choosing a candidate solution, planning progressed to research of technologies appropriate for the project based on experience within the group and suitability to meet the requirements of the proposed solution.\

Once technologies were confirmed, initialisation of the project took place and the building process started. During the planning stage I made multiple, small tech demos to aid confirmation that the technologies we had selected we suitable for the project. These projects are on my github and linked below:

- [Nextjs Vimeouploader](https://github.com/moms-spaghetti/nextjs_vimeouploader/)\
   This project displayed functionality of a built in uploader which would improve the coach user experience when uploading new videos to the School of Code Vimeo account. It enabled uploads to be completed while logged into the re:cap site. Although fully working, it was scrapped during the planning phase due to complexity and a move away from Nextjs.\
  <br/>
- [Nextjs Auth0](https://github.com/moms-spaghetti/nextjs_auth0/)\
  This was one of two authentication demo I made. Original plans were to bootstrap the frontend application with Nextjs and authentication was required to protect the site as it's resources are for bootcampers and coaches only. The demo was a success but due to decisions to move away from Nextjs, this project was also scrapped during the planning phase.\
  <br/>
- [React Firebase Auth](https://github.com/moms-spaghetti/react_firebase_auth/)\
  As the planning phase moved from Nextjs to React I made this demo using create react app and firebase to further demonstrate authentication once again. I utilised firebase as I had not previously used the platform for authentication and it offered a more customisable interface for the log in page, more aligned with our original planning for the project. This demo made it to the final project.\
  <br/>
- [Nextjs Express Server File Upload](https://github.com/moms-spaghetti/nextjs_express_serverfileupload/)\
  Finally, this express server file uploader uses an npm package called multer to handle frontend to backend file uploads. During the planning phase, an idea was raised to allow coaches to upload file resources such as presentation slides directly from the frontend. Again, the decision was made to scrap this demo due to complexity and it was exchange for a form where coaches would input a google drive link as meta data.

Throughout the build phase we held daily standups and daily retros to consolidate progress, blockers and anything else encountered during the day. Project progress was tracked in a combination of Jira, Trello and Notion. Jira controlled tasks and sprints. Trello was used for standups and retros and finally Notion was utilise as a large datastore for research information and was mainly used during the planning stages.

During the build phase the front and backend were build concurrently which was possible by splitting the team into groups each day. The backend was finished first and the majority of the time spent on the project was perfecting the frontend.

Re:cap offers different funcionality for bootcampers and coaches. For bootcampers it allows secure log in, into the site. A paginated home page where videos can be searched in a combined search via text, coach, week and tags. The tag system can be used from the sidebar or by clicking the tags directly below the videos. When viewing a video, bootcampers can skip to important sections of the video using a timestamp system. They can also click resources for the lecture and leave anonymous feedback.

Coaches afford the same functionality as the bootcampers but also gain access to a content management page. This allows coaches to view videos uploaded to the School of Code Vimeo account, and select them. This will transfer the details of the video (url, thumbnail url, title) to a form which is used to populate meta data about the video and eventually sent to the backend server and saved to postgres database.\
This form data consists of:

- title (added when selecting a video)
- lecturer
- video url (added when selecting a video)
- thumbnail url (added when selecting a video)
- tags
- lecture date
- bootcamp week
- cohort
- description
- timestamps (a small side application which improves the timestamp adding process)
- links and descriptions for github, presentation slides and other links

Once submitted the video will be presented on the home page for users to consume. It will also be removed immediately from the vimeo viewer list via optimistic update. Other tools available to coaches are tag editors, lecturer editors (add/remove/modify current lectuers), a separate viewer to modify lectuers which have been added to the platform and a timestamp viewer. The timestamp viewer allows simple adding of timestamps by scrolling along scrubber bar of the video and selecting the required time. A description can also be added. Finally, coaches can view feedback on videos by accessing the video directly.

I have made forked away from the original project to maintain its original state. I have also separated this repo from the accounts utilised by the School of Code Vimeo account and the project team google account for the same reasons. Firebase, vimeo, postgress and the github repo are all separate for this project to the original version.

Improvements from the original repo:

- login process combines the context for checking if users are admin(coach)
- admin(coach) data no longer held in the frontend application in an array and move to database
- improvements to the state used to conditionally render components for admins(coaches)
- search moved from the banner on the home page to the side bar in line with other search functions
- sarch also appears in the banner when navigating away from the home page to maintain sitewide seach feature
  <br/><br/>

## Built With

- HTML
- CSS
- Javascript
- create react app
- react router dom
- uuid
- firebase
- ant design
- react player
- cors
- dotenv
- express
- nodemon
- node postgress
- vimeo api
  <br/><br/>

## Getting Started

Clone both frontend and backend repos.
<br/><br/>

## Prerequisites

Download and install npm modules.
A firebase account.
A postgres database and URI string
A vimeo api developer account and upload access
.env files in the front and backend root folders
<br/><br/>

## Installation

Frontend

1. Clone the repo
   ```sh
   git clone https://github.com/moms-spaghetti/react_recap_frontend.git
   ```
2. Download the required npm modules
   ```sh
   npm i
   ```
3. Create a firebase account with a new application. Once the account and project are created, create a realtime database with the default settings and a new web application. Name the application and take note of the details at the end. They are required for the .env file.
4. In firebase enable Email/Password as a sign-in method. Authentication > Sign-in method.
5. Still in firebase, create new users. Authentication > Users. Replicate the users at the start of this readme.
6. Create a .env file in the root directory with the below entries. Fill in the details for each entry from the details provided at the end of step 3.
   ```sh
   REACT_APP_BACKEND_URL="http://localhost:5000"
   REACT_APP_FIREBASE_KEY=
   REACT_APP_FIREBASE_DOMAIN=
   REACT_APP_FIREBASE_DATABASE=
   REACT_APP_FIREBASE_PROJECT_ID=
   REACT_APP_FIREBASE_STORAGE_BUCKET=
   REACT_APP_FIREBASE_SENDER_ID=
   REACT_APP_FIREBASE_APP_ID=
   ```
7. Start the application
   ```sh
   npm start
   ```

Backend

1. Clone the repo
   ```sh
   git clone https://github.com/moms-spaghetti/react_recap_backend.git
   ```
2. Download the required npm modules
   ```sh
   npm i
   ```
3. Create a vimeo account and access it from https://developer.vimeo.com/
4. You will need to create a new application here and request upload access. The vimeo documentation can explan this better than I can.
5. Create a .env file in the root directory with the below entries. Fill in the details from your vimeo account once your upload access has been approved.
   ```sh
   DATABASE_URL=
   VIMEO_ID=
   VIMEO_SECRET=
   VIMEO_TOKEN=
   ```
6. Populate the DATABASE_URL= with your postgres database URI
   ```sh
   DATABASE_URL= enter your postgres database uri here
   ```
7. Run the resetTables.js script from the backend folder
   ```sh
   npm run resetTables
   ```
8. Start the application

   ```sh
   npm start
   ```

   <br/><br/>

## Usage

Log into the app using the admin credentials to add new lectuers and resources.
You will need to add videos to your vimeo account so they can be displayed on the coach CMS page. From here you will be able to select the video and add the additional meta information.
<br/><br/>

## Contact

[Email](mailto:williamedwards36@aol.com)
<br/><br/>
