import { Router } from "express";
import {
  addParticipantType,
  getParticipantTypeById,
  getParticipantTypes,
  inactiveParticipantType,
  updateParticipantType,
} from "../../controllers/api_controllers/participant_type.controller.js";
const router = Router();

router.get("/participant-type/:id", getParticipantTypeById);
router.post("/participant-types", getParticipantTypes);
router.post("/participant-type", addParticipantType);
router.put("/participant-type/:id", updateParticipantType);
router.delete("/participant-type/:id", inactiveParticipantType);

export default router;
