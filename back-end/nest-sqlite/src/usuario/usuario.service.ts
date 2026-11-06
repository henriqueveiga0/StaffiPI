import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  // Lista sem devolver a senha
  async findAll() {
    return this.usuarioRepository.find({ select: ['id', 'nome', 'email'] });
  }

  async create(criarUsuarioDto: CriarUsuarioDto) {
    const existe = await this.usuarioRepository.findOne({
      where: { email: criarUsuarioDto.email },
    });

    if (existe) {
      throw new ConflictException('Já existe um usuário com esse e-mail.');
    }

    // O 10 é o "custo" do hash: quanto maior, mais lento (e mais seguro)
    const senhaCriptografada = await bcrypt.hash(criarUsuarioDto.senha, 10);

    const usuario = this.usuarioRepository.create({
      ...criarUsuarioDto,
      senha: senhaCriptografada,
    });
    const salvo = await this.usuarioRepository.save(usuario);

    return { id: salvo.id, nome: salvo.nome, email: salvo.email };
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: loginDto.email },
    });

    const senhaCorreta =
      usuario && (await bcrypt.compare(loginDto.senha, usuario.senha));

    // Mesma mensagem para e-mail errado e senha errada, de propósito
    if (!usuario || !senhaCorreta) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
  }
}