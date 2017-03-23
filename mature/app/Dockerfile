FROM node:6.3.1

RUN mkdir -p /tiny

WORKDIR /tiny

# copy all the file from dir that Dockerfile exist to /tiny dir in docker container
ADD . /tiny

RUN cd /tiny && npm install

EXPOSE 3000

CMD ["node", "/tiny/index.js"]

# to build this dockerfile into image, type this cmd in terminal:
# $ docker build -t [image name] [dockerfile directory]

# then to run the image in docker
# $ docker run --name [app name] -p [port mapping] -d [image name]
# i.e. $ docker run --name tiny -p 3000:3000 -d tinyurl

# stop all containers:       $ docker stop $(docker ps -a -q)
# remove all containers:     $ docker rm $(docker ps -a -q)
# remove all docker images:  $ docker rmi $(docker images -q)