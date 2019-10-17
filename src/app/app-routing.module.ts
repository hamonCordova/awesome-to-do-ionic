import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'licoes', pathMatch: 'full' },
  { path: 'licoes', loadChildren: './licoes/licoes.module#LicoesPageModule' },
  { path: 'licao-add', loadChildren: './licoes/licao-add/licao-add.module#LicaoAddPageModule' },
  { path: 'tarefas', loadChildren: './tarefas/tarefas.module#TarefasPageModule' },
  { path: 'tarefas-add', loadChildren: './tarefas/tarefas-add/tarefas-add.module#TarefasAddPageModule' },
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
