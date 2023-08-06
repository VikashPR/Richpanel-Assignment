# RichPanel Subscription Service

### Project Description
This project is a simple subscription service that allows users to subscribe to a service and view their subscription details. The project is built using Vue.js, uses Firebase as the backend and powered by stripe. The project is hosted on Firebase and can be accessed at [Live](https://richpanel-assignment-de3f0.web.app)

### Tech Stack

![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=Vue.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=Vuetify&logoColor=white)


### Live Demo
https://github.com/VikashPR/Richpanel-Assignment/assets/69889418/78929806-33c0-4c7e-b96e-07c6a0b5db86

### CI/CD Pipeline

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=GitHub-Actions&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white)

### Project Requirements
- Node.js
- NPM
- Firebase CLI
- Vue CLI


### Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Understanding Routing

``` javascript
path:"/"
    name:"Home"
path:"login"
    name:"Login"
path:"register"
    name:"register"
path:"/payment/:planDuration/:selectedPlan"
    name:"Payment"
path:"user-plan"
    name:"UserPlan"
```


