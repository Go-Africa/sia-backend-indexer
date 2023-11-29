"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const console_1 = require("console");
class AbstractRepository {
    constructor(model, connection) {
        this.model = model;
        this.connection = connection;
    }
    async create(document, options) {
        const createdDocument = new this.model(Object.assign(Object.assign({}, document), { _id: new mongoose_1.Types.ObjectId() }));
        return (await createdDocument.save(options)).toJSON();
    }
    async countTotalDoc(filterQuery) {
        const totalDocs = await this.model.countDocuments(filterQuery);
        return totalDocs;
    }
    async findOne(filterQuery) {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });
        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new common_1.NotFoundException('Document not found.');
        }
        return document;
    }
    async findOneAndUpdate(filterQuery, update) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true,
        });
        if (!document) {
            this.logger.warn(`Document not found with filterQuery:`, filterQuery);
            throw new common_1.NotFoundException('Document not found.');
        }
        return document;
    }
    async upsert(filterQuery, document) {
        return this.model.findOneAndUpdate(filterQuery, document, {
            lean: true,
            upsert: true,
            new: true,
        });
    }
    async find(filterQuery, limit) {
        if (limit)
            return this.model.find(filterQuery, {}, { lean: true }).limit(limit);
        return this.model.find(filterQuery, {}, { lean: true });
    }
    async paginate(filterQuery, page = 1, limit = 10) {
        return (await this.model.paginate(filterQuery, { page: page, limit: limit, sort: { timestamp: -1 } }));
    }
    async findPaginate(filterQuery, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        try {
            const result = await this.model.find(filterQuery, {})
                .limit(limit)
                .skip(skip)
                .sort({ timestamp: -1 });
            const totalPages = Math.ceil(100000 / limit);
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
        }
        catch (error) {
            (0, console_1.log)(error.message);
        }
    }
    async startTransaction() {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}
exports.AbstractRepository = AbstractRepository;
//# sourceMappingURL=abstract.repository.js.map