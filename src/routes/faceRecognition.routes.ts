import { Router } from 'express'
import { middleware } from '../middlewares'
import { FaceRecognitionController } from '../controllers/faceDetection'
import multer from 'multer'

const router = Router()
const upload = multer()

router.use(middleware.useAuthorization)
router.use(middleware.allowMembershipRoles('employee'))

router.get('/face-id', FaceRecognitionController.getFaceId)
router.post('/registers', upload.single('image'), FaceRecognitionController.registerFace)
router.post('/compares', upload.single('image'), FaceRecognitionController.compareFace)

export default router
