import { Controller, Get, Post, Body, ParseArrayPipe } from "@nestjs/common";
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
    
    @Post('importar')
    async importar(
        @Body(new ParseArrayPipe({items: CriarEpiDto})) epis: CriarEpiDto[],
    ): Promise<Epi[]> {
        return this.epiService.createMany(epis);
    }

}