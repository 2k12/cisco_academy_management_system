import { Router } from "express";
import {
  getParticipants,
  getParticipantsDropdown,
} from "../../controllers/api_controllers/participant.controller.js";
const router = Router();

router.get("/participants-dropdown", getParticipantsDropdown);
router.post("/participants", getParticipants);
// router.get('/course/:id', getCourseById);
// router.post('/course', addCourse);
// router.put('/course/:id', updateCourse);
// router.delete('/course/:id', inactiveCourse);

export default router;
