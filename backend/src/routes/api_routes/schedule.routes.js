import { Router } from "express";
import { addSchedule,deleteSchedule,getSchedule,getScheduleById,updateSchedule } from "../../controllers/api_controllers/schedule.controller.js";
const router = Router();

router.get('/schedule/:id', getScheduleById);
router.post('/schedules', getSchedule);
router.post('/schedule', addSchedule);
router.put('/schedule/:id', updateSchedule);
router.delete('/schedule/:id', deleteSchedule);

export default router;

