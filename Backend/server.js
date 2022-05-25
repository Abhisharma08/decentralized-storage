const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/user");
const url =
  "mongodb+srv://abhi:abhi1234@cluster0.097ih.mongodb.net/userData?retryWrites=true&w=majority";
//db
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTED."))
  .catch((err) => console.log(`DB CONNECTION ERROR --> ${err}`));

//app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("", (req, res) => console.log("hello-"));

userData = null;

app.post("/api/user/register", (req, res) => {
  userData = req.body;
  console.log(userData);

  if (userData.ok) {
    const user = new User({
      email: userData.email,
      pass: userData.pass,
    });

    user.save().then((result) => {
      console.log("user saved!");
      // mongoose.connection.close();
    });

    res.send({ userSaved: true });
  }
});

app.post("/api/user/savefile", async (req, res) => {
  userData = req.body;
  console.log(userData);

  const user = await User.findOne({ email: userData.email }).exec();

  user.files.push(userData.hash);
  user.save().then((result) => {
    console.log("file saved!");
  });

  res.send({ fileSaved: true });
});

app.post("/api/user/login", (req, res) => {
  userData = req.body;

  User.findOne({ email: userData.email }, function (error, foundUser) {
    if (!error) {
      if (foundUser) {
        //----compare passwords-----//
        if (foundUser.pass == userData.pass) {
          //password matches
          res.send({ ok: true });
          console.log("correct info ----");
        } else {
          res.send({ ok: false });
          console.log("wrong pass ----");
        }
        //---end checking password compraison
      } else {
        res.send({ ok: false });
        console.log("email not found ----");
      }
    } else {
      res.send(error);
      console.log(error);
    }
  });
});

app.post("/api/user/getfiles", (req, res) => {
  userData = req.body;

  User.findOne({ email: userData.email }, function (error, foundUser) {
    if (!error) {
      if (foundUser) {
        let files = foundUser.files;
        res.send({ ok: true, files });
      } else {
        res.send({ ok: false });
        console.log("email not found ----");
      }
    } else {
      res.send(error);
      console.log(error);
    }
  });
});

app.post("/api/user/deletefile", async (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $pull: { files: req.body.hash } },
    { safe: true, upsert: true },
    function (err, user) {
      if (!err) {
        res.send({ deleted: true });
      } else res.send({ deleted: false });
    }
  );
});
//port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
