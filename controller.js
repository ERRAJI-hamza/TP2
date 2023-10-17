import bcrypt from "bcrypt"
import userModel from "./userModel.js";
import bookModel from "./bookModel.js";
import JWT from "jsonwebtoken";
import axios from "axios";

export const addUserController = async (req, res) => {
  try {
     console.log(12);
     console.log(req.body);
     const { userName , password} = req.body;
     //validations
     if(!userName) {
         return res.send({ message: "username is Required" });
     }
     if(!password) {
      return res.send({ message: "password is Required" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const user = await new userModel({
      userName,
      password: hashedPassword,
    }).save();


 res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
    });

  } catch (error) {
    res.status(500).send({
      success: true,
      message: "User Register Successfully",
      user,
  });
};
}

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password } = req.body;
    //validation
    if (!userName || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, "HAFHGEAD1212432475", {
      expiresIn: "7d",
    });
   /* res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        userName: user.userName,
      },
      token: token,
    });*/
    console.log(user.userName);
    console.log(token);
    const response = await axios.get('http://localhost:8080/books', {
      headers: {
        Authorization: `${token}`,
      },
    });

    // Handle the response from the /books request
    const books = response.data.books;

    res.render('login-success', {
      success: true,
      userName: user.userName,
      token: token,
      books: books, // Include the books data in the response
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      "HAFHGEAD1212432475"
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};


// get all books
export const getBooks = async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.status(200).send({
      success: true,
      message: "All book",
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting",
    });
  }
};