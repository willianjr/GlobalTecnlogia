import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import { IsBooleanString, IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import bcrypt from 'bcryptjs'

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  _id:string;

  @Column('varchar', { length: 50 })
  @MinLength(2, { message: 'Favor inserir no mínimo $constraint1 caracteres' })
  @MaxLength(50, { message: 'Favor inserir no máximo $constraint1 caracteres' })
  name: string;

  @Column('varchar', { length: 150 })
  @IsEmail({}, { message: 'Favor fornecer um email válido' })
  @MaxLength(150, { message: 'Favor inserir no máximo $constraint1 caracteres' })
  email: string;

  @Column('varchar', { length: 150 })
  @IsString({ message: 'Favor informar uma senha' })
  @MinLength(2, { message: 'Favor inserir uma senha com no mínimo $constraint1 caracteres' })
  @MaxLength(150, { message: 'Favor inserir uma senha com no máximo $constraint1 caracteres' })
  passwordHash: string;

  @Column('varchar', { length: 20 })
  @MinLength(2, { message: 'Favor inserir no mínimo $constraint1 caracteres' })
  @MaxLength(20, { message: 'Favor inserir no máximo $constraint1 caracteres' })
  nivel: string;

  @Column()
  @IsBooleanString({ message: 'Favor fornecer um valor boleano, "true" ou "false"' })
  active: boolean;

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword ():void {
    this.passwordHash = this.passwordHash && bcrypt.hashSync(this.passwordHash, 8)
  }
}
