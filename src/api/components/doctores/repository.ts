import {db} from '../../../config/database'
import { Doctor,DoctorReq } from './model'
import {DoctorCreationError, RecordNotFoundError, DoctorUpdateError, DoctorDeleteError} from '../../../config/customErrors'
import logger from '../../../utils/logger'


export class DoctorRepository{
    public async createDoctor(doctor:DoctorReq):Promise<Doctor>{
        try{
            const [createdDoctor] =await db('doctores').insert(doctor,'*')
            return createdDoctor
        }catch(error){
            throw new DoctorCreationError(`Failed to create doctor dubt: ${error}`)
        }
    }
    public async getAllDoctors():Promise<Doctor[]>{
        try{
            const doctors =await db.select('*').from('doctores')
            return doctors
        }catch(error){
            throw new Error(`Error getting all doctors: ${error}`)
        }
    }
    public async getDoctorById(id: number):Promise<Doctor>{
        try {
            const doctor = await db('doctores').where({ id_doctor: id }).first()
            return doctor
        } catch (error) {
            logger.error('Failed get doctor by id in repository', {error})
            throw new RecordNotFoundError()
        }
    }
    public async updateDoctor(id: number, updates: Partial<DoctorReq>):Promise<void>{
        try {
            await db('doctores').where({ id_doctor: id }).update(updates)
            
        } catch (error) {
            logger.error('Failed get doctor by id in repository', {error})
            throw new DoctorUpdateError()
        }
    }

    public async deleteDoctor(id: number): Promise<void> {
        try{
            await db('doctores').where({ id_doctor: id }).del()
        } catch (error){
            logger.error( 'Failed deleting doctor in repository', {error})
            throw new DoctorDeleteError()
        }
    }
}
export default {
    DoctorRepository
}