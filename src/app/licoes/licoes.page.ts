import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LicaoService, Licao } from '../services/licao/licao.service';
import { NavigationExtras } from '@angular/router';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';

@Component({
  selector: 'app-licoes',
  templateUrl: './licoes.page.html',
  styleUrls: ['./licoes.page.scss'],
  providers: [
    LicaoService
  ]

})
export class LicoesPage implements OnInit {

  licoes: Licao[];

  constructor(private navCtrl: NavController, private licaoService: LicaoService) {
     
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.loadLicoes();
  }

  loadLicoes() {
    this.licaoService.getAllLicoes().then((data) => {
      this.licoes = data;
    })
  }

  showLicao(id) {

    let options: NavigationExtras = {
      queryParams: {
        id: id,
        edit: true,
      }
    }

    this.navCtrl.navigateForward('/licao-add', options);
  }

  showTarefas(id) {

    let options: NavigationExtras = {
      queryParams: {
        id: id,
      }
    } 

    this.navCtrl.navigateForward('/tarefas', options);

  }

  addLicao() {
    this.navCtrl.navigateForward('/licao-add');
  }

  deleteLicao(id) {
   this.licaoService.deleteLicao(id).then((res) => {
      this.loadLicoes();
   });
  }

}
