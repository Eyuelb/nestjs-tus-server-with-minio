import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { TusService } from 'src/config/tus.service';

@Controller('upload/files')
export class UploadController {

    constructor(
      private tusService: TusService,
      ) {}

    @All("*")
    async tus(@Req() req, @Res() res) {
        return this.tusService.handleTus(req, res);
    }
}
