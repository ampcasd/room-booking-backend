import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { EventDetails } from './schemas/event-details.schema';

@Injectable()
export class EventDetailsRepository extends AbstractRepository<EventDetails> {
  protected readonly logger = new Logger(EventDetails.name);

  constructor(
    @InjectModel(EventDetails.name) eventDetailsModel: Model<EventDetails>,
    @InjectConnection() connection: Connection,
  ) {
    super(eventDetailsModel, connection);
  }

  async getEventDetails() {
    return await this.model.aggregate([{ $sort: { to: -1 } }, { $limit: 1 }]);
  }
}
