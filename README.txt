Author: Mihir Vir
Email: virmihir7@gmail.com

Entry Point: src/index.js

Project Structure:

    src [dir]: contains entry point file and all the data file

    tests [dir]: contains all the test suites

    Dockerfile [file]: Sets of instruction to install necessary dependencies and libraries on your
    docker container.

    .dockerignore [file]: Files/Folders to ignore while building the Docker Image

Installation And Setup Guide:
    1) With Docker:
        -> Make sure you have Docker Desktop Downloaded and running in the background.
        -> Use the following command to build the image [NOTE: Please copy the entire command below
           including the . (dot) part as it refers to current director in which the Dockerfile is present]:

            docker build -t mihir-accountsiq-solution .

        -> Use the following command to run the container:

            docker run mihir-accountsiq-solution

    2) Without Docker (Local Machine):
        -> Download Node (version 20+)

        -> Run the following command to install the dependecies:

            npm install

        -> Use the following command to run tests and start the application:

            npm run start-test

        -> Use the following command just to run the application:

            npm run start

Technologies Used: JavaScript (NodeJS for Runtime), Jest (for writing tests)
                   and Docker (If you don't want to install the necessary dependencies
                   just run the docker commands to make your life easier plus its portable)

Approach:
    -> Firstly, I noted the requirements down. The requirements are 
       that we need to read two files SearchTerms which contains the items 
       we want to search in the data file. After reading the file, what we 
       want to do this check if any line in the data file matches any of 
       the search terms as described in the Questions.txt. If it matches 
       add it to the counter and then divide the total counter by number of 
       search terms to find the average number of lines containing a search term. 

    -> Secondly, what I did was to find the SearchTerms I read all the contents of the file
       splitted it into lines and then did some cleaning in it and store it in an 
       array. To find the number of SearchTerms I just got the length of it 
       by using .length method

    -> The above process repeated for the Data file. I also used Regular Expressions
       To match the whether any of the SearchTerms are present in the line. If 
       They are present then I simply incremented the matchCounter. After getting 
       the total number of lines that matches any of the SearchTerms I calculated the 
       average by:

            average = totalLinesMatched / numberOfSearchTerms
    
