import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalIconsComponent } from 'src/app/modal-icons/modal-icons.component';

import { IonicModule } from '@ionic/angular';

import { LicaoAddPage } from './licao-add.page';

const routes: Routes = [
  {
    path: '',
    component: LicaoAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LicaoAddPage, ModalIconsComponent],
  entryComponents: [ModalIconsComponent],
})
export class LicaoAddPageModule {

}
