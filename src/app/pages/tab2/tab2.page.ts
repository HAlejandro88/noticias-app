import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology',];
  noticias: Article[] = [];

  constructor(private noticiasServices: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value);
  }

  cambioCategoria(event){
    this.noticias = [];
    
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string){
    this.segment.value = this.categorias[0];
    this.noticiasServices.getTopHeadlinesCategoria(categoria).subscribe(resp =>{
      console.log(resp);
      this.noticias.push(...resp.articles);
    });
  }

}
