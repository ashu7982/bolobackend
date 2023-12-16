
const http = require('http');
const url = require('url');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// MongoDB connection
const connection = mongoose.connect(process.env.URL);

// User model
const {UserModel}=require('./Models/developer')

//onboarding model
const {DeveloperModel}=require('./Models/onboarding')



// User Router starts from here

// registering new developers and users
const handleRegister = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      const hash = await bcrypt.hash(password, 4);
      const newUser = new UserModel({ email, password: hash });
      await newUser.save();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 'msg': 'new user has been added' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 'msg': 'user already exists, please login' }));
    }
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'err': err.message }));
  }
};



// from here uses and developers can login using their credentials
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign({ name: 'ashutosh' }, 'secretkey');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 'msg': 'user logged in', token }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 'msg': 'wrong credentials' }));
      }
    }
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'err': err.message }));
  }
};






// const handleDeveloperOnboarding = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     phoneNumber,
//     email,
//     skills,
//     professionalExperiences,
//     educationalExperiences
//   } = req.body;

//   const token = req.headers.authorization.split(' ')[1];

//   if (!token) {
//     res.writeHead(401, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ 'msg': 'Unauthorized: Token not provided' }));
//     return;
//   }

//   try {
//     const decoded = await jwt.verify(token, 'secretkey');

//     if (!req.body) {
//       res.writeHead(400, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ 'msg': 'Bad Request: Request body is empty' }));
//       return;
//     }

//     const developer = new DeveloperModel({
//       firstName,
//       lastName,
//       phoneNumber,
//       email,
//       skills,
//       professionalExperiences,
//       educationalExperiences
//     });

//     await developer.save();

//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ 'msg': 'Developer onboarding details added successfully' }));
//   } catch (err) {
//     res.writeHead(401, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ 'msg': 'Unauthorized: Invalid token' }));
//   }
// };




// from here developer onboarding detail get saved in our mongodb server
const handleDeveloperOnboarding = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    skills,
    professionalExperiences,
    educationalExperiences
  } = req.body;

  if (!req.body) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'msg': 'Bad Request: Request body is empty' }));
    return;
  }

  try {
    

    const developer = new DeveloperModel({
      firstName,
      lastName,
      phoneNumber,
      email,
      skills,
      professionalExperiences,
      educationalExperiences
    });

    await developer.save();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'msg': 'Developer onboarding details added successfully' }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'msg': 'Internal Server Error', 'err': err.message }));
  }
};




// here we create a server with the help of http 
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;



  // here all the post method's path or api present 
  if (req.method === 'POST') {
    if (pathname === '/users/register') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        req.body = JSON.parse(data);
        handleRegister(req, res);
      });
    } else if (pathname === '/users/login') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        req.body = JSON.parse(data);
        handleLogin(req, res);
      });
    }
    else if (pathname === '/developers/onboarding') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        req.body = JSON.parse(data);
        handleDeveloperOnboarding(req, res);
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});



// listening to our server on port 8080
server.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT);
});


