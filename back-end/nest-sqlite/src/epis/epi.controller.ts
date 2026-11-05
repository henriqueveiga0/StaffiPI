import { Controller, Get, Post, Body } from "@nestjs/common";
import { EpiService } from "./epi.service";
import { Epi } from "./epi.entity";
import { CriarEpiDto } from "./dto/criar-epi.dto";

@Controller('epis')
export class EpiController {
  constructor(private readonly epiService: EpiService) {}

    @Get()
    async listar(): Promise<Epi[]> {
        return this.epiService.findAll();
    }

    @Post()
    async criar(@Body() criarEpiDto: CriarEpiDto): Promise<Epi> {
        return this.epiService.create(criarEpiDto);
    }

}