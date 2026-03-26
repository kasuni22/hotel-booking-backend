import Feedback from '../models/Feedback.js';
import { isAdminValid } from './userControllers.js';

export function createFeedback(req, res) {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "All fields (name, email, message) are required"
        });
    }

    const newFeedback = new Feedback({
        name,
        email,
        message
    });

    newFeedback.save()
        .then(() => {
            res.status(201).json({
                message: "Feedback submitted successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Feedback submission failed",
                error: error.message
            });
        });
}

export function getFeedbacks(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Forbidden - Admin access required"
        });
    }

    Feedback.find()
        .sort({ createdAt: -1 })
        .then((feedbacks) => {
            res.status(200).json({
                message: "Feedbacks retrieved successfully",
                feedbacks: feedbacks
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to retrieve feedbacks",
                error: error.message
            });
        });
}
