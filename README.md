![new](https://github.com/tomkkl/OptiRoute/assets/91853199/ae70d79d-54f4-49de-8430-152fb98149ba)
# OptiRoute


OptiRoute is a web application designed to streamline the process of event scheduling and route planning, while also offering social interaction features. 

## Features

- **User Authentication**: Sign-up, login, and password reset functionalities.
- **Event Management**: Add, view, and manage personal and shared events on a calendar UI.
- **Route Planning**: Integrated with Google Maps, allowing users to plan routes, select travel modes, and manage saved routes.
- **Weather Widget**: Integrated with OpenWeather, allowing users to see the weather around the location of their routes.
- **Social Interactions**: Connect with friends, share events, and manage friend requests.
- **Notifications**: Customize notification settings and receive email/text notifications for any upcoming events.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Others: Google Maps API, OpenWeather API

## Getting Started

1. Clone the git repository
2. Change directory into `optiroute` and run `npm --force install`
3. Change directory into `optiroute/src/backend` and run `npm install`
4. Inside `optiroute/src/backend`, create a new file, `.env` and paste these contents in:
```
// You will have to grab your own MongoDB URI.
PORT=4000
MONGO_URI=mongodb+srv://user:password@mycluster.vsmdces.mongodb.net/?retryWrites=true&w=majority
```
5. Run `npm start` in `optiroute` and run `npm run dev` in `optiroute/src/backend`
