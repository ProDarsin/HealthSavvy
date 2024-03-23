import {registerClient,getclient,login} from '../controllers/client.js'
import express from 'express'

const router=express.Router()

router.post('/createAccount',registerClient)
router.get('/getclient',getclient)
router.post('/login',login)
export default router