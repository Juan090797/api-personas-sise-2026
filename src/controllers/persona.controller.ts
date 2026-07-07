import { Request, Response } from 'express';
import * as personaService from '../services/persona.service';
import { CreatePersonaDto, PersonaResponseDto, UpdatePersonaDto } from '../dtos/persona.dto';
import { ApiResponse } from '../common/api-response';
import { createPersonaSchema } from '../schemas/persona.schema';

export const getPersonas = (req: Request, res: Response) => {
    const personas = personaService.getPersonas();
    res.json( ApiResponse.success(personas, 'Lista de personas') );
}

export const getPersonaById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const persona = personaService.getPersonaById(id);

    if (persona) {
        res.json( ApiResponse.success(persona, 'Persona encontrada') );
    } else {
        res.status(404).json( ApiResponse.error('Persona no existe') );
    }
}

export const createPersona = async(req: Request, res: Response) => {
    try {
        const result = createPersonaSchema.safeParse(req.body);
        if (!result.success) {
            console.log(result.error.format());
            return res.status(400).json( ApiResponse.error('Datos inválidos', result.error.format()) );
        }
        const payload: CreatePersonaDto = req.body;
        const personaNueva: PersonaResponseDto = await personaService.createPersona(payload);
        res.status(201).json( ApiResponse.success(personaNueva, 'Persona creada exitosamente') );
    } catch (error) {
        res.status(500).json( ApiResponse.error('Error al crear la persona', error) );
    }
}

export const updatePersona = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const personaData: UpdatePersonaDto = req.body;

    const updatedPersona = personaService.updatePersona(id, personaData);

    if (updatedPersona) {
        res.json( ApiResponse.success(updatedPersona, 'Persona actualizada exitosamente') );
    } else {
        res.status(404).json( ApiResponse.error('Persona no existe') );
    }
}

export const deletePersona = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletedPersona = personaService.deletePersona(id);

    if (deletedPersona) {
        res.json( ApiResponse.success(null, 'Persona eliminada exitosamente') );
    } else {
        res.status(404).json( ApiResponse.error('Persona no existe') );
    }
}
