import { Entry } from './../shared/entry.module';
import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry [];

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      c => this.entries = c.sort((a, b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entry) {
    const deveExcluir = confirm('Deseja realmente excluir este item?');

    if (deveExcluir) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(e => e !== entry),
        () => alert('Erro ao tentar excluir')
      );
    }
  }

}
