let exp = require("express");
const {Db} = require('mongodb')
const images = exp.Router();


//add body parser middleware
images.use(exp.json());
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true   
 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err)); 



const ImageDetailsScehma = new mongoose.Schema(
      {
       image:String
      },
      {
        collection: "ImageDetails",
      }
    );
    
mongoose.model("ImageDetails", ImageDetailsScehma);


const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../client/public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

images.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    await images.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

images.get("/get-image", async (req, res) => {
  try {
    images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});
  module.exports = images;