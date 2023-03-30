import express from 'express'
import { getUser, getDashboard, processForm, deleteForm, updateForm, findProducts } from '../controllers/general.js'

const router = express.Router()
router.get('/user/:id', getUser)
router.get('/dashboard', getDashboard)
// unncecessary piece of shit
router.post('/form', processForm)
router.delete('/form', deleteForm)
router.get('/form/:id', findProducts );
router.patch('/form', updateForm);


export default router

