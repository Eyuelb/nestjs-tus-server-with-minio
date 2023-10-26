import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import tus = require('tus-node-server');

const bucketName = 'testbucket';

const endPointUrl = `http://localhost:9000`
const minioStoreConfig = {
    partSize: 8 * 1024 * 1024, // Each uploaded part will have ~8MB,
    bucket: bucketName,
    accessKeyId: "RQgBK4Y5wmlIibQ4rjRo",
    secretAccessKey: "HORXoPaRMKfYhTcPC3G0HI3mIZNWmMahikwdjWft",
    endpoint: endPointUrl,
    s3ForcePathStyle: true,
    // signatureVersion: 'v2',
  };
  const serverOptions = {
    path: "/upload/files",
  };

@Injectable()
export class TusService implements OnModuleInit {

    private logger = new Logger('TusService');

    private readonly tusServer = new tus.Server(serverOptions);

    onModuleInit() {
        this.initializeTusServer();
    }

    async handleTus(req, res) {
        return this.tusServer.handle(req, res);
    }

    private initializeTusServer() {
        this.logger.verbose(`Initializing Tus Server`);

        this.tusServer.datastore = new tus.S3Store(minioStoreConfig);

        this.tusServer.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
            this.logger.verbose(`Upload complete for file ${JSON.stringify(event.file)}`);
        });
    }


}
