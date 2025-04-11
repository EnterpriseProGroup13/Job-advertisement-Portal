import express from 'express';
import { createJob, getJobs, getJobById } from '../controllers/job.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/', protect, createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);

export default router;

router.post("/", async (req, res) => {
    try {
      const job = await Job.create(req.body);
      res.status(200).json(job);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
