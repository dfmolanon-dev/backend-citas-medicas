class DoctorGetAllError extends Error {
    constructor(){
        super("Failed to retrieve doctor list")
        this.name = "DoctorGetAllError"
    }
}
class DoctorCreationError extends Error {
    constructor(message: string){
        super(message)
        this.name = "DoctorCreationError"
    }
}
class DoctorUpdateError extends Error {
    constructor(){
        super("Failed to update Doctor")
        this.name = "DoctorUpdateError"
    }
}
class DoctorDeleteError extends Error {
    constructor(){
        super("Failed to delete Doctor")
        this.name = "DoctorDeleteError"
    }
}
class RecordNotFoundError extends Error {
    constructor(){
        super("Record has not found yet")
        this.name = "RecordNotFound"
    }
}

//Patient
class PatientGetAllError extends Error {
    constructor(){
        super("Failed to retrieve doctor list")
        this.name = "PatientGetAllError"
    }
}
class PatientCreationError extends Error {
    constructor(message: string){
        super(message)
        this.name = "PatientCreationError"
    }
}
class PatientUpdateError extends Error {
    constructor(){
        super("Failed to update Patient")
        this.name = "PatientUpdateError"
    }
}
class PatientDeleteError extends Error {
    constructor(){
        super("Failed to delete Patient")
        this.name = "PatientDeleteError"
    }
}
class GetAllError extends Error {
    constructor(message: string, componentName?: string){
        super(message)
        this.name = `${componentName}GetAllError`
    }
}



export {
    DoctorGetAllError,
    DoctorCreationError,
    RecordNotFoundError,
    DoctorUpdateError,
    DoctorDeleteError,
    PatientGetAllError,
    PatientCreationError,
    PatientUpdateError,
    PatientDeleteError,
    GetAllError
}