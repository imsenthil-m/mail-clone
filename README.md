# Mail Clone

To clone in memory (json files in server) mail functionalities like Componse Mail, Reply to mail, Folders, delete, read/unread, starred, Move to folders mails,etc.
PS: This mail functionalities are not user specific (No login required, common mail platform for everyone)

### FYI
  This app is purely for demonstration, i tried to get the basic functionality without validations, notifications, etc. with given time constraints
  It is hosted in codesandbox, so i can't assure if the node server will be running all the time. However this repo can cloned and run locally
  #### Steps to run locally
  1) clone the repo
  2) npm i
  3) npm run start
  server will be started after few mins and accessible in localhost:5000
    
 ## Features

## Folders
1) User can view the list of folders available. 
2) Create new folders by clicking `Create new ` below the folder list and modal will ask for the folder name
3) View Mails on those folders

## Mailbox
1) On clicking a folder, User will be able to see the mails associated with it.
2) Mails are shown in tabluar view with Read mail shown in Grey color
3) They have option to starred/delete mail from the mailbox


## Mail
1) On click of a mail from the mailbox, user will shown the mail details page with the content and other options to perfom
2) Multiple icons are showed above the mail such as back, starred, delete, move to, mark as unread and ~~archive(Not implemented)~~ 
3) on Delete, mails will be taken from the folder and moved to trash folder
4) on click of Move to, modal will shown to user with list of available folder options. Once they select and submit, mails will be removed from the current box and moved to selected folder
5) Starred and Mark as Read will update the mail as it suppose to.
6) Subject of the mail was shown below the icon on the left and on right, Date and reply buttons are shown.
7) on clicking Reply, Textarea will appear to user and they can type the message and reply back to the sender. (Original message will be added automatically at the end.
8) Once the reply is sent, replied message is added to the `sent` folder 


## Compose
1) New Mails are composed by clicking `Compose` Button and new mail form will appear
2) It has To, Subject and message inputs
3) To address is autocomplete field where the matched contacts of the users are fetched and shown on typing *mandatory field
4) Subject and Message fields are optional and does not have any validation
5) Once message is submitted, mail will be available to view from `Sent` folder
