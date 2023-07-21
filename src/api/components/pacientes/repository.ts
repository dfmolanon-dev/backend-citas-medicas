import {db} from '../../../config/database'
import { Patient,PatientReq } from './model'
import {PatientCreationError, RecordNotFoundError, PatientUpdateError, PatientDeleteError} from '../../../config/customErrors'
import logger from '../../../utils/logger'


export class PatientRepository{
    public async createPatient(patient:PatientReq):Promise<Patient>{
        try{
            const [createdPatient] =await db('pacientes').insert(patient,'*')
            return createdPatient
        }catch(error){
            throw new PatientCreationError(`Failed to create patient dubt: ${error}`)
        }
    }
    public async getAllPatients():Promise<Patient[]>{
        try{
            const patients =await db.select('*').from('pacientes')
            return patients
        }catch(error){
            throw new Error(`Error getting all patients: ${error}`)
        }
    }
    public async getPatientById(id: number): Promise<Patient> {
        try{
            const patient = await db('pacientes').where({ id_paciente: id }).first()
            return patient
        } catch (error){
            logger.error( 'Failed get patient by id in repository', {error})
            throw new RecordNotFoundError()
        }
    }
    public async updatePatient(id: number, updates: Partial<PatientReq>):Promise<void>{
        try {
            await db('pacientes').where({ id_paciente: id }).update(updates)
            
        } catch (error) {
            logger.error('Failed get patient by id in repository', {error})
            throw new PatientUpdateError()
        }
    }

    public async deletePatient(id: number): Promise<void> {
        try{
            await db('pacientes').where({ id_paciente: id }).del()
        } catch (error){
            logger.error( 'Failed deleting patient in repository', {error})
            throw new PatientDeleteError()
        }
    }
}