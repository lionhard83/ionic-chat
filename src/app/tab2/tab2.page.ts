import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../chats.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public author: string;
  constructor(public chatService: ChatsService, public toastController: ToastController) {
  }

  ngOnInit() {
    this.author = this.chatService.getAuthor();
  }

  set() {
    this.chatService.setAuthor(this.author);
    this.presentToast('User has been setted');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
