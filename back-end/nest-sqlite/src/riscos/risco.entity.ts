import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('riscos')
export class Risco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  local: string;

  @Column({ type: 'varchar', length: 20 })
  criticidade: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;
}