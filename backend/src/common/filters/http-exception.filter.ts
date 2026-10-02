import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

/** Lỗi thống nhất: { success: false, error: { code, message } }. */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Lỗi hệ thống';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse() as any;
      const raw = typeof body === 'string' ? body : body?.message ?? exception.message;
      message = Array.isArray(raw) ? raw.join('; ') : raw;
    } else {
      this.logger.error(exception instanceof Error ? exception.stack : String(exception));
    }

    res.status(status).json({
      success: false,
      error: { code: HttpStatus[status] ?? String(status), message },
    });
  }
}
