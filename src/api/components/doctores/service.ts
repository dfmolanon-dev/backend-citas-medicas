import { DoctorCreationError, RecordNotFoundError, DoctorUpdateError, DoctorDeleteError } from "../../../config/customErrors"
import { Doctor, DoctorReq } from "./model"
import { DoctorRepository } from "./repository"
import logger from '../../../utils/logger'


export interface DoctorService {
    getAllDoctors():Promise<Doctor[]>
    createDoctor(doctorReq:DoctorReq):Promise<Doctor>
    getDoctorById(id: number):Promise<Doctor>
    updateDoctor(id: number, updates:Partial<Doctor>):Promise<Doctor>
    deleteDoctor(id: number):Promise<void>
}
export class DoctorServiceImpl implements DoctorService{
    private doctorRepository:DoctorRepository
    constructor(doctorRepository:DoctorRepository){
        this.doctorRepository= doctorRepository
    }
    public getAllDoctors(): Promise<Doctor[]> {
        const doctors:Promise<Doctor[]>=this.doctorRepository.getAllDoctors()
        return doctors
    }
    public async createDoctor(doctorReq:DoctorReq): Promise<Doctor> {
        try{
            const createdDoctor:Promise<Doctor> = this.doctorRepository.createDoctor(doctorReq)
            return createdDoctor
        }catch(error){
            throw new DoctorCreationError("Failed to create doctor from service")
        }        
    }
    public getDoctorById(id: number):Promise<Doctor>{
        try{
            return this.doctorRepository.getDoctorById(id)
        }catch (error){
            logger.error('Failed get doctor by id in servise', {error})
            throw new RecordNotFoundError()
        }
    }
    public  async updateDoctor(id: number, updates: Partial<DoctorReq>): Promise<Doctor> {
        try {
            const existDoctor =  await this.doctorRepository.getDoctorById(id)
            if (!existDoctor) {
                throw new RecordNotFoundError()
            }
            const updateDoctor = {...existDoctor, ...updates}
            this.doctorRepository.updateDoctor(id, updateDoctor)
            return updateDoctor
        } catch (error) {
            logger.error('Failed to update doctor from service')
            throw new DoctorUpdateError()
        }
    }

    public async deleteDoctor(id: number): Promise<void> {
        try {
            const existDoctor =  await this.doctorRepository.getDoctorById(id)
            if (!existDoctor) {
                throw new RecordNotFoundError()
            }
            await this.doctorRepository.deleteDoctor(id)
        } catch (error) {
            logger.error('Failed to delete doctor from service')
            throw new DoctorDeleteError()
        }
    }
}