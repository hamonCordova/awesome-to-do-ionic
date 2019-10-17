import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root',
})

export class DatabaseService {

  private database: SQLiteObject;
  private readonly KEY_DATABASE_CREATE_STATE = 'database_create_state';

  constructor(private platform: Platform, private sqLitePorter: SQLitePorter, private sqlite: SQLite, private http: Http) {
    this.platform.ready().then(() => {
      this.sqlite.create({name: 'database.db', location: 'default'}).then((dbObj) => {
        this.database = dbObj;
      });
    });
  } 

  public createInitialDatabase() {

    let createDatabase = () => {

      this.http.get('/assets/sql/initial.sql').subscribe((data: any) => {

          this.sqLitePorter.importSqlToDb(this.database, data._body).then(() => {
            this.setStateCreatedDatabase(true);
          }).catch(() => {
            console.error('importSqlToDb unresolved');
          })
  
      });

    }

    if(this.getStateCreatedDatabase() == true) {
      return;
    } else {
      this.openDatabase(createDatabase);
    }
    
  }

  public async getDatabase(): Promise<SQLiteObject> {

    return this.platform.ready().then(() => {
     
      if(this.database) {
        return this.database;
      }

      return this.sqlite.create({name: 'database.db', location: 'default'}).then((dbObj) => {
        this.database = dbObj;
        return dbObj;
      });

    });
  }

  private openDatabase(method?) {
    
    if(this.database) {
      if(method) {
        method();
      } 
      return this.database;
    }

    //Open Connection With Database
    this.platform.ready().then(() => {

      this.sqlite.create({name: 'database.db', location: 'default'}).then((dbObj) => {
        this.database = dbObj;
        if(method) {
          method();
        }
      })

    });

  }

  private setStateCreatedDatabase(create: boolean) {
    localStorage.setItem(this.KEY_DATABASE_CREATE_STATE, String(create))
  }

  private getStateCreatedDatabase(): boolean {
    return Boolean(localStorage.getItem(this.KEY_DATABASE_CREATE_STATE));
  }

}
