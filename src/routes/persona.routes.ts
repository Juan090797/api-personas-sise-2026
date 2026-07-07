import { Router } from 'express';
import * as personaController from '../controllers/persona.controller';

const router = Router();

router.get('/', personaController.getPersonas);
router.get('/:id', personaController.getPersonaById);
router.post('/', personaController.createPersona);
router.put('/:id', personaController.updatePersona);
router.delete('/:id', personaController.deletePersona);

export default router;

