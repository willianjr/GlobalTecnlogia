import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1627698738625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
              {
                name: '_id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              {
                name: 'name',
                type: 'varchar'
      
              },
              {
                  name: 'email',
                  type: 'varchar',
                  isUnique: true
                  
                },
                {
                    name: 'nivel',
                    type: 'varchar'
        
                },
              {
                name: 'passwordHash',
                type: 'varchar'
      
              },
              {
                name: 'active',
                type: 'boolean'
      
              },
              {
                name: 'createdAt',
                type: 'datetime'
      
              },
              {
                name: 'updatedAt',
                type: 'datetime'
      
              }
            ]
      
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}
