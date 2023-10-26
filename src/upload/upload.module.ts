import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TusService } from 'src/config/tus.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, TusService] // Include TusService here
})
export class UploadModule {}