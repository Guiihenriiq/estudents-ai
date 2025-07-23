import { Router } from 'express'
import { StudentController } from '../controllers/StudentController'

const router = Router()

router.post('/', StudentController.create)
router.get('/', StudentController.list)

export default router
