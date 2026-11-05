import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StatusFuncionario } from './dto/criar-funcionario.dto';

@Entity('funcionarios')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  cargo: string;

  @Column({ type: 'varchar', length: 100 })
  setor: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', default: StatusFuncionario.ATIVO })
  status: string;
}