import { Request, Response, NextFunction } from "express";


export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header("x-api-key"); // el cliente manda: x-api-key: <API_KEY>
    console.log('API KEY enviado:', apiKey);
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: "No autorizado" });
    }

    next(); // clave correcta -> deja pasar al siguiente middleware o ruta
}
