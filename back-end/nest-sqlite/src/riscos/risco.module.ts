import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Risco } from "./risco.entity";
import { RiscoController } from "./risco.controller";
import { RiscoService } from "./risco.service";

@Module({
  imports: [TypeOrmModule.forFeature([Risco])],
  controllers: [RiscoController],
    providers: [RiscoService],
})
export class RiscoModule {}