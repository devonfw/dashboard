import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../shared/providers/notifications.service';
import { Notification } from '../../../assets/model/notification.schema';
import { NotificationsComponent } from '../../views/notifications/notifications.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrls: ['./notifications-panel.component.scss']
})
export class NotificationsPanelComponent implements OnInit {

  private notificationsPage = NotificationsComponent.route;
  private unreadNotifications: Notification[];
  constructor(private notificationsService: NotificationsService, private router: Router) { }

  ngOnInit() {
    this.notificationsService.notifications.subscribe(notifications => this.unreadNotifications = notifications.filter(notification => !notification.read));
  }

  readNotification(notification: Notification){
    this.notificationsService.readNotification(notification);
    this.router.navigateByUrl(NotificationsComponent.route);
  }

}
