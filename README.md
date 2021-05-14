# Chatobotto-client
A react client for a basic chat application using SockJS and STOMP messaging protocol. 
Intended to be small project to play around with web sockets. Minimal security on the application means it is not yet suited for deployment. I hope you have fun with it as I have enjoyed creating it :) The corresponding server can be found at [Chatobotto-server](https://github.com/Tsoyuzhu/chatobotto-server).

# Features
* Unique otaku-themed usernames enforced on the server-side. Usernames collated by scouring the internet.
* Randomly selected chat colours for clients
* Unique and randomly selected messages on client connection and client disconnection
* Anime themed. Extremely cringey. Made with much love for all my tomodachis.

# Requirements
* Node
* npm

# Quickstart
The server needs to be running before the client is of any use. Please see [Chatobotto-server](https://github.com/Tsoyuzhu/chatobotto-server) for instructions on launching the server.

Run `npm install` to install all project dependencies. 

Launch the application with `npm start`. 

Navigate to `http://localhost:3000`. 

Multiple clients can be opened on the same computer. Simply create another tab or window in your browser and navigate to `http://localhost:3000`.
