import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Risco } from "./risco.entity";
import { CriarRiscoDto } from "./dto/criar-risco.dto";

@Injectable()
export class RiscoService {
  constructor(
    @InjectRepository(Risco)
    private riscoRepository: Repository<Risco>,
  ) {}

    async findAll(): Promise<Risco[]> {
    return this.riscoRepository.find();
  }

    async create(criarRiscoDto: CriarRiscoDto): Promise<Risco> {
    const risco = this.riscoRepository.create(criarRiscoDto);
    return this.riscoRepository.save(risco);
  }

}