import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Epi } from "./epi.entity";
import { CriarEpiDto } from "./dto/criar-epi.dto";

@Injectable()
export class EpiService {
  constructor(
    @InjectRepository(Epi)
    private epiRepository: Repository<Epi>,
  ) {}

    async findAll(): Promise<Epi[]> {
    return this.epiRepository.find();
  }

    async create(criarEpiDto: CriarEpiDto): Promise<Epi> {
    const epi = this.epiRepository.create(criarEpiDto);
    return this.epiRepository.save(epi);
  }

  async createMany(lista: CriarEpiDto[]): Promise<Epi[]>{
    const epis = this.epiRepository.create(lista);
    return this.epiRepository.save(epis)
  }

}