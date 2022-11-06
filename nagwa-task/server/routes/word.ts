import { Router } from "express";
import getWords from "../controllers/getWords";

// initiating route 
const router: Router = Router();

// router with get method
// getWords ==> is a Controller
router.get("/", getWords);

// export router to used in app.ts
export default router;
