import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
  PaginateModel
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { log } from 'console';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: PaginateModel<TDocument>,
    private readonly connection: Connection,
  ) { }

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true }) as TDocument;

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }


  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  // async findPaginate(filterQuery: FilterQuery<TDocument>, page: number = 1, limit: number = 10, max: number = 25000) {
  //   return (await this.model.paginate(filterQuery, { page: page, limit: limit, sort: { timestamp: -1 }}));
  // }
  async findPaginate(filterQuery: FilterQuery<TDocument>, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    // Obtenez les documents paginés
    try {
      const result = await this.model.find(filterQuery, {}, { sort: {timestamp: -1}})
        .limit(limit)
        .skip(skip);
      // Calculez le nombre total de pages en fonction du nombre total de documents
      const totalPages = Math.ceil(100000 / limit);
      // Paginer manuellement en fonction de la page demandée
      const paginatedResult = {
        docs: result,
        totalDocs: 100000,
        limit,
        page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      };
  
      return paginatedResult;
    } catch (error) {
      log(error.message)
    }

  }


  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
