import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarefasService, Tarefa } from 'src/app/services/tarefas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarefas-add',
  templateUrl: './tarefas-add.page.html',
  styleUrls: ['./tarefas-add.page.scss'],
  providers: [TarefasService]
})
export class TarefasAddPage implements OnInit {

  isEditing: Boolean = false;
  idLicao: Number = 0;
  idTarefa: Number = 0;
  formGroup: FormGroup;
  prioridade: Number = 1;

  constructor(private navCtrl: NavController, private actRoute: ActivatedRoute, private form: FormBuilder,
      private tarefasService: TarefasService) {

    this.actRoute.queryParams.subscribe((result) => {
      this.idLicao = result['idLicao'];
      if(result['idTarefa']) {
        this.idTarefa = result['idTarefa'];
        this.isEditing = true;
        this.getTarefa();
      } 
    })


    this.formGroup = this.form.group({
      id: [this.idTarefa],
      idLicao: [this.idLicao],
      titulo: ['', Validators.required],
      descricao: [''],
      prioridade: [this.prioridade],
      status: 0,
    });

  }

  ngOnInit() {

  }

  back() {
    this.navCtrl.back();
  }

  setPrioridade(number) {
    this.prioridade = number;
  }

  normalizeFormGroup() {
    this.formGroup.get('prioridade').setValue(this.prioridade);
    this.formGroup.get('idLicao').setValue(this.idLicao);
  }

  async getTarefa() {

    let tarefa = await this.tarefasService.getTarefa(this.idTarefa);

    this.formGroup = this.form.group({
      id: tarefa.id,
      idLicao: tarefa.idLicao,
      titulo: [tarefa.titulo, Validators.required],
      descricao: tarefa.descricao,
      prioridade: tarefa.prioridade,
      status: tarefa.status,
    });

    this.prioridade = tarefa.prioridade;

  }

  editTarefa() {

    this.normalizeFormGroup();

    let tarefa: Tarefa = this.formGroup.getRawValue();
    this.tarefasService.editTarefa(tarefa).then(res => {
      if(res === true) {
        this.back();
      } else {
        console.log('editTarefa, returned ' + res);
      }
    });

  }

  addTarefa() {

    this.normalizeFormGroup();

    let tarefa: Tarefa = this.formGroup.getRawValue();
    this.tarefasService.addTarefa(tarefa).then(res => {
      if(res === true) {
        this.back();
      } else {
        console.log('addTarefa, returned ' + res);
      }
    });

  }


}
