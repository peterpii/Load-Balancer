# Load-Balancer

### Docker Commands
* To build docker image: docker build -t nodeapp . 
* To create/run a docker container using image: docker run -d -p 1111:9999 -e APPID=1111 nodeapp 

### Nginx commands
* To start Nginx Server: nginx
* To reload Nginx Server: nginx -s reload
* To stop Nginx Server: nginx -s stop

# Setup for Load Balancer
### Steps to create multiple docker containers and see load balance in Round Robin algorithm
1. cd/loadBalancer 
2. npm install
3. change layer7_http.conf to nginx.conf in /usr/local/etc/nginx/
4. docker build -t nodeapp .
5. docker run -d -p 1111:9999 -e APPID=1111 nodeapp (first container/server)
6. docker run -d -p 2222:9999 -e APPID=2222 nodeapp (second container/server)
7. docker run -d -p 3333:9999 -e APPID=3333 nodeapp (third container/server)
8. docker run -d -p 4444:9999 -e APPID=4444 nodeapp (fourth container/server)

### For Layer 7 Proxy
1. Go to `http://127.0.0.1:8008/`
2. Try refreshing the page (will be round robin) 

### For Layer 4 Proxy
1. Go to `http://127.0.0.1:8008/`
2. Try refreshing the page, the behavior will be very weird, sometimes it changes
3. But it is round robin in a TCP connection, as long as TCP connection is still there it wouldn't create a new TCP connection
4. In the command line, try:
  * telnet 127.0.0.1 80
  * GET /
  * Enter
5. Do the commands for a couple of times, you should be able to see it using layer 4 LB in round robin 


# Setup for Web Socket server
### For Layer 4 WebSocket Proxying
1. cd/websocket
2. npm install
3. node index.js 1111 & node index.js 2222 & node index.js 3333 & node index.js 4444
4. Open a new terminal
5. nginx -c PATH to tcp.cfg (i.e. nginx -c /Users/Peter/webSocket/tcp.cfg)
6. Go to browser development mode -> console
   * let ws = new WebSocket("ws://localhost");
   * ws.onmessage = e => console.log(e.data)
   * ws.send("some data");
7. Should always go to the same server until you create a new connection 

### For Layer 7 WebSocket Proxying
1. cd/websocket
2. npm install
3. node index.js 1111 & node index.js 2222 & node index.js 3333 & node index.js 4444
4. Open a new terminal
5. nginx -c PATH to ws.cfg (i.e. nginx -c /Users/Peter/webSocket/ws.cfg)
6. Go to http://localhost
7. Type anything into the input field and hit ENTER
8. Repeat the steps, then you should see your message going to the same server
9. Try refreshing the page, repeat step 7. You should see a different server (by default it's going to "ws://localhost/wsapp/")
10. You can try changing the index.html from "ws://localhost/wsapp/" to "ws://localhost/wschat/"
11. You should notice that /wsapp will switch between 1111 and 2222 servers, and /wschat will switch between 3333 and 4444 servers

Notes:
* Layer 4 Proxying blindly tunnels everything to the Backend 
  * ws://localhost/ -> websocket app
  * ws://localhost/blahblah -> websocket app
  * path doesn't matter (path is only for layer 7)
* Layer 7 proxying for websocket
  * http://localhost/ -> open main html page
  * ws://localhost/wsapp -> websocket app
  * ws://localhost/wschat -> another websocket app for chatting
  * can't do these in layer 4 since port 80 is blindly tunnels
* tcp.fcg -> Layer 4 configs
* ws.cfg -> Layer 7 configs
* You can create a config file and pass it as a path to Nginx, like tcp.cfg
  * nginx -c FILEPATH
* To run node app as a background service
  * nohup node index.js &
* To start multiple servers with different port: node index.js 1111 & node index.js 2222
