import { Component, OnInit, HostListener } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-icons',
  templateUrl: './modal-icons.component.html',
  styleUrls: ['./modal-icons.component.scss'],
})
export class ModalIconsComponent implements OnInit {

  private defaultIcon = '9';
  private selectedIcon = this.defaultIcon;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.selectedIcon = this.navParams.get('currentIcone');
  }

  @HostListener('document:ionBackButton', ['$event'])
  private async overrideHardwareBackAction($event: any) {
      await this.modalCtrl.dismiss(this.selectedIcon);
  }

  ngOnInit() {}

  exit(icon) {
    if(!icon) {
      icon = this.selectedIcon;
    } 
    this.modalCtrl.dismiss(icon);
  }

  chooseIcon(icon) {
    this.exit(icon);
  }

}
