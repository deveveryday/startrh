import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

import { Movie } from '../filme';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class FilmeService {

  private filmesUrl = 'api/filmes';  // URL web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  getFilmes(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.filmesUrl)
      .pipe(
        tap(_ => this.log('fetched filmes')),
        catchError(this.handleError<Movie[]>('getfilmes', []))
      );
  }

  getFilmesAlugados(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.filmesUrl)
      .pipe(
        map((data) => data.filter(filme => filme.rented)),
        tap(_ => this.log('fetched filmes')),
        catchError(this.handleError<Movie[]>('getfilmes', []))
      );
  }

  getFilmeNo404<Data>(id: number): Observable<Movie> {
    const url = `${this.filmesUrl}/?id=${id}`;
    return this.http.get<Movie[]>(url)
      .pipe(
        map(filmes => filmes[0]), 
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} filme id=${id}`);
        }),
        catchError(this.handleError<Movie>(`getfilme id=${id}`))
      );
  }


  getFilme(id: number): Observable<Movie> {
    const url = `${this.filmesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched filme id=${id}`)),
      catchError(this.handleError<Movie>(`getfilme id=${id}`))
    );
  }


  searchFilmes(term: string): Observable<Movie[]> {
    if (!term.trim()) {
   
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.filmesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found filmees matching "${term}"`) :
         this.log(`no filmees matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchfilmees', []))
    );
  }


  addFilme(filme: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.filmesUrl, filme, this.httpOptions).pipe(
      tap((newfilme: Movie) => this.log(`added filme w/ id=${newfilme.id}`)),
      catchError(this.handleError<Movie>('addfilme'))
    );
  }


  deleteFilme(id: number): Observable<Movie> {
    const url = `${this.filmesUrl}/${id}`;

    return this.http.delete<Movie>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted filme id=${id}`)),
      catchError(this.handleError<Movie>('deletefilme'))
    );
  }


  updateFilme(filme: Movie): Observable<any> {
    return this.http.put(this.filmesUrl, filme, this.httpOptions).pipe(
      tap(_ => this.log(`updated filme id=${filme.id}`)),
      catchError(this.handleError<any>('updatefilme'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }


  private log(message: string) {
    this.messageService.add(`filmeService: ${message}`);
  }
}