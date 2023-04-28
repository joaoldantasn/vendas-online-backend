import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  //passa esse parametro pq vai pegar todas as cidades de um estado especifico
  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const citiesCache: CityEntity[] = await this.cacheManager.get(
      `state_${stateId}`,
    );

    if (citiesCache) {
      return citiesCache;
    }
    const cities = await this.cityRepository.find({
      where: {
        // mesma coisa de comparar stateId daqui com stateId de estado
        stateId,
      },
    });
    await this.cacheManager.set(`state_${stateId}`, cities);
    return cities;
  }
}
