import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StatusEpi } from './dto/criar-epi.dto';

@Entity('epis')
export class Epi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  categoria: string;

  @Column({ type: 'int', default: 0 })
  quantidade: number;

  @Column({ type: 'varchar', length: 50 })
  ca: string;

  @Column({ type: 'varchar', length: 20 })
  validade: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'varchar', default: StatusEpi.ATIVO })
  status: string;
}