import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum StatusFuncionario {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
}

export class CriarFuncionarioDto {
  @IsString({ message: 'O nome precisa ser um texto válido.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @MaxLength(150, { message: 'O nome não pode ter mais de 150 caracteres.' })
  nome: string;

  @IsString({ message: 'O cargo precisa ser um texto válido.' })
  @IsNotEmpty({ message: 'O cargo não pode estar vazio.' })
  @MaxLength(100, { message: 'O cargo não pode ter mais de 100 caracteres.' })
  cargo: string;

  @IsString({ message: 'O setor precisa ser um texto válido.' })
  @IsNotEmpty({ message: 'O setor não pode estar vazio.' })
  @MaxLength(100, { message: 'O setor não pode ter mais de 100 caracteres.' })
  setor: string;

  @IsString({ message: 'O email precisa ser um texto válido.' })
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  @MaxLength(150, { message: 'O email não pode ter mais de 150 caracteres.' })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, { message: 'O telefone não pode ter mais de 20 caracteres.' })
  telefone?: string;

  @IsEnum(StatusFuncionario, { message: 'O status precisa ser "ativo" ou "inativo".' })
  @IsOptional()
  status?: StatusFuncionario;

}