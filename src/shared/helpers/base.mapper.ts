export interface BaseMapperOptions {
    include?: string[];
    exclude?: string[];
  }
  
  export class BaseMapper<D, E> {
    dtoClass: new (entity: E) => D;
    entityClass: new (dto: D) => E;
  
    constructor(dtoClass: new (entity: E) => D, entityClass: new (dto: D) => E) {
      this.dtoClass = dtoClass;
      this.entityClass = entityClass;
    }
  
    toDto(entity: E, options?: BaseMapperOptions): D {
      const dto = new this.dtoClass(entity);
      return this.applyFieldOptions(dto, options);
    }
  
    toEntity(dto: D, options?: BaseMapperOptions): E {
      const entity = new this.entityClass(dto);
      return this.applyFieldOptions(entity, options);
    }
  
    toEntities(dtos: D[], options?: BaseMapperOptions): E[] {
      return dtos.map(dto => this.toEntity(dto, options));
    }
  
    toDtos(entities: E[], options?: BaseMapperOptions): D[] {
      return entities.map(entity => this.toDto(entity, options));
    }
  
    private applyFieldOptions<T>(obj: T, options?: BaseMapperOptions): T {
      if (options && options.include) {
        const includedFields = options.include;
        for (const key in obj) {
          if (!includedFields.includes(key)) {
            delete (obj as any)[key];
          }
        }
      } else if (options && options.exclude) {
        const excludedFields = options.exclude;
        for (const key in obj) {
          if (excludedFields.includes(key)) {
            delete (obj as any)[key];
          }
        }
      }
      return obj;
    }
  }
  