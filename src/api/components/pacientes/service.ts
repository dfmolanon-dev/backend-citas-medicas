import { Patient, PatientReq } from "./model"
import { PatientRepository } from "./repository"
import {PatientCreationError, PatientUpdateError, RecordNotFoundError, PatientDeleteError} from "../../../config/customErrors"
import logger from '../../../utils/logger'


export interface PatientService {
    getAllPatients():Promise<Patient[]>
    createPatient(patientReq:PatientReq):Promise<Patient>
    getPatientById(id: number):Promise<Patient>
    updatePatient(id: number, updates:Partial<Patient>):Promise<Patient>
    deletePatient(id: number):Promise<void>
}
export class PatientServiceImpl implements PatientService{
    private patientRepository:PatientRepository
    constructor(patientRepository:PatientRepository){
        this.patientRepository= patientRepository
    }


    public getAllPatients(): Promise<Patient[]> {
        const patients:Promise<Patient[]>=this.patientRepository.getAllPatients()
        return patients
    }
    public async createPatient(patientReq:PatientReq): Promise<Patient> {
        try{
            const createdPatient:Promise<Patient> = this.patientRepository.createPatient(patientReq)
            return createdPatient
        }catch(error){
            throw new PatientCreationError("Failed to create patient from service")
        }        
    }
    public getPatientById(id: number): Promise<Patient> {
        try {
            return this.patientRepository.getPatientById(id)
        } catch (error) {
            logger.error('Failed to get patient from service')
            throw new RecordNotFoundError()
        }
    }
    public  async updatePatient(id: number, updates: Partial<PatientReq>): Promise<Patient> {
        try {
            const existPatient =  await this.patientRepository.getPatientById(id)
            if (!existPatient) {
                throw new RecordNotFoundError()
            }
            const updatePatient = {...existPatient, ...updates}
            this.patientRepository.updatePatient(id, updatePatient)
            return updatePatient
        } catch (error) {
            logger.error('Failed to update patient from service')
            throw new PatientUpdateError()
        }
    }

    public async deletePatient(id: number): Promise<void> {
        try {
            const existPatient =  await this.patientRepository.getPatientById(id)
            if (!existPatient) {
                throw new RecordNotFoundError()
            }
            await this.patientRepository.deletePatient(id)
        } catch (error) {
            logger.error('Failed to delete patient from service')
            throw new PatientDeleteError()
        }
    }
}