import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { LoginDto } from './dto/login.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async listar() {
    return this.usuarioService.findAll();
  }

  @Post()
  async criar(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.usuarioService.create(criarUsuarioDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return this.usuarioService.login(loginDto);
  }
}