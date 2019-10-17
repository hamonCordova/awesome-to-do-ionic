import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { ModalIconsComponent } from 'src/app/modal-icons/modal-icons.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LicaoService, Licao } from '../../services/licao/licao.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-licao-add',
  templateUrl: './licao-add.page.html',
  styleUrls: ['./licao-add.page.scss'],
  providers: [
    LicaoService,
    DatePicker
  ]
})
export class LicaoAddPage implements OnInit {

  public isEditing: Boolean = false;
  public idLicao: Number = 0;
  public licaoEditing: Licao;
  public licaoForm: FormGroup;
  public defaultIcone: String = '9';
  public icone: String = this.defaultIcone;
  public prioridade: Number = 1;
  public dataMax = 'Indeterminado';

  constructor(private actRoute: ActivatedRoute, private navController: NavController, private datePicker: DatePicker, private modalCtrl: ModalController,
    private formBuilder: FormBuilder, private licaoService: LicaoService) {

    actRoute.queryParams.subscribe(params => {
      
      if(params['edit']) { 
        this.isEditing = params['edit'];
        this.idLicao = params['id'];  
        this.getLicaoEditing();
      }

    });


    this.licaoForm = this.formBuilder.group({
      id: 0,
      icone: [this.icone],
      dataMax: [this.dataMax],
      titulo: ['', Validators.compose([
        Validators.required
      ])],
      descricao: [''],
      prioridade: [this.prioridade]
    })

  }

  ngOnInit() {
  }

  back() {
    this.navController.back();
  }

  setPrioridade(number) {
    this.prioridade = number;
  }

  async getLicaoEditing() {

    let licao = await this.licaoService.getLicaoById(this.idLicao);
    this.licaoForm.setValue({id: this.idLicao, 
          icone: licao.icone, 
          dataMax: licao.dataMax,
          titulo: licao.titulo,
          descricao: licao.descricao,
          prioridade: licao.prioridade});
    
    this.setPrioridade(licao.prioridade);
    this.icone = licao.icone + '';
    this.dataMax = licao.dataMax;

  }

  async showModalChooseIcon() {
    
    const modal = await this.modalCtrl.create({
      component: ModalIconsComponent,
      componentProps: {
        currentIcone: this.icone
      }
    });

    modal.onDidDismiss().then((data) => {
      this.icone = data['data'] + '';
      
    });

    await modal.present();
  }

  showDatePicker() {
    
    this.datePicker.show({
      date: new Date(),
      minDate: new Date().getTime(),
      mode: 'datetime',  
      locale: 'pt_BR',
      is24Hour: true,
      todayText: 'Agora',
      nowText: 'Nesse Momento',  
      cancelText: 'Cancelar',
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    }).then(
      date => {
        this.dataMax = date.toLocaleString('pt-BR');
      },
      err => {
        console.log('showDatePicker error ' + err);
      }
    );

  }

  addLicao() {

    this.licaoForm.get('dataMax').setValue(this.dataMax);
    this.licaoForm.get('icone').setValue(this.icone);
    this.licaoForm.get('prioridade').setValue(this.prioridade);

    this.licaoService.insertLicao(this.licaoForm.value).then((r) => {
      if(r) {
        this.navController.back();
      }
    });
   
    
  }

  editarLicao() {

    this.licaoForm.get('dataMax').setValue(this.dataMax);
    this.licaoForm.get('icone').setValue(this.icone);
    this.licaoForm.get('prioridade').setValue(this.prioridade);

    this.licaoService.updateLicao(this.licaoForm.value).then((r) => {
      if(r) {
        this.navController.back();
      }
    });
   
    
  }

}
