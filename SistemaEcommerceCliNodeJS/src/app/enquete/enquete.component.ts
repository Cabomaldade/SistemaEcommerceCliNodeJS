import { CelularDataService } from './celular-data.service';
import { Celular } from './celulares';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enquete',
  templateUrl: './enquete.component.html',
  styleUrls: ['./enquete.component.css']
})
export class EnqueteComponent implements OnInit {

  celulares: Celular[] = [];

  celular: Celular = new Celular();
  enqueteDataService: any;

  constructor(private celularDataService: CelularDataService) { }

  ngOnInit() {
    this.celulares = [{
      'id': 1,
      'marca': 'Motorola',
      'like': 1,
      'dislike': 1
    },
    {
      'id': 2,
      'marca': 'Samsung',
      'like': 1,
      'dislike': 2
    },
    {
      'id': 3,
      'marca': 'Nokia',
      'like': 1,
      'dislike': 2
    },
    {
      'id': 4,
      'marca': 'Xiome',
      'like': 10,
      'dislike': 2
    },
    {
      'id': 5,
      'marca': 'Iphone',
      'like': 5,
      'dislike': 3
    }
    ];

  }

  get Celulares(){
    return this.enqueteDataService.getAllCelulares();
  }

  likeUp(celular: Celular){
    celular.like ++;
  }
  dislikeUp(celular: Celular){
    celular.dislike ++;
  }

}
