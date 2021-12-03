import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {registerLocaleData} from "@angular/common";
import ruLocale from '@angular/common/locales/ru';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { AccountPageComponent } from './account-page/account-page.component';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TabsComponent,
    NotesPageComponent,
    TodoPageComponent,
    BookmarksPageComponent,
    AccountPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }