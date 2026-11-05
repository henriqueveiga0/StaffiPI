import { Controller, Get, Post, Body} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';
import { CriarFuncionarioDto } from './dto/criar-funcionario.dto';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

    @Get()
    async listar(): Promise<Funcionario[]> {
        return this.funcionarioService.findAll();
    }

    @Post()
    async criar(@Body() criarFuncionarioDto: CriarFuncionarioDto): Promise<Funcionario> {
        return this.funcionarioService.create(criarFuncionarioDto);
    }

}