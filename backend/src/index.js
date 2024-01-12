import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
dotenv.config(
    {
        path: "./.env"
    }
)

// app.listen(process.env.PORT || 3000, () => {
//     console.log("listening on port " + process.env.PORT || 3000);
// })


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("listening on port " + process.env.PORT || 3000);
        })
    })
    .catch(e => {
        console.error(e.message);
    })
