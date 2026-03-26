import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/usersRoute.js'
import mongoose from 'mongoose'
import galleryItemRouter from './routes/galleryItemRoute.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import categoryRouter from './routes/categoryRoute.js'
import roomRouter from './routes/roomRoute.js'
import bookingRouter from './routes/bookingRoute.js'
import feedbackRouter from './routes/feedbackRoute.js'
import cors from 'cors'
import { notFound, errorHandler } from './errorMiddleware.js'
dotenv.config()


const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }))

app.use(bodyParser.json())

const connectionString = process.env.MONGO_URL

app.use((req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "")

    console.log("***" + token + "***")


    if (token != null) {
        jwt.verify(token, process.env.JWT_KEY,
            (err, decoded) => {
                if (decoded != null) {
                    req.user = decoded
                    next()
                } else {
                    next()
                }
            }

        )
    } else {
        next()

    }
});
mongoose.connect(connectionString).then(
    () => {
        console.log("Connected to the database")
    }
).catch(
    (err) => {
        console.error("Connection failed! Detailed database error:", err.message)
    }
)
app.use("/api/users", userRouter)
app.use("/api/gallery", galleryItemRouter)
app.use("/api/category", categoryRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/bookings", bookingRouter)
app.use("/api/feedback", feedbackRouter)

// Error Handling Middlewares
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on port " + port)
});