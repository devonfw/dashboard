import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Notification } from '../../../assets/model/notification.schema';
import Database from '../../../electron/providers/Database';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications = new BehaviorSubject<Notification[]>([]);

  constructor(private database: DatabaseService, private snackBar: MatSnackBar) { 
    database.getNotifications().subscribe(notifications => this.notifications.next(notifications));
  }

  private displaySnackBar(msg: string) {
    const snakbarConfig = new MatSnackBarConfig();
    snakbarConfig.verticalPosition = 'top';
    snakbarConfig.horizontalPosition = 'right';
    snakbarConfig.duration = 2000;
    this.snackBar.open(msg, undefined, snakbarConfig);
  }

  addNotification(title: string, msg?: string, date?: Date) {
    const notification = new Notification();
    notification.title = title;
    notification.msg = msg;
    notification.read = false;
    notification.date = date ? date : new Date();
    this.displaySnackBar(title);
    this.database.addNotification(notification).subscribe(notifications => this.notifications.next(notifications));
  }

  readNotification(notification: Notification){
    notification.read = true;
    this.database.updateNotification(notification).subscribe(notifications => this.notifications.next(notifications));
  }
}
