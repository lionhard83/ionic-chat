import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Notice {
  message: string;
  author: string;
}

export interface Chat {
  id?: number;
  name: string;
  messages?: Notice[];
}


@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  private author = '';
  public apiUrl = 'https://fake-chat-server.herokuapp.com/chats';


  constructor(public httpClient: HttpClient) { }

  public all(): Promise<Chat[]> {
    return this.httpClient.get<Chat[]>(this.apiUrl).toPromise();
  }

  public newChat(chat: Chat): Promise<Chat> {
    return this.httpClient.post<Chat>(this.apiUrl, chat).toPromise();
  }

  public getById(id: number): Promise<Chat> {
    return this.httpClient.get<Chat>(`${this.apiUrl}/${id}`).toPromise();
  }

  public addMessage(chatId: number, message: Notice): Promise<Notice> {
    return this.httpClient.post<Notice>(`${this.apiUrl}/${chatId}/messages`, message).toPromise();
  }

  getAuthor(): string {
      return this.author;
  }
  setAuthor(author: string) {
      this.author = author;
  }
}
