import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../service/filme.service';
import { Movie } from '../filme';


@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {
  filmes: Movie[] = [];

  constructor(private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.getFilmes();
  }

  getFilmes(): void {
    this.filmeService.getFilmes()
    .subscribe(filmes => this.filmes = filmes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.filmeService.addFilme({ name } as Movie)
      .subscribe(filme => {
        this.filmes.push(filme);
      });
  }

  delete(filme: Movie): void {
    this.filmes = this.filmes.filter(h => h !== filme);
    this.filmeService.deleteFilme(filme.id).subscribe();
  }

  checkRented() {
    this.filmeService.getFilmesAlugados()
      .subscribe(filmes => this.filmes = filmes)
  }

  ConvertToCSV(objArray: object | string, headerList: string[]): string {
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row = '';
      for (const index in headerList) {
          row += headerList[index] + ', ';
      }
      row = row.slice(0, -1);
      str += row + '\r\n';
      for (let i = 0; i < array.length; i++) {
          let line = (i + 1).toString();
          for (const index in headerList) {
              const head = headerList[index];
              line += ',' + array[i][head];
          }
          str += line + '\r\n';
      }
      return str;
  }

  downloadFile(): void {
    const filmes = this.filmeService.getFilmesAlugados().subscribe(a => {
      let csvData: string = this.ConvertToCSV(a, [
        'id', 
        'name', 
        'rented', 
        'count'
    ]);
    let blob: Blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink: HTMLAnchorElement = document.createElement("a");
    let url: string = URL.createObjectURL(blob);
    let isSafariBrowser: boolean = navigator.userAgent.indexOf('Safari') !== -1 &&
        navigator.userAgent.indexOf('Chrome') === -1;


    if (isSafariBrowser) {
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "startrhFilmes.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
    });
    

    
  }


}