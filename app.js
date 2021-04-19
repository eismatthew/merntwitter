const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users")
const tweets = require("./routes/api/tweets")
const User = require('./models/User');
const passport = require('passport');


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  const path = require('path');

  if (process.env.NODE_ENV === 'production') {
      app.use(express.static('frontend/build'));
      app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
      })
  }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

require('./config/passport')(passport);

// app.get("/", (req, res) => {
//     const user = new User({
//         handle: 'matt',
//         email: 'matt@matt.matt',
//         password: 'mattisgreat123'
//     })
//     user.save()
//     res.send("Hello World");

// });



app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

