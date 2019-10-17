import { Injectable } from '@angular/core';
import { DatabaseService } from './database/database.service';

export interface Tarefa {
    id: Number,
    idLicao: Number,
    titulo: String,
    descricao: String,
    prioridade: Number,
    status: Number
} 

@Injectable({
  providedIn: 'root'
})

export class TarefasService {

  constructor(private databaseService: DatabaseService) { 
  }

  async addTarefa(tarefa: Tarefa): Promise<boolean> {

    return this.databaseService.getDatabase().then(db => {
  
      return db.executeSql("INSERT INTO tarefas (id_licao, titulo, descricao, prioridade, status) VALUES (?, ?, ?, ?, ?)",
          [tarefa.idLicao, tarefa.titulo, tarefa.descricao, tarefa.prioridade, tarefa.status]).then(
            res => {
              return true;
            }, err => {
              return false;
          });

    }).catch(err => {
      return false;
    });

  }

  async editTarefa(tarefa: Tarefa): Promise<boolean> {

    return this.databaseService.getDatabase().then(db => {
  
      return db.executeSql("UPDATE tarefas SET titulo = ?, descricao = ?, prioridade = ? WHERE id = ?",
          [tarefa.titulo, tarefa.descricao, tarefa.prioridade, tarefa.id]).then(
            res => {
              return true;
            }, err => {
              return false;
          });

    }).catch(err => {
      return false;
    });
  }

  async getAllTarefas(idLicao: Number): Promise<Tarefa[]> {

    return this.databaseService.getDatabase().then(db => {

      return db.executeSql("SELECT id, id_licao AS idLicao, titulo, descricao, prioridade, status FROM tarefas WHERE id_licao = ?",
         [idLicao]).then(
          res => {

            let length = res.rows.length;
            let tarefas: Tarefa[] = [];
            for(let i = 0; i < length; i++) {
              tarefas.push(res.rows.item(i));
            }

            return tarefas;
          },
          err => {
            console.log(err);
            return null;
         });

    }).catch(err => {
      return false;
    });

  }

  async getTarefa(idTarefa: Number): Promise<Tarefa> {

    return this.databaseService.getDatabase().then(db => {
      
      return db.executeSql('SELECT id, id_licao AS idLicao, titulo, descricao, prioridade, status FROM tarefas WHERE id = ?', [idTarefa])
          .then(res => {

            return res.rows.item(0);

          });

    })

  } 

  async changeStatus(idTarefa, novoStatus): Promise<boolean> {

    return this.databaseService.getDatabase().then(db => {
      return db.executeSql("UPDATE tarefas SET status = ? WHERE id = ?", [novoStatus, idTarefa]).then(res => {
        return true;
      });
    });

  }

  async deleteTarefa(idTarefa): Promise<boolean> {
    
    return this.databaseService.getDatabase().then(db => {
      return db.executeSql("DELETE FROM tarefas WHERE id = ?", [idTarefa]).then(res => {
        return true;
      });
    });

  }

}
