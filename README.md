# TODO with Google Calendar

### Intro
Not only a TODOs list, but only integrate with you private Google Calendar.

### Quickstart

**You should turn on your Google API and get your own credentials**

1. Use Google APIs to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.
2. On the Add credentials to your project page, click the Cancel button.
3. At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.
4. Select the Credentials tab, click the Create credentials button and select OAuth client ID.
5. Select the application type Other, enter the name "Google Calendar API Quickstart", and click the Create button.
6. Click OK to dismiss the resulting dialog.
7. Click the file_download (Download JSON) button to the right of the client ID.
8. Move this file to your working directory and rename it client_secret.json

Further information and examples, check [here](https://developers.google.com/google-apps/calendar/quickstart/nodejs).

### Install

```
$ git clone #[GITHUB addr]
$ cd todoList
$ npm install
$ cd client npm install && cd ..
$ node build_token.js
$ npm start
```
Then you can access into [http://localhost:3000](http://localhost:3000) to build your first todo with Google Calendar.