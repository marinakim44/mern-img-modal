require("dotenv").config();

//IMPORTS
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//DATABASE
const cats = [
  {
    title: "Kitty 1",
    description: "This is kitty 1",
    url: "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg",
  },
  {
    title: "Kitty 2",
    description: "This is kitty 2",
    url: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
  },
  {
    title: "Kitty 3",
    description: "This is kitty 3",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/640px-Cat_November_2010-1a.jpg",
  },
];

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (!err) {
      console.log("Database connected...");
    } else {
      console.log(err);
    }
  }
);

const kittySchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
});

const Kitty = mongoose.model("Kitty", kittySchema);

//insert data into db
// cats.forEach((cat) => {
//   const newCat = new Kitty({
//     title: cat.title,
//     description: cat.description,
//     url: cat.url,
//   });

//   newCat.save();
// });

app.get("/", (req, res) => {
  Kitty.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("Server is running...");
});
