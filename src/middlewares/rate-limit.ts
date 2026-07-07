import rateLimit from "express-rate-limit";


export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // ventana de 15 minutos
    max: 100, // límite de 100 solicitudes por ventana
    standardHeaders: true, // devuelve informacion del limite en headers `RateLimit-*`
    legacyHeaders: false, // desactiva los headers `X-RateLimit-*`
    message: {
        success: false,
        message: "Demasiadas solicitudes desde esta IP, por favor intente nuevamente después de 15 minutos."
    }
});
