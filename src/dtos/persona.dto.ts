
export interface CreatePersonaDto{
    numeroDocumento: string;
    correoElectronico?: string;
    numeroCelular?: string;
}

export interface UpdatePersonaDto{
    correoElectronico?: string;
    numeroCelular?: string;
}

export interface PersonaResponseDto{
    id: number;
    numeroDocumento: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correoElectronico?: string;
    numeroCelular?: string;
}