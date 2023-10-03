import { app } from "./app.js";
import { connectDB } from "./data/database.js";


connectDB();

app.listen(3000, ()=>{
    console.log("server started on port 3000")
});