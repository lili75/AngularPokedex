import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string = environment.apiUrl + 'pokemon/';
  private _pokemons: any[] = [];
  private _next: string = '';

  
  constructor(
    private http: HttpClient
  ) { }

  get pokemons(): any[] {
    return this._pokemons;
  }
  
  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  get(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get<any>(url);
  }

  getNext(): Observable<any> {
    const url = this.next === '' ? `${this.url}?limit=400` : this.next;
    return this.http.get<any>(url);
  }

  getEvolution(id: number): Observable<any> {
    const url = `${environment.apiUrl}evolution-chain/${id}`;
    return this.http.get<any>(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `${environment.apiUrl}pokemon-species/${name}`;
    return this.http.get<any>(url);
  }
  //Get pokemons
  getPokemons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=400`)

  }

  //Get More Pokemons data
  getMoreData(name: string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  }
  
  

  
  

}
