import { Controller, Get, Post, Body } from '@nestjs/common';
import { RiscoService } from './risco.service';
import { Risco } from './risco.entity';
import { CriarRiscoDto } from './dto/criar-risco.dto';

@Controller('riscos')
export class RiscoController {
  constructor(private readonly riscoService: RiscoService) {}

    @Get()
    async findAll(): Promise<Risco[]> {
    return this.riscoService.findAll();
  }

    @Post()
    async create(@Body() criarRiscoDto: CriarRiscoDto): Promise<Risco> {
    return this.riscoService.create(criarRiscoDto);
  }

}