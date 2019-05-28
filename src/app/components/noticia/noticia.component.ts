import { Component, OnInit, Input } from '@angular/core';


import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Article } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';



@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;


  constructor(private iab: InAppBrowser, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, private datalocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    //console.log('noticia',this.noticia.url);
    const browser = this.iab.create(this.noticia.url,'_system')
    
  }

  async lanzarMenu(){

    let guardarBorrar;

    if(this.enFavoritos){
      guardarBorrar = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass:'action-dark',
        handler: () => {
          console.log('Borrar d efavorito');
          this.datalocalService.borrarNoticia(this.noticia);
        }
      };
    }else{
     guardarBorrar = {
        text: 'Favorito',
        icon: 'star',
        cssClass:'action-dark',
        handler: () => {
          console.log('favorito');
          this.datalocalService.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.noticia.title,this.noticia.source.name,'',this.noticia.url);
        }
      }, 
      guardarBorrar,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass:'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
