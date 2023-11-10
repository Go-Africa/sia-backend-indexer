export interface BaseMapperOptions {
    include?: string[];
    exclude?: string[];
}
export declare class BaseMapper<D, E> {
    dtoClass: new (entity: E) => D;
    entityClass: new (dto: D) => E;
    constructor(dtoClass: new (entity: E) => D, entityClass: new (dto: D) => E);
    toDto(entity: E, options?: BaseMapperOptions): D;
    toEntity(dto: D, options?: BaseMapperOptions): E;
    toEntities(dtos: D[], options?: BaseMapperOptions): E[];
    toDtos(entities: E[], options?: BaseMapperOptions): D[];
    private applyFieldOptions;
}
