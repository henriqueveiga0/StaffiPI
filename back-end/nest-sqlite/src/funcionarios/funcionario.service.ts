import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Funcionario } from "./funcionario.entity";
import { CriarFuncionarioDto } from "./dto/criar-funcionario.dto";


@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
  ) {}

    async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find();
  }

    async create(criarFuncionarioDto: CriarFuncionarioDto): Promise<Funcionario> {
  const existe = await this.funcionarioRepository.findOne({
    where: { email: criarFuncionarioDto.email },
  });

  if (existe) {
    throw new ConflictException('Já existe um funcionário com esse e-mail.');
  }

  const funcionario = this.funcionarioRepository.create(criarFuncionarioDto);
  return this.funcionarioRepository.save(funcionario);
}

}