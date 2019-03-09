import { Component, OnInit } from '@angular/core';
import { ChatsService, Chat } from '../chats.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public chat: Chat = {
    name: ''
  };
  constructor(public chatService: ChatsService, public toastController: ToastController) {
  }

  set() {
    this.chatService.newChat(this.chat).then(() => {
      this.presentToast('Char has been created');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
