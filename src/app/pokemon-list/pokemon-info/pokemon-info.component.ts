import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent implements OnInit {

  pokemon : any =null;

  subscriptions: Subscription[] = [];

  @Input() captured: string;
  name : string = "";

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,) { }

    set subscription(subscription: Subscription) {
      this.subscriptions.push(subscription);
    }

  ngOnInit(): void {

    this.subscription = this.route.params.subscribe(params => {

      if (this.dataService.pokemons.length) {
        this.pokemon = this.dataService.pokemons.find(i => i.name === params.name);
        if (this.pokemon) {
          this.getEvolution();
          return;
        }
      }

      this.subscription = this.dataService.get(params.name).subscribe(response => {
        this.pokemon = response;
        this.getEvolution();
      }, error => console.log('Error Occurred:', error));
    });
    this.name = String(this.route.snapshot.paramMap.get('name'))
    this.dataService.getMoreData(this.name).subscribe((response: any) =>{
      this.pokemon.push(response);
      console.log(this.pokemon);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
      this.pokemon.evolutions = [];
      this.subscription = this.dataService.getSpecies(this.pokemon.name).subscribe(response => {
        const id = this.getId(response.evolution_chain.url);
        this.subscription = this.dataService.getEvolution(id).subscribe(response => this.getEvolves(response.chain));
      });
    }
  }

  getEvolves(chain: any) {
    this.pokemon.evolutions.push({
      id: this.getId(chain.species.url),
      name: chain.species.name
    });

    if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
    }
  }

  getCapture() {
    return localStorage.getItem(this.name)
  }

  setCapture() {
    localStorage.setItem(this.name, 'Yes')
    
    console.log(localStorage.getItem(this.name))
    return localStorage.getItem(this.name);
  }

  getType(pokemon: any): string {
    return this.dataService.getType(pokemon);
  }

  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }

}
