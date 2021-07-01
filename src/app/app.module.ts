import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardState } from './core/state/board.state';
import { MainComponent } from './main/main.component';
import { SharedMessageService } from './services';
import { MessageService } from './core';

@NgModule({
  declarations: [AppComponent, ListComponent, MainComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([BoardState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
  ],
  providers: [MessageService, SharedMessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
