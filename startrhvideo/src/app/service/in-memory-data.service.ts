import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from '../filme';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const filmes = [
      { id: 12, name: 'Dr. Nice', count: 2 },
      { id: 13, name: 'Bombasto', count: 2 },
      { id: 14, name: 'Celeritas', count: 2 },
      { id: 15, name: 'Magneta', count: 2 },
      { id: 16, name: 'RubberMan', count: 2 },
      { id: 17, name: 'Dynama', count: 2 },
      { id: 18, name: 'Dr. IQ', count: 2 },
      { id: 19, name: 'Magma', count: 2 },
      { id: 20, name: 'Tornado', count: 2 }
    ];

    const user = {

    }
    return {filmes, user};
  }

  genId(filmes: Movie[]): number {
    return filmes.length > 0 ? Math.max(...filmes.map(filme => filme.id)) + 1 : 11;
  }
}