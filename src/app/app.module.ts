// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.route';
import { PagesModule } from './pages/pages.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SidebarModule } from 'ng-sidebar';
import { AngularFireModule } from 'angularfire2';

// components
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './auth/auth.component';

// services
import { AuthService } from './services';

// others
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    AuthComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule,
    
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
