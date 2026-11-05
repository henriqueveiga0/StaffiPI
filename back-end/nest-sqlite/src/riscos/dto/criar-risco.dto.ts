import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum CriticidadeRisco {
  BAIXO = 'baixo',
  MEDIO = 'medio',
  ALTO = 'alto',
  CRITICO = 'critico',
}

export class CriarRiscoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do risco é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O local do risco é obrigatório' })
  local: string;

  @IsEnum(CriticidadeRisco, { message: 'Criticidade inválida' })
  @IsNotEmpty({ message: 'A criticidade é obrigatória' })
  criticidade: CriticidadeRisco;

  @IsString()
  @IsOptional()
  descricao?: string;
}