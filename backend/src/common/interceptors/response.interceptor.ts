import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Envelope chung: { success: true, data, message, pagination? }.
 * - Service trả { data, pagination } thì giữ nguyên pagination.
 * - Trả { success: ... } sẵn thì không bọc lần nữa.
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (result && typeof result === 'object' && 'success' in result) return result;
        if (result && typeof result === 'object' && 'data' in result && 'pagination' in result) {
          return {
            success: true,
            data: result.data,
            message: result.message ?? 'OK',
            pagination: result.pagination,
          };
        }
        return { success: true, data: result ?? null, message: 'OK' };
      }),
    );
  }
}
