import 'dotenv/config'; // sirve para cargar las variables de entorno desde un archivo .env
import express from 'express';
import personaRoutes from './routes/persona.routes';
import helmet from 'helmet';
import cors from 'cors';
import { apiLimiter } from './middlewares/rate-limit';
import { apiKeyAuth } from './middlewares/api-key';

const app = express();

const PORT = process.env.PORT || 3003;

app.use(helmet()); //middleware de seguridad que ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas
app.use(cors()); //middleware que permite solicitudes de origen cruzado (CORS) desde cualquier dominio
app.use(express.json({ limit: '10kb' }));//midleware que permite recibir datos en formato JSON en las solicitudes HTTP
app.use(apiLimiter); //middleware que limita la cantidad de solicitudes que un cliente puede hacer a la API en un período de tiempo determinado

app.use('/personas', apiKeyAuth, personaRoutes); // API key solo en la ruta de personas


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});