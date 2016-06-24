# Single Page Application

Single Page Chat Application based on the [Single Page Web Applications]( https://www.manning.com/books/single-page-web-applications "Programming Phoenix") book by Michael S. Mikowski and Josh C. Powell. Features code to develop an SPA Shell, add Feature Modules, Build the Model and add Data.

# Project Status - Work In Progress

#### CHAPTER 3: DEVELOP THE SHELL
* 3.2. Set up the files and namespaces
* 3.3. Create the feature containers
* 3.4. Render the feature containers
* 3.5. Manage the feature containers
* 3.6. Manage application state

#### CHAPTER 4: ADD FEATURE MODULES
* 4.1. The feature module strategy
* 4.2. Set up feature module files
* 4.3. Design method APIs
* 4.4. Implement the feature API
* 4.5. Add frequently needed methods

#### CHAPTER 5: BUILD THE MODEL
* 5.1. Understand the Model
* 5.2. Set up the Model and other files
* 5.3. Design the people object
* 5.4. Build the people object
* 5.5. Enable sign-in and sign-out in the Shell

#### CHAPTER 6: FINISH THE MODEL AND DATA MODULES
* 6.1. Design the chat object
* 6.2. Build the chat object
* 6.3. Add Avatar support to the Model
* 6.4. Complete the Chat feature module
* 6.5. Create the Avatar feature module
* 6.6. Data binding and jQuery
* 6.7. Create the Data module

## File Structure

####css/spa.css
* Provides root CSS namespace
* This is the root stylesheet

####css/spa.shell.css
* The master CSS architecture for the SPA
* Provides shape and structure
* All CSS IDs and class names are prefixed with the app name, "spa-shell-"

--

####js/spa.js
* Provides root JavaScript namespace
* Initializes the SPA

####js/spa.shell.js
* The master JavaScript controller for the SPA
* Initializes, manages and renders the shape, structure and containers that hold feature modules
* Coordinates the sub-controllers for feature modules and ties them with business logic and browser interfaces

####js/jq/
* Houses jquery dependencies and plugins

--

####layout.html
* Wireframe design for the SPA
* This code is later transferred to js/spa.shell.js

--

####spa.html
* Root file read and rendered by the browser
