 



#Start
- Prerequisite downloads and installations
  - Node must be installed on your device
  - PostgresSql must be installed, REMEBER MASTER PASSWORD, DATABASE NAME, AND SET PORT: 5432
  - Download Folder
  - borrowers.csv MUST be in this folder C:\Users\Public\Documents\ 
  - Run the necessary sql scripts provided under the table: 4347ProjTableCreation.txt and scratch.sql 
       
        REMEMBER: RUN EACH SQL STATEMENT SEPERATELY

At this point, all prior setup should be correct

#Continue:
- Inside Postgres: copy paste these 2 txt files, and run them in input, these inputs are the normalized form, no need to normalize again with python script
  insertAuthors.txt and insert.txt
- On terminal, open the folder (do this is IDE to make it easier)
- run "npm install"
- run "npm update"
- go to /src/backend in the folder
- run "npm install"
- run "npm update"
- Now it should be running on localhost:3000
- If it has any errors due to packages not being installed, just run npm install and npm update again

IF THERE IS ANY DIFFICULTY, HERE IS A VIDEO TO HELP UNDERSTAND BETTER
PART1: https://www.youtube.com/watch?v=ssvYemBHuTU
PART2: https://www.youtube.com/watch?v=59iNwkphGlE