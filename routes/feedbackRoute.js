import express from 'express';
import { createFeedback, getFeedbacks } from '../controllers/feedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.post("/", createFeedback);
feedbackRouter.get("/", getFeedbacks);

export default feedbackRouter;
