import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ErrorCode } from '../constants/error-codes.enum';

/**
 * Lỗi thống nhất theo doc FE: { success: false, error: { code, message, details? } }.
 *
 * - Service ném exception kèm { code: ErrorCode.X, message: '<tiếng Việt>' } thì giữ nguyên.
 * - Lỗi validation (ValidationPipe) trả message dạng mảng tiếng Anh của class-validator:
 *   gom thành VALIDATION_FAILED + message tiếng Việt cố định, chi tiết từng trường để ở `details`
 *   (FE tự hiển thị hoặc bỏ qua) thay vì để tiếng Anh thô lọt ra giao diện.
 * - 401/403/404 do Nest tự sinh (không có code) được gán mã mặc định và dịch sang tiếng Việt.
 * - Lỗi không phải HttpException: log stack ở server, trả 500 chung chung, không lộ nội dung lỗi.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: string = ErrorCode.INTERNAL_ERROR;
    let message = 'Lỗi hệ thống, vui lòng thử lại sau';
    let details: string[] | undefined;
    let suggestion: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse() as any;

      if (body && typeof body === 'object' && typeof body.code === 'string') {
        // Lỗi nghiệp vụ do service chủ động ném.
        code = body.code;
        message = body.message;
        // Gợi ý bổ sung (vd. "hãy lùi ngày mục tiêu") đi kèm lỗi mục tiêu cân nặng.
        if (typeof body.suggestion === 'string' && body.suggestion) {
          suggestion = body.suggestion;
        }
      } else if (body && typeof body === 'object' && Array.isArray(body.message)) {
        code = ErrorCode.VALIDATION_FAILED;
        message = 'Dữ liệu gửi lên không hợp lệ';
        details = body.message;
      } else {
        // Exception mặc định của Nest (không có code): gán mã theo status.
        ({ code, message } = this.fromStatus(status, body));
      }
    } else {
      this.logger.error(exception instanceof Error ? exception.stack : String(exception));
    }

    res.status(status).json({
      success: false,
      error: { code, message, ...(details ? { details } : {}), ...(suggestion ? { suggestion } : {}) },
    });
  }

  private customMessage(body: any, defaults: string[]): string | undefined {
    const raw = typeof body === 'string' ? body : body?.message;
    return typeof raw === 'string' && !defaults.includes(raw) ? raw : undefined;
  }

  private fromStatus(status: number, body: any): { code: string; message: string } {
    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        return { code: ErrorCode.AUTH_UNAUTHORIZED, message: 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn' };
      case HttpStatus.FORBIDDEN: {
        // Giữ message nghiệp vụ do service ném (vd. "tính năng Premium"); chỉ thay message mặc định của Nest.
        const custom = this.customMessage(body, ['Forbidden', 'Forbidden resource']);
        return { code: ErrorCode.AUTH_FORBIDDEN, message: custom ?? 'Bạn không có quyền thực hiện thao tác này' };
      }
      case HttpStatus.NOT_FOUND: {
        // "Cannot GET /x" là route không tồn tại; message khác là NotFoundException của service
        // (vd. "Recipe #1 not found") nên giữ lại để không nhầm với sai đường dẫn.
        const custom = this.customMessage(body, ['Not Found']);
        if (custom && !custom.startsWith('Cannot ')) {
          return { code: ErrorCode.RESOURCE_NOT_FOUND, message: custom };
        }
        return { code: ErrorCode.ROUTE_NOT_FOUND, message: 'Không tìm thấy đường dẫn yêu cầu' };
      }
      default: {
        // Giữ message gốc cho các status còn lại (ví dụ 400 do ParseIntPipe) để không mất thông tin.
        const raw = typeof body === 'string' ? body : body?.message;
        return { code: HttpStatus[status] ?? String(status), message: raw ?? 'Yêu cầu không hợp lệ' };
      }
    }
  }
}
