import  { Router} from 'express'
import { AppointmentController, AppointmentControllerImpl } from './controller'
import { AppointmentRepository } from './repository'
import { AppointmentServiceImpl } from './service'
import { DoctorRepository } from '../doctores/repository'


const router = Router()
const appointmentRepository = new AppointmentRepository()
const doctorRepository = new DoctorRepository()
const appointmentService = new AppointmentServiceImpl(appointmentRepository, doctorRepository)
const appointmentController: AppointmentController = new AppointmentControllerImpl(appointmentService)


router.get('',  appointmentController.getAllAppointment.bind(appointmentController))
router.post('/create',  appointmentController.createAppointment.bind(appointmentController))
router.get('/:id',  appointmentController.getAppointmentById.bind(appointmentController))
router.put('/:id',  appointmentController.updateAppointment.bind(appointmentController))
router.delete('/:id',  appointmentController.deleteAppointment.bind(appointmentController))


export default router