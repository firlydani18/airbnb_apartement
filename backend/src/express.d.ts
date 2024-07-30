// types/express.d.ts

import { Request } from 'express';

declare global {
  namespace Express {
    interface MulterFile {
      location?: string; // Tambahkan jika Anda menggunakan pustaka seperti multer-s3
    }
    interface Request {
      files?: MulterFile[];
    }
  }
}