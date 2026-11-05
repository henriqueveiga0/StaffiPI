import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { Funcionario } from './funcionarios/funcionario.entity';
import { FuncionarioModule } from './funcionarios/funcionario.module';
import { Risco } from './riscos/risco.entity';
import { RiscoModule } from './riscos/risco.module';
import { Epi } from './epis/epi.entity';
import { EpiModule } from './epis/epi.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Usuario, Funcionario, Risco, Epi],
        synchronize: true,
      }),
    }),
    UsuarioModule,
    FuncionarioModule,
    RiscoModule,
    EpiModule,
  ],
})
export class AppModule {}