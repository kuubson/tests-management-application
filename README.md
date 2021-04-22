# Project "tests-management-application"

## Technologies

- HTML, CSS, JS (Bootstrap)
- React.js (Web Speech API)
- Node.js + Express (passport.js, JWT, socket.io, multer)
- MongoDB (ORM Mongoose)

## Description

This app is my first major app, a school project.

It helps teachers manage their tests for students and helps the visually impaired people in the education process through an interactive test, having a voice module that reads the questions and conducts the person after the test, as well as functions responsible for the possibility of executing test using voice commands.

The app was my "showcase" at IT competitions in the 2019 school year in the 2nd grade of technical secondary school.

## Installation

Create **.env** file and fill it based on **.env-example** file, then:

### Development

```bash
npm install
```

Start frontend & backend:

```bash
npm run dev
```

Make sure to create **MongoDB** database with credentials the same as in **.env**

### Production

Build frontend:

```bash
npm run build
```

Start backend:

```bash
npm run start
```

## Some screenshots

### Registration form

[![tma-Registration.png](https://i.postimg.cc/W1MhVX43/tma-Registration.png)](https://postimg.cc/Snxy7LCF)

### Teacher (home panel: generating test, checking students' results)

[![twa-Teacher-Home.png](https://i.postimg.cc/BvjZ6pSH/twa-Teacher-Home.png)](https://postimg.cc/cKNGkQ8L)

### Teacher (creating new question)

[![twa-Teacher-Questions.png](https://i.postimg.cc/Y9sW0RmW/twa-Teacher-Questions.png)](https://postimg.cc/njqzwv2F)

### Teacher (test panel: sending test to student, print test to pdf)

[![twa-Teacher-Test.png](https://i.postimg.cc/ZYC2Cqdk/twa-Teacher-Test.png)](https://postimg.cc/fkQBPDC5)

### Student (blind or visually impaired students can navigate through test using keyboard or voice commands)

[![twa-Blind-Student.png](https://i.postimg.cc/L6RHffBY/twa-Blind-Student.png)](https://postimg.cc/LhCKFJW2)
