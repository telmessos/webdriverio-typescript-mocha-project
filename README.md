# ABN Amro Home Assignment Project

This project is a sample project prepared for ABN Amro home assignment using Page Object Model pattern. It tests some basic features on the shared simple web site.

Project uses WebdriverIO, Mocha, Allure Reporting

## Pre-requisites and installation
* Latest version of Allure command line should be installed on your system.
* To make installation check out this GIT repo, open the project with your favorite IDE, open Console in the IDE and type:

**Important! Run specific requirements are mentioned under Local Run and Docker Run titles. Continue to either Local Run or Docker Run sections after this point.**

## Local Run

* Latest version of NodeJS should be installed on your system

```javascript
npm install
```
* After NodeJS module installation is complete, to run the tests type 

```javascript
npm run test -- --Env=web --Browser=chrome
```
This will run the tests on https://ongitsolutions.nl/ URL. For local run please check Docker run section
### Allure report

Open terminal in the project folder after test execution and type

```javascript
allure serve allure-results
```

## Docker Run

* Latest version of Docker should be installed on your system

To build the image with the Dockerfile, type:
```javascript
docker build -t abnamrotest -f Dockerfile .
```

**Important! If you have Apple Silicon MAC, please use below build command instead of above command and enable Rosetta. For more information please visit https://medium.com/@tomim/running-cypress-tests-on-chrome-in-docker-on-apple-silicon-macs-d08da8182d5e **

```javascript
docker build --platform=linux/amd64 -t beyonnextest -f Dockerfile .
```

Once the Docker build is completed, to run a container with the built image, type: 
```javascript
docker run --memory=2g --cpus=2 --name=abnamro -it abnamrotest
```
Run command downloads the required version of Chrome and Chromedriver, runs npm install, and runs the tests. 

After the test is completed message displayed in the terminal, copy the Allure Results folder with command pattern of docker run -cp "path of copying folfer" "path of copied host folder":

Example: 
```javascript
docker cp abnamro:/app/allure-results ./
```
To run view the Allure Reports, type:

```javascript
allure serve allure-results
```
## IMPORTANT NOTES - PLEASE READ
- Number of test cases and content could be increased if there were "empty field and number of characters and alpha numeric character checks for both email and password fields"
- Number of test cases and scenarios could be increased with different screen size etc., but as this is a home assignment, I didn't add such scenarios.
- AddStep sections are added for better understanding on test steps and better display Allure Reports
- Tests run with headless mode to execute on Docker. Docker is set and tested with Chrome only. To see the tests executing, you can remove '--headless', parameter in wdio.conf.ts line 54
- Docker run creates a web server on Ubuntu, installs latest stable version of chrome driver, latest stable version of Chrome, copies the website, runs the tests automatically.
- Env=web parameter executes the tests on https://ongitsolutions.com website. 
- For local run, you can change the test browser by setting Browser= parameter in execution command as chrome, firefox, edge, safari
- Please feel free to ask your questions about the framework structure and tests without any hesitation at ceyhunganioglu@gmail.com

