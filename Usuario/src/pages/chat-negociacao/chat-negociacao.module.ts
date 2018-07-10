import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatNegociacaoPage } from './chat-negociacao';

@NgModule({
  declarations: [
    ChatNegociacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatNegociacaoPage),
  ],
})
export class ChatNegociacaoPageModule {}
