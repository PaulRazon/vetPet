export interface Cita{
    id?:string;
    name?:string;
    propietario?:string;
    fecha?:string;
    hora?:string;
    tipo?:string;
    observaciones?:string;
    email?:string;
    status?:'pendiente'|'atendida'|'cancelada';
}
