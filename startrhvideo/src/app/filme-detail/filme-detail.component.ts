import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie } from '../filme';
import { FilmeService } from '../service/filme.service';

@Component({
  selector: 'app-filme-detail',
  templateUrl: './filme-detail.component.html',
  styleUrls: [ './filme-detail.component.css' ]
})
export class FilmeDetailComponent implements OnInit {
  filme: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFilme();
  }

  getFilme(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.filmeService.getFilme(id)
      .subscribe(filme => this.filme = filme);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.filme && this.filme.count > 0) {
      this.filme.rented = true;
      this.filme.count--;
      this.filmeService.updateFilme(this.filme)
        .subscribe(() => this.goBack());
    }
  }

  devolve(): void {
    if (this.filme) {
      this.filme.rented = false;
      this.filme.count++;
      this.filmeService.updateFilme(this.filme)
        .subscribe(() => this.goBack());
    }
  }
}