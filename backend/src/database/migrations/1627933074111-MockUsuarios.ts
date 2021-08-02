import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from 'bcryptjs'

export class MockUsuarios1627933074111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			queryRunner
   			.manager
   			.createQueryBuilder()
   			.insert()
   			.into("user")
   			.values([
					 { name: 'Usuário Comum', email:'usuariocomum@teste.com.br', nivel:'usr', passwordHash:bcrypt.hashSync('123456', 8)},
					 { name: 'Usuário Adm', email:'usuarioadm@teste.com.br', nivel:'admin', passwordHash:bcrypt.hashSync('654321', 8)},
					 { name: 'Usuário 1', email:'user1@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 2', email:'user2@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 3', email:'user3@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 4', email:'user4@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 5', email:'user5@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 6', email:'user6@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 7', email:'user7@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 8', email:'user8@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 9', email:'user9@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 10', email:'user10@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 11', email:'user11@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 12', email:'user12@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 13', email:'user13@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 14', email:'user14@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 15', email:'user15@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 16', email:'user16@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 17', email:'user17@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 18', email:'user18@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 19', email:'user19@email.com', nivel:'usr', passwordHash:bcrypt.hashSync('1q2w3e4r', 8)},
					 { name: 'Usuário 20', email:'user20@email.com', nivel:'admin', passwordHash:bcrypt.hashSync('1q2w3e4r',8) }

					])
   			.execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.manager.createQueryBuilder().delete().from("user");
    }

}
