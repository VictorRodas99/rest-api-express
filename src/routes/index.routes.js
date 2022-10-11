import { Router } from 'express'
import { home, getData } from '../controllers/index.controllers.js'

const router = Router()

router.get('/', home)
router.get('/test', getData)

export default router