import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavOptions } from '@ionic/core';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';
import { TarefasService, Tarefa } from '../services/tarefas.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
  providers: [TarefasService]
})
export class TarefasPage implements OnInit {

  private idLicao: Number = 0;
  tarefas: Tarefa[] = [];

  constructor(private navCtrl: NavController, private actRoute: ActivatedRoute, private tarefasService: TarefasService) { 

    this.actRoute.queryParams.subscribe((result) => {
      this.idLicao = result['id'];
    })

  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.loadTarefas();
  }

  back() {
    this.navCtrl.back();
  }

  loadTarefas() {
    this.tarefasService.getAllTarefas(this.idLicao).then(res => {
      this.tarefas = res;
    });
  }

  changeStatus(tarefa) {

    let idTarefa = tarefa.id;
    let statusAtual = tarefa.status;

    let novoStatus = statusAtual == 0 ? 1 : 0;
    tarefa.status = novoStatus;
    this.tarefasService.changeStatus(idTarefa, novoStatus).then(res => {
      //nothing to do here, at this time
    });

  }

  editTarefa(idTarefa) {
    
    let options: NavigationOptions = {
      queryParams: {
        idLicao: this.idLicao,
        idTarefa: idTarefa,
      }
    }

    this.navCtrl.navigateForward('/tarefas-add', options);

  }

  addTarefa() {

    let options: NavigationOptions = {
      queryParams: {
        idLicao: this.idLicao
      }
    }

    this.navCtrl.navigateForward('/tarefas-add', options);
  }

  deleteTarefa(idTarefa) {
    this.tarefasService.deleteTarefa(idTarefa).then(res => {
      this.loadTarefas();
    });
  }


}
