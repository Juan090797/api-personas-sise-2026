import z from "zod";

export const createPersonaSchema = z.object({
    numeroDocumento: z
        .string("El número de documento debe ser una cadena de texto")
        .length(8, "El número de documento debe tener 8 caracteres" )
        .regex(/^\d+$/, "El número de documento debe contener solo dígitos" )
        .nonempty("El número de documento es obligatorio"),
    correoElectronico: z
        .string("El correo electrónico debe ser una cadena de texto")
        .email({ message: "El correo electrónico no es válido" })
        .optional(),
    numeroCelular: z
        .string("El número de celular debe ser una cadena de texto")
        .length(9, "El número de celular debe tener 9 caracteres")
        .regex(/^\d+$/, "El número de celular debe contener solo dígitos")
        .optional(),
});


export const updatePersonaSchema = z.object({
    correoElectronico: z
        .string("El correo electrónico debe ser una cadena de texto")
        .email("El correo electrónico no es válido")
        .optional(),
    numeroCelular: z
        .string("El número de celular debe ser una cadena de texto")
        .length(9, "El número de celular debe tener 9 caracteres")
        .regex(/^\d+$/, "El número de celular debe contener solo dígitos")
        .optional(),

});