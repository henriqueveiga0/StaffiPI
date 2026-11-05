import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly UsuarioService: UsuarioService) {}

  @Get()
  async listar(): Promise<Usuario[]> {
    return this.UsuarioService.findAll();
  }

  @Post()
  async criar(@Body() criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    return this.UsuarioService.create(criarUsuarioDto);
  }
}
