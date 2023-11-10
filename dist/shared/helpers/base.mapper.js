"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMapper = void 0;
class BaseMapper {
    constructor(dtoClass, entityClass) {
        this.dtoClass = dtoClass;
        this.entityClass = entityClass;
    }
    toDto(entity, options) {
        const dto = new this.dtoClass(entity);
        return this.applyFieldOptions(dto, options);
    }
    toEntity(dto, options) {
        const entity = new this.entityClass(dto);
        return this.applyFieldOptions(entity, options);
    }
    toEntities(dtos, options) {
        return dtos.map(dto => this.toEntity(dto, options));
    }
    toDtos(entities, options) {
        return entities.map(entity => this.toDto(entity, options));
    }
    applyFieldOptions(obj, options) {
        if (options && options.include) {
            const includedFields = options.include;
            for (const key in obj) {
                if (!includedFields.includes(key)) {
                    delete obj[key];
                }
            }
        }
        else if (options && options.exclude) {
            const excludedFields = options.exclude;
            for (const key in obj) {
                if (excludedFields.includes(key)) {
                    delete obj[key];
                }
            }
        }
        return obj;
    }
}
exports.BaseMapper = BaseMapper;
//# sourceMappingURL=base.mapper.js.map