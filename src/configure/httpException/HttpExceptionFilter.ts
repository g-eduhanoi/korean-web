import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import {request, Response} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log(exception); // Log the exception for debugging

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: exception.message,
                path: request.url,
            });
    }
}