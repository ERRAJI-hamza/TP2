import express from "express";
import {loginController,
        requireSignIn ,addUserController,getBooks} 
        from "./controller.js";

//router object
const router = express.Router();

//routing

//LOGIN || POST
router.post("/login", loginController);

//LOGIN || POST
router.post("/add-user", addUserController);

//LOGIN || POST
router.get("/books",requireSignIn ,getBooks);





export default router;