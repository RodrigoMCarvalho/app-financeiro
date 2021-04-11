import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = 'api/entries';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  getById(id: number): Observable<Entry>{
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map((this.jsonDataToEntry))
    );
  }

  create(entry: Entry): Observable<Entry> {

    //Por causa do in-memory que não tem relacionamento de entidades
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        );
      })
    );

    // retorno se tivesse um backend real
    // return this.http.post(this.apiPath, entry).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToEntry)
    // );
  }

  update(entry: Entry): Observable<Entry> {
    //Por causa do in-memory que não tem relacionamento de entidades
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService
      .getById(entry.categoryId).pipe(
        flatMap((category) => {
          entry.category = category;
          return this.http.put(url, entry).pipe(
            catchError(this.handleError),
            map(() => entry) // desta forma devido ao in-memory-database
          );
      }));

    // retorno se tivesse um backend real
    // const url = `${this.apiPath}/${entry.id}`;
    // return this.http.put(url, entry).pipe(
    //   catchError(this.handleError),
    //   map(() => entry)   // desta forma devido ao in-memory-database
    // );
  }

  delete(id: number): Observable<Entry>{
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {

    //console.log(jsonData[0] as Entry);
    //console.log( Object.assign(new Entry(), jsonData[0]));

    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });

    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO =>, ', error);
    return throwError(error);
  }
}
