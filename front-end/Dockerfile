# FROM node:12.13.0  as react_build
FROM node:14-alpine as react_build 
# FROM node:latest  as react_build

#also say
WORKDIR /app
# Add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH
#copy the react app to the container
COPY . /app/

# #prepare the contiainer for building react
#RUN npm install -g npm@8.1.4 --silent --force
RUN npm install npm@latest -g
RUN npm install react@latest  --legacy-peer-deps --force
#RUN npm install react-scripts@3.4.1 -g --silent
#RUN npm audit fix
#RUN yarn install --ignore-engines && yarn build
#RUN npm install react-material-ui-carousel  --silent --force
#RUN npm install axios
#RUN  npm audit fix --force
RUN  npm run build

#prepare nginx
FROM nginx:1.16.0-alpine

COPY --from=react_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

#fire up nginx
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
              