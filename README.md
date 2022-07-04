# Load-Balancer

### Docker Commands
* To build docker image: docker build -t nodeapp . 
* To create/run a docker container using image: docker run -d -p 1111:9999 -e APPID=1111 nodeapp 

### Nginx commands
* To start Nginx Server: nginx
* To reload Nginx Server: nginx -s reload
* To stop Nginx Server: nginx -s stop

## Setup for Load Balancer
### Steps to create multiple docker containers and see load balance in Round Robin algorithm
1. cd/loadBalancer 
2. npm install
3. change layer7_http.conf to nginx.conf in /usr/local/etc/nginx/
4. docker build -t nodeapp .
5. docker run -d -p 1111:9999 -e APPID=1111 nodeapp (first container/server)
6. docker run -d -p 2222:9999 -e APPID=2222 nodeapp (second container/server)
7. docker run -d -p 3333:9999 -e APPID=3333 nodeapp (third container/server)
8. docker run -d -p 4444:9999 -e APPID=4444 nodeapp (fourth container/server)

### For Layer 7 Load Balancing
1. Go to `http://127.0.0.1:8008/`
2. Try refreshing the page (will be round robin) 

### For Layer 4 Load Balancing
1. Go to `http://127.0.0.1:8008/`
2. Try refreshing the page, the behavior will be very weird, sometimes it changes
3. But it is round robin in a TCP connection, as long as TCP connection is still there it wouldn't create a new TCP connection
4. In the command line, try:
  * telnet 127.0.0.1 80
  * GET /
  * Enter
5. Do the commands for a couple of times, you should be able to see it using layer 4 LB in round robin 


## Setup for Web Socket server
1. cd/websocket
2. npm install

Notes:
* To start multiple servers with different port: node index.js 1111 & node index.js 2222
* Layer 4 Proxying blindly tunnels everything to the Backend 
  * ws://localhost/ -> websocket app
  * ws://localhost/blahblah -> websocket app
  * path doesn't matter (path is only for layer 7)