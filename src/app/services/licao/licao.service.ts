import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from '../database/database.service';
import { Platform } from '@ionic/angular';
import { text } from '@angular/core/src/render3';

export interface Licao {
  id: number,
  icone: number,
  dataMax: string,
  titulo: string,
  descricao: string,
  prioridade: number,
}

@Injectable({
  providedIn: 'root'
})
export class LicaoService {

  constructor(private sqlLite:SQLite, private dbService: DatabaseService) {
    
  }

  public insertLicao(licao): Promise<boolean> {

    return this.dbService.getDatabase().then((database) => {
      return database.executeSql(`INSERT INTO licoes (icone, data_previsao, titulo, descricao, prioridade)
        VALUES (${licao.icone}, '${licao.dataMax}', '${licao.titulo}', '${licao.descricao}', ${licao.prioridade})`, []).then((res) => {
            return true;
      });
    });
        
  }

  public updateLicao(licao): Promise<boolean> {

    return this.dbService.getDatabase().then((database) => {
      return database.executeSql(`UPDATE licoes SET icone = ?, data_previsao = ? , titulo = ?, descricao = ?, prioridade = ? WHERE id = ?`,
        [licao.icone, licao.dataMax, licao.titulo, licao.descricao, licao.prioridade, licao.id]).then((res) => {
            return true;
      });
    });
        
  }

  public deleteLicao(id: number): Promise<boolean> {
    
    return this.dbService.getDatabase().then((database) => {
      return database.executeSql('DELETE FROM licoes WHERE id = ?', [id]).then((res) => {
        return res;
      });
    });
  
  }

  public getAllLicoes(): Promise<Licao[]> {

    return this.dbService.getDatabase().then((database) => {
      return database.executeSql('SELECT * FROM licoes ORDER BY id DESC', []).then((data) => {
        
        let itens: Licao[] = [];
        for(let i = 0; i < data.rows.length; i++) {

          let item = data.rows.item(i);
          itens.push({
            id: item.id,
            icone: item.icone,
            dataMax: item.data_previsao,
            titulo: item.titulo,
            descricao: item.descricao,
            prioridade: item.prioridade,
          }); 

        }
        return itens;
      });
    });
   
  }

  public getLicaoById(id: Number): Promise<Licao> {

    return this.dbService.getDatabase().then(db => {
      return db.executeSql("SELECT id, icone, data_previsao, titulo, descricao, prioridade FROM licoes WHERE id = ?", [id]).then((data) => {
        let item = data.rows.item(0);
        let licao: Licao = {
          id: item.id,
          icone: item.icone,
          dataMax: item.data_previsao,
          titulo: item.titulo,
          descricao: item.descricao,
          prioridade: item.prioridade,
        }; 
        return licao;
      });
    });    

  }

}
