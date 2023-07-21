import { db } from "../../../config/database"
import { Appointment, AppointmentReq, AppointmentResDB } from "./model"
import logger from '../../../utils/logger'
import { DoctorCreationError,  PatientGetAllError,  RecordNotFoundError, GetAllError, PatientDeleteError} from "../../../config/customErrors"

export class AppointmentRepository {
    public async createAppointment(appointment: AppointmentReq): Promise<AppointmentResDB> {
        try {
            const [createdAppointment] =  await db('citas').insert(appointment).returning('*') 
            return createdAppointment
        } catch (error) {
            throw new DoctorCreationError(`Failed to create appointment dubt: ${error}`)
        }
    }

    public async getAllAppointment(): Promise<Appointment[]> {
        try {
            return  db.select('*').from('citas')
        } catch (error) {
            
            throw new GetAllError("Failed getting all appointments from repository", "appointment")
        }
    }

    public async getAppointmentById(id: number): Promise<AppointmentResDB> {
        try{
            const appointment = await db('citas').where({ id_cita: id }).first()
            return appointment
        } catch (error){
            logger.error( 'Failed get appointment by id in repository', {error})
            throw new RecordNotFoundError()
        }
    }
    public async uptadeAppointment(id: number, updates: Partial<AppointmentReq>): Promise<void> {
        try {
            await db('citas').insert({ id_cita: id }).update(updates)
        } catch (error) {
            throw new DoctorCreationError(`Failed get appointment by id in repository`)
        }
    }
    public async deleteApointment(id: number): Promise<void> {
        try{
            await db('citas').where({ id_cita: id }).del()
        } catch (error){
            logger.error( 'Failed deleting patient in repository', {error})
            throw new PatientDeleteError()
        }
    }
}