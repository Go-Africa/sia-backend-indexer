import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, PaginateModel } from 'mongoose';
import { AbstractRepository } from 'src/shared/database/abstract.repository';
import { Host } from '../schemas/host.schema';

@Injectable()
export class HostRepository extends AbstractRepository<Host> {
  protected readonly logger = new Logger(HostRepository.name);

  constructor(
    @InjectModel(Host.name) hostModel: PaginateModel<Host>,
    @InjectConnection() connection: Connection,
  ) {
    super(hostModel, connection);
  }
}
