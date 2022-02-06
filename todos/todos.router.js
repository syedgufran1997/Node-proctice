import { Router } from "express";
import { commmonResponse } from "./todos.controller0";

const router = Router();

router.all("/", commmonResponse);

module.exports = router;
