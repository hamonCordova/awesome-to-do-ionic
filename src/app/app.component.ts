import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [
    DatabaseService
  ]
})
export class AppComponent {
  public appPages = [
    {
      title: 'Lições',
      url: '/licoes',
      icon: 'clipboard'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private database: DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.database.createInitialDatabase();
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#2c2c2c');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }
}
