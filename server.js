import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import router from "./router.js"
import bodyParser from "body-parser"

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

//pug
app.set('view engine', 'pug');
app.set('views','./');

app.get('/', (req, res) => {
    res.render('views');
  });

app.get('/register-user', (req, res) => {
    res.render('registration');
  });
  
  app.get('/books', (req, res) => {
    res.render('login-success');
  });
  
//rest api
app.get('/',(req,res) => {
    res.send({
        message: "bismilah"
    });
});

//port
const PORT = 8080;

app.listen(PORT,() => {
    console.log(`Server runing on ${PORT}`);
})