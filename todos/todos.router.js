import { Router } from "express";
import { commmonResponse } from "./todos.controller.js";

const router = Router();

router.all("/", commmonResponse);

module.exports = router;
