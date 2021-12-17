import { BadRequestException, Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { commonExceptionEnum } from '../enum/common-exception.enum';

@Injectable()
export class ExcelUploadService {
  private readonly validFileFormates: Array<string>;
  constructor() {
    this.validFileFormates = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
  }
  getData(file: any) {
    if (!this.validFileFormates.includes(file.mimetype)) {
      throw new BadRequestException(commonExceptionEnum.INVALID_FILE_FORMAT);
    }
    const wb = xlsx.read(file.buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    return xlsx.utils.sheet_to_json(ws);
  }
}
