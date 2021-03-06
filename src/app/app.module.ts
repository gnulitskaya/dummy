import { TodoStore, TodoQuery } from './pages/todo-page/state/todo.store';
import { TodoService } from './pages/todo-page/state/todo.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {registerLocaleData} from "@angular/common";
import ruLocale from '@angular/common/locales/ru';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { TodoItemComponent } from './shared/components/todo-item/todo-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {TodosComponent} from "./pages/todo-page/todos.component";
import {TodoComponent} from "./pages/todo-page/todo.component";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { LoginPageComponent } from './pages/login-page/login-page.component';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TabsComponent,
    TodoPageComponent,
    AccountPageComponent,
    TodoItemComponent,
    TodosComponent,
    TodoComponent,
    LoginPageComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSlideToggleModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatCardModule,
      MatButtonModule,
      MatCheckboxModule,
      MatTableModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule
  ],
  providers: [TodoService, TodoStore,TodoQuery],
  bootstrap: [AppComponent]
})
export class AppModule { }
