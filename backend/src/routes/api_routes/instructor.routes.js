import { Router } from "express";
import { getInstructorsDropdown,addInstructor, getInstructorById, getInstructors, updateInstructor } from "../../controllers/api_controllers/instructor.controller.js";
const router = Router();

router.get('/instructor/:id', getInstructorById);
router.get('/instructors-dropdown', getInstructorsDropdown);
router.post('/instructors', getInstructors);
router.post('/instructor', addInstructor);
router.put('/instructor/:id', updateInstructor);
// router.delete('/user', register);

export default router;