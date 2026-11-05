import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEnum, Min } from 'class-validator';

export enum StatusEpi {
  ATIVO = 'Ativo',
  DEVOLVIDO = 'Devolvido',
  DANIFICADO = 'Danificado',
}

export class CriarEpiDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do EPI é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  categoria: string;

  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @Min(0)
  quantidade: number;

  @IsString()
  @IsNotEmpty({ message: 'O número do CA é obrigatório' })
  ca: string;

  @IsString()
  @IsNotEmpty({ message: 'A validade é obrigatória' })
  validade: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsEnum(StatusEpi)
  @IsOptional()
  status?: StatusEpi;
}