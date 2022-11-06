import { Router } from "express";
import getRank from "../controllers/getRank";

// initiating route
const router: Router = Router();

// router with get method
// getWords ==> is a Controller
router.post("/", getRank);


// export router to used in app.ts
export default router;
