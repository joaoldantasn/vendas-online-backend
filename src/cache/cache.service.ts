import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  //passa esse parametro pq vai pegar todas as cidades de um estado especifico
  async getCache<T>(
    key: string,
    functionRequest: () => Promise<T>,
  ): Promise<T> {
    const allData: T = await this.cacheManager.get(key);

    if (allData) {
      return allData;
    }

    const cities: T = await functionRequest();
    await this.cacheManager.set(key, cities);
    return cities;
  }
}
