import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pokemons : any[] = [];
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    
    for (let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      if (key!= null) {
        console.log(key);
        this.dataService.getMoreData(key).subscribe((response: any) =>{
          this.pokemons.push(response);
          console.log(this.pokemons);
        }

      )};
    }
      
      
      
    
  }
  getType(pokemon: any): string {
    return this.dataService.getType(pokemon);
  }

}
