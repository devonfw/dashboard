import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationsService } from '../../shared/providers/notifications.service';
import { Notification } from '../../../assets/model/notification.schema';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  private notifications: Notification[];
  public static route = 'notifications';

  constructor(private location: Location, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notificationsService.notifications.subscribe(notifications => 
      this.notifications = notifications.map(notification => {
        notification.date = new Date(notification.date);
        return notification;
      }));
  }
  
  goBack(){
    this.location.back();
  }
 
  readNotification(notification: Notification){
    this.notificationsService.readNotification(notification);
  }
}
