import { Component, OnInit } from '@angular/core';
import { ChatsService, Chat, Notice } from 'src/app/chats.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public chat: Chat;
  public enablePolling: boolean;
  public notice: Notice = {
    message: '',
    author: ''
  };
  constructor(public chatsService: ChatsService, public route: ActivatedRoute, public toastController: ToastController) {}

  ngOnInit() {
    this.loadChatAndMessages();
    this.notice.author = this.chatsService.getAuthor();
    this.enablePolling = true;
    this.polling();
  }

  ionViewWillLeave() {
    console.log('#ionViewWillLeave');
    this.enablePolling = false;
  }

  send() {
    if (!this.notice.author) {
      this.presentToast('Set Author in tab2');
    } else {
      this.chatsService.addMessage(this.chat.id, this.notice).then(() => {
        this.notice.message = ''; // reset dell'input
        this.presentToast('Your message have been sent.');
        this.loadChatAndMessages();
      });
    }
  }

  loadChatAndMessages() {
    console.log('#loadChatAndMessages');
    if (this.chatsService) {
      this.chatsService.getById(this.route.snapshot.params.id).then(response => {
        this.chat = response;
      });
      if (this.enablePolling) {
        this.polling();
      }
    }
  }

  polling() {
    setTimeout(this.loadChatAndMessages, 50000);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}
