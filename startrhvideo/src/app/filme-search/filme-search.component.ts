import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Movie } from '../filme';
import { FilmeService } from '../service/filme.service';

@Component({
  selector: 'app-filme-search',
  templateUrl: './filme-search.component.html',
  styleUrls: [ './filme-search.component.css' ]
})
export class FilmeSearchComponent implements OnInit {
  filmes$!: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private filmeService: FilmeService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.filmes$ = this.searchTerms.pipe(
    
      debounceTime(300),

     
      distinctUntilChanged(),

     
      switchMap((term: string) => this.filmeService.searchFilmes(term)),
    );
  }
}