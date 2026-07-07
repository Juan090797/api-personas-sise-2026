
export class ApiResponse<T>{
    constructor(
        public success: boolean, 
        public message: string,
        public data?: T,
        public error?: any
    ) {}

    static success<T>(data?: T, message:string = 'Operación exitosa'): ApiResponse<T> {
        return new ApiResponse<T>(true, message, data);
    }

    static error<T>(message: string = 'Error en la operación', error?: any): ApiResponse<null> {
        return new ApiResponse<null>(false, message, undefined, error);
    }
}