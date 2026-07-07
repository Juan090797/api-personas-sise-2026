import { CreatePersonaDto, PersonaResponseDto, UpdatePersonaDto } from '../dtos/persona.dto';
import { Persona } from '../interfaces/persona';


let personas: Persona[] = [
    { id: 1, numeroDocumento: '12345678', nombres: 'Juan', apellidoPaterno: 'Pérez', apellidoMaterno: 'Gómez' },
    { id: 2, numeroDocumento: '87654321', nombres: 'María', apellidoPaterno: 'López', apellidoMaterno: 'Martínez' },
    { id: 3, numeroDocumento: '11223344', nombres: 'Pedro', apellidoPaterno: 'García', apellidoMaterno: 'Rodríguez' },
    { id: 4, numeroDocumento: '44332211', nombres: 'Ana', apellidoPaterno: 'Sánchez', apellidoMaterno: 'Díaz' },
];

export const getPersonas = (): PersonaResponseDto[] => {
    return personas;
}

export const getPersonaById = (id: number): PersonaResponseDto | undefined => {
    return personas.find(persona => persona.id === id);
}

export const createPersona = async ( payload: CreatePersonaDto ): Promise<PersonaResponseDto> => {
    const url = `https://api.apis.net.pe/v1/dni?numero=${payload.numeroDocumento}`;
    console.log(`Consultando API externa: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al consultar API externa: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Datos recibidos de la API externa:', data);
    const nuevaPersona: Persona = {
        id: personas.length + 1,
        numeroDocumento: payload.numeroDocumento,
        nombres: data.nombres,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        correoElectronico: payload.correoElectronico,
        numeroCelular: payload.numeroCelular,
    };

    personas.push(nuevaPersona);
    return nuevaPersona;
}

export const updatePersona = (id: number, persona: UpdatePersonaDto): PersonaResponseDto | null => {
    const personaEncontrada = personas.find(p => p.id === id);
    if (!personaEncontrada) {
        return null;
    }
    personaEncontrada.correoElectronico = persona.correoElectronico || personaEncontrada.correoElectronico;
    personaEncontrada.numeroCelular = persona.numeroCelular || personaEncontrada.numeroCelular;
    return personaEncontrada;
}

export const deletePersona = (id: number): boolean => {
    const index = personas.findIndex(p => p.id === id);
    if (index !== -1) {
        personas.splice(index, 1);
        return true;
    }
    return false;
}
