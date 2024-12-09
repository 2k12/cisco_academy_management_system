import { Router } from "express";
import { getCoursesDropdown,addCourse,getAllCourses,getCourseById,inactiveCourse,updateCourse,getCertificates } from "../../controllers/api_controllers/course.controller.js";
const router = Router();

router.get('/course/:id', getCourseById);
router.get('/courses-dropdown', getCoursesDropdown);
router.get('/courses-certificate/:id', getCertificates);
router.post('/courses', getAllCourses  );
router.post('/course', addCourse);
router.put('/course/:id', updateCourse);
router.delete('/course/:id', inactiveCourse);

export default router;