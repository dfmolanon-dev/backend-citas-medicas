import { Appointment, AppointmentReq } from "../api/components/citas/model";
import { AppointmentServiceImpl } from "../api/components/citas/service";
import { AppointmentRepository } from "../api/components/citas/repository";
import { error } from "winston";
import { DoctorRepository } from "../api/components/doctores/repository"

describe('AppointmentController', () => {
    let appointmentService: AppointmentServiceImpl
    let appointmentRepository: AppointmentRepository
    let doctorRepository: DoctorRepository

    beforeEach(() => {
        appointmentRepository = {
            getAllAppointment: jest.fn(),
            createAppointment: jest.fn(),
            getAppointmentById: jest.fn(),
            uptadeAppointment: jest.fn(),
            deleteApointment: jest.fn()
        }

        appointmentService = new AppointmentServiceImpl(appointmentRepository,doctorRepository)
    })
    describe('getAllAppointment', () => {
        it('should get all appointment from service', async () => {
            // Mock Process
            const appointments: Appointment[] = [
                { identificacion_paciente: "123",
                especialidad: "Medicina General",
                doctor: "Juan",
                consultorio: 102,
                horario: "7:30"
                },
                { identificacion_paciente: "123",
                    especialidad: "Medicina General",
                    doctor: "Carlos",
                    consultorio: 101,
                    horario: "7:50"}    
            ]; 

            (appointmentRepository.getAllAppointment as jest.Mock).mockResolvedValue(appointments)
            const result= await appointmentService.getAllAppointments()

            expect(appointmentRepository.getAllAppointment).toHaveBeenCalled()
            expect(result).toEqual(appointments)
            
        })
        it('should return an empty array when no doctors are found', async () => {
            // Mock Process
            
            (appointmentRepository.getAllAppointment as jest.Mock).mockResolvedValue([])
            const result= await appointmentService.getAllAppointments()

            expect(appointmentRepository.getAllAppointment).toHaveBeenCalled()
            expect(result).toEqual([])
            
        })
    })

    describe('createDoctor', () => {
        it('should create a new doctor and return it from  service', async () => {
            // Mock Process
            const doctorRes: Doctor = {id_doctor: 1, nombre: 'Carlos', apellido: 'Caceres', especialidad: 'Medicina General', consultorio:100}
            const doctorReq: DoctorReq = {nombre: 'Carlos', apellido: 'Caceres', especialidad: 'Medicina General', consultorio:100};

            (doctorRepository.createDoctor as jest.Mock).mockResolvedValue(doctorRes)

            // Method execution
            const result  = await appointmentService.createDoctor(doctorReq)

            // Asserts
            expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctorReq)
            expect(result).toEqual(doctorRes)
        })
        it('should throw and error if doctor creation fails', async () => {
            // Mock Process
            const doctorReq: DoctorReq = {nombre: 'Carlos', apellido: 'Caceres', especialidad: 'Medicina General', consultorio:100};
            const error1 = new Error('Failed to create doctor');
            (doctorRepository.createDoctor as jest.Mock).mockRejectedValue(error1)

            await expect(doctorService.createDoctor(doctorReq)).rejects.toThrowError(error1)
            expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctorReq)
        })
    })

    describe('getDoctorById', () => {
        it('should get  doctor by id from service', async () => {
            // Mock Process
            const doctor: Doctor = {id_doctor: 1, nombre: 'Carlos', apellido: 'Caceres', especialidad: 'Medicina General', consultorio:100}
            const doctorId = 1;

            (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(doctor)

            // Method execution
            const result  = await doctorService.getDoctorById(doctorId)

            // Asserts
            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId)
            expect(result).toEqual(doctor)
        })
        it('should return an empty array when no doctors are found', async () => {
            // Mock Process
            const doctorId = 1;
            (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(null)

            // Method execution
            const result  = await doctorService.getDoctorById(doctorId)

            // Asserts
            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId)
            expect(result).toBeNull()
        })
        it('should throw an error if retrieval fails', async () => {
            // Mock Process
            const doctorId = 1
            const error = new Error('Database error');
            (doctorRepository.getDoctorById as jest.Mock).mockRejectedValue(error)

            // Asserts
            await expect(doctorService.getDoctorById(doctorId)).rejects.toThrowError(error)
            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId)
        })
    })
    


})