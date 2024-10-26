import { Router } from "express";
import { addChapter, getChapters, getChapterById, updateChapter,deleteChapter } from "../../controllers/api_controllers/chapter.controller.js";
const router = Router();

router.get('/chapter/:id', getChapterById);
router.post('/chapters', getChapters);
router.post('/chapter', addChapter);
router.put('/chapter/:id', updateChapter);
router.delete('/chapter/:id', deleteChapter);

export default router;