/**
 * Tiện ích loại bỏ siêu dữ liệu vị trí GPS và EXIF khỏi ảnh (JPEG, PNG)
 * thuần túy bằng Buffer native của Node.js mà không cần cài đặt thêm thư viện ngoài.
 */

/**
 * Loại bỏ segment APP1 (EXIF) khỏi file JPEG để xóa vị trí GPS và thông tin máy ảnh.
 */
function stripJpegExif(buffer: Buffer): Buffer {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return buffer;
  }

  const chunks: Buffer[] = [buffer.subarray(0, 2)]; // Giữ SOI 0xFF, 0xD8
  let cursor = 2;

  while (cursor < buffer.length - 1) {
    if (buffer[cursor] !== 0xff) {
      chunks.push(buffer.subarray(cursor));
      break;
    }

    const marker = buffer[cursor + 1];

    // Marker SOS (0xDA) hoặc EOI (0xD9) -> giữ nguyên toàn bộ payload nén còn lại
    if (marker === 0xda || marker === 0xd9) {
      chunks.push(buffer.subarray(cursor));
      break;
    }

    // Các marker không có trường độ dài (RST0..RST7, TEM)
    if ((marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      chunks.push(buffer.subarray(cursor, cursor + 2));
      cursor += 2;
      continue;
    }

    if (cursor + 4 > buffer.length) {
      chunks.push(buffer.subarray(cursor));
      break;
    }

    const segmentLength = buffer.readUInt16BE(cursor + 2);
    if (cursor + 2 + segmentLength > buffer.length) {
      chunks.push(buffer.subarray(cursor));
      break;
    }

    // Marker APP1 (0xFF, 0xE1): EXIF metadata chứa thông tin định vị GPS
    if (marker === 0xe1) {
      // Bỏ qua segment APP1 này (không sao chép vào buffer đầu ra)
      cursor += 2 + segmentLength;
    } else {
      chunks.push(buffer.subarray(cursor, cursor + 2 + segmentLength));
      cursor += 2 + segmentLength;
    }
  }

  return Buffer.concat(chunks);
}

/**
 * Loại bỏ chunk 'eXIf' khỏi file PNG để xóa siêu dữ liệu EXIF/GPS.
 */
function stripPngExif(buffer: Buffer): Buffer {
  // Signature PNG: 8 bytes
  if (
    buffer.length < 8 ||
    buffer[0] !== 0x89 ||
    buffer[1] !== 0x50 ||
    buffer[2] !== 0x4e ||
    buffer[3] !== 0x47 ||
    buffer[4] !== 0x0d ||
    buffer[5] !== 0x0a ||
    buffer[6] !== 0x1a ||
    buffer[7] !== 0x0a
  ) {
    return buffer;
  }

  const chunks: Buffer[] = [buffer.subarray(0, 8)];
  let cursor = 8;

  while (cursor + 8 <= buffer.length) {
    const dataLength = buffer.readUInt32BE(cursor);
    const chunkType = buffer.subarray(cursor + 4, cursor + 8).toString('ascii');
    const totalChunkLength = 12 + dataLength;

    if (cursor + totalChunkLength > buffer.length) {
      chunks.push(buffer.subarray(cursor));
      break;
    }

    // Bỏ qua chunk 'eXIf'
    if (chunkType === 'eXIf') {
      cursor += totalChunkLength;
    } else {
      chunks.push(buffer.subarray(cursor, cursor + totalChunkLength));
      cursor += totalChunkLength;
    }
  }

  return Buffer.concat(chunks);
}

/**
 * Loại bỏ siêu dữ liệu định vị vị trí (GPS) và EXIF khỏi ảnh trước khi gửi cho AI.
 */
export function stripImageMetadata(buffer: Buffer, mimeType: string): Buffer {
  if (!buffer || buffer.length < 16) return buffer;

  try {
    if (mimeType === 'image/jpeg') {
      return stripJpegExif(buffer);
    }
    if (mimeType === 'image/png') {
      return stripPngExif(buffer);
    }
  } catch {
    // Nếu có lỗi giải mã marker thì trả về buffer nguyên bản an toàn
    return buffer;
  }

  return buffer;
}
