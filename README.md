<p align="center">
  <img src="mobile/src/assets/logo@2x.png" />
</p>

# AirCnC - Coffe & Code

###### Offer spots for developers to work together with the same stack in your company.

---

### :information_source: How To Use

#### Server

###### :exclamation: A running MongoDB is pre-requisite, unless you use docker-compose, which is already embeded.

```bash

$ cd backend

# set required environment variables.
# NOTE: change the values after = to match your environment.

$ echo 'MONGO_URL=mongodb://aircnc-db-container:27017/admin' >> .env
$ echo 'API_EXTERNAL_URL=http://192.168.0.230:10334' >> .env
$ echo 'APP_PORT=3333' >> .env

# install dependencies
$ npm install

# Run server
$ npm start
```

##### ...or run it with Docker :whale:

```bash
$ cd backend

$ docker-compose up --build -d && docker logs --follow aircnc-api-container
```

#### Web

```bash

$ cd frontend

# install dependencies
$ yarn

# Run application
$ yarn start
```

#### Mobile

```bash

$ cd mobile

# install dependencies
$ yarn

# Connect your mobile device or emulator and run application with Expo
$ npm -i expo-cli -g && expo start
```

###### Check within `.env` files under `mobile` and `frontend` whether the API addresses are correct.

## Demo

<img src="assets/demo.gif" />
