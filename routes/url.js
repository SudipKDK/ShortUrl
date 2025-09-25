import express from 'express';
import { handleCreateShortUrl ,handleRedirectUrl} from "../controllers/url.js";

const router = express.Router();

router.post('/', handleCreateShortUrl)
router.get('/:shortId', handleRedirectUrl)

export default router;

