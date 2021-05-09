import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { concat, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  subscriptions: Subscription[] = [];
  
  searchText;
  searchType;

  constructor(
    private dataService: DataService
  ) { }

  get pokemons(): any[] {
    return this.dataService.pokemons;
  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    if (!this.pokemons.length) {
      this.loadMore();
    }

    this.dataService.getPokemons().subscribe((response: any) => {
      response.results.forEach(result => {
        this.dataService.getMoreData(result.name)
        .subscribe((uniqueResponse: any) =>{
          this.pokemons.push(uniqueResponse);
          console.log(this.pokemons);
        });
      }); 
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }


  loadMore(): void {
    this.loading = true;
    this.subscription = this.dataService.getNext().subscribe(response => {
      this.dataService.next = response.next;
      const details = response.results.map((i: any) => this.dataService.get(i.name));
      this.subscription = concat(...details).subscribe((response: any) => {
        this.dataService.pokemons.push(response);
      });
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  getType(pokemon: any): string {
    return this.dataService.getType(pokemon);
  }

}
