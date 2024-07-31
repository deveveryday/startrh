import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../service/filme.service';
import { Movie } from '../filme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  filmes: Movie[] = [];

  constructor(private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.getFilmes();
  }

  getFilmes(): void {
    this.filmeService.getFilmes()
      .subscribe(filmes => this.filmes = filmes.slice(1, 5));
  }
}