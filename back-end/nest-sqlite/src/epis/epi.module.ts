import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Epi } from "./epi.entity";
import { EpiController } from "./epi.controller";
import { EpiService } from "./epi.service";

@Module({
  imports: [TypeOrmModule.forFeature([Epi])],
  controllers: [EpiController],
    providers: [EpiService],
})
export class EpiModule {}