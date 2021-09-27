# Milestone Selecter

Milestone Selecter is an application made with React, Electron, and Flask that allows users to import a Milestones excel file and then download a selected Milestones excel file customized by the user's milestone selections.

## Installation

Clone the repository:

```bash
git clone https://github.com/JacobiClark/Milestones.git
```

Use Node Package Manager to install the application's dependencies:

```bash
npm install
```

Move to the api folder:

```bash
cd api
```

Install the back-end dependencies:

```bash
pip install -r requirements.txt
```

Move back to the main directory:

```bash
cd ..
```

## Running the application

After running the start command, the development server is started, an instance of the desktop application is created by Electron, and the Flask back-end is ran.

```bash
npm run start
```

## Using Milestone Selecter

![Milestone Selecter](https://i.imgur.com/LVKE4eY.jpg)

1. Once the application has fired up, you will be prompted to choose the milestone file you would like to import. Click on the 'Choose File' button, select your milestone file, and then select open.

2. After importing your file, select the Milestone(s) and completion date you would like to download. You may select as many milestones as you like, however, you may only select one completion date.

3. After selecting your milestone(s) and completion date, click on the download button to download your selected options. To select a new file, click on the 'Import New File' button to be taken back to the home page.

## Approach/Rationale

My first step of implementation was to get the React front-end up to implement the logic control of the button selection. To simulate the button creation before the actual excel data was extracted from the back-end, I created two arrays with dummy data (both arrays containing button data objects with data and isSelected keys). After the buttons were displayable, I created onClick handlers for the buttons. When selecting a milestone button, the value of the button is passed to the button handler and switches the isSelected property of the button which allows for the button to be selected. The completion date buttons set the selected button's isSelected property to true, and all other button's to false before the re-render.

After handling the logic on the front-end, I read enough of the Electron documentation in order to learn how to open the application in Electron and then set up Electron (which was a pretty smooth process and simpler than I initially imagined).

Once Electron was working properly, I created a Python virtual environment, installed Flask, and set up the API end-points. To import a file, I sent a POST request to the back-end containing the location of the file the user selected, the back-end extracts the excel file using the file location data sent on the POST reqest, converts it to JSON, and returns the JSON data. When sending a POST request to the back-end, the API consumes the JSON, creates a pandas DataFrame, and then converts the data to excel to be downloaded.

Once the front-end and back-end were complete, the final step was to run the application off of a single command (npm run start). I used the concurrently and wait-on packages which create a promise when the dev-server is started and then runs electron once the promise has been filled. Electron then uses a child-process (thanks for the pointer Bhavesh) to spawn the back-end, and then the application is ready for use.
