# Load-Balancer

## Docker Commands
* To build docker image: docker build -t nodeapp . 
* To create/run a docker container using image: docker run -d -p 1111:9999 -e APPID=1111 nodeapp 

## Nginx commands
* To start Nginx Server: nginx
* To reload Nginx Server: nginx -s reload
* To stop Nginx Server: nginx -s stop

## Steps to create multiple docker containers and see load balance in Round Robin algorithm
* npm install
* docker build -t nodeapp .
* docker run -d -p 1111:9999 -e APPID=1111 nodeapp (first container/server)
* docker run -d -p 2222:9999 -e APPID=2222 nodeapp (second container/server)
* docker run -d -p 3333:9999 -e APPID=3333 nodeapp (third container/server)
* docker run -d -p 4444:9999 -e APPID=4444 nodeapp (fourth container/server)
* Go to `http://127.0.0.1:8008/` 
