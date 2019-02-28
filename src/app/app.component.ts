import { Component } from '@angular/core';
import {APIService} from "./api.service";
import { SWITCH_INJECTOR_FACTORY__POST_R3__ } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private foods = [];
  private monFoods = [];
  private dinner = {location:{}, image_url:"", transactions: [], rating: 0}; //avoid errors thats why its here
  private ratingView: string;
  private transaction: boolean;
  private dinnerDone: boolean;

  private ratings = [
    {value: 1, view: "⭐"} ,
    {value: 2, view: "⭐⭐"},
    {value: 3, view: "⭐⭐⭐"},
    {value: 4, view: "⭐⭐⭐⭐"},
    {value: 5, view: "⭐⭐⭐⭐⭐"}
  ]

  constructor(private apiService: APIService) {}

  ngOnInit() {}

  sendFetch(input: string, price: string){
    event.preventDefault();
    this.transaction = false;
    this.dinnerDone = false;
    this.apiService.sendFetchService(input).subscribe(data => {
      //console.log(data); //general layout for fetch request
      this.foods = data.businesses
      console.log(this.foods);
      this.sortArr(price);
    })
    //console.log("AYE wasss",input, price);
  }
  sortArr(price: string){
    //console.log("sortArr", price);
    for(let res of this.foods){
      if(res.price == price && res.is_closed == false){ //if restaurant is open and have same price user put in
        this.monFoods.push(res); //set up monFoods variable

      }
    }
    console.log(this.monFoods);
    this.displayRes();
  }
  displayRes(){
   this.dinner = this.monFoods[Math.floor(Math.random() * this.monFoods.length)]
   console.log(this.dinner);

   for(let star of this.ratings){
     if(star.value == Math.round(this.dinner.rating)){
       this.ratingView = star.view;
     }
   }

   for(let tran of this.dinner.transactions){
    if(tran == "delivery"){
      this.transaction = true;
    }
   }
   this.dinnerDone = true
   this.foods = [];
   this.monFoods = [];
  }
  
}
