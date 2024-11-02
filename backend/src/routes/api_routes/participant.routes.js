import { Router } from "express";
import {
  getParticipants,
  getParticipantsDropdown,
  addParticipant,
  updateParticipant
} from "../../controllers/api_controllers/participant.controller.js";
const router = Router();

router.get("/participants-dropdown", getParticipantsDropdown);
router.post("/participants", getParticipants);
router.post('/participant', addParticipant);
// router.get('/course/:id', getCourseById);
router.put('/participant/:id', updateParticipant);
// router.delete('/course/:id', inactiveCourse);

export default router;
