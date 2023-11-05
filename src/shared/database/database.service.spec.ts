import { log } from 'console';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let databaseService: DatabaseService;

  beforeEach(() => {
    databaseService = new DatabaseService();
  });

  afterEach(async () => {
    await databaseService.$disconnect();
  });

  it('should connect to the database on module initialization', async () => {
        // Act
        // const result = await databaseService.$queryRaw();
        const result = await databaseService.$queryRaw`SELECT 1`;
        log("result: ",  result)
        // Assert
        expect(result).toEqual([{ '?column?': 1 }]);
  });
});
