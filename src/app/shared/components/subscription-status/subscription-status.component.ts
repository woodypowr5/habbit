import { UserData } from './../../../auth/userData.model';
import { AuthService } from './../../../auth/auth.service';
import { Customer } from './../../types/customer.model';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';


@Component({
  selector: 'app-subscription-status',
  templateUrl: './subscription-status.component.html',
  styleUrls: ['./subscription-status.component.css']
})
export class SubscriptionStatusComponent implements OnInit {
  private customer: Customer;
  private userData: UserData;

  constructor(private subscriptionService: SubscriptionService, private authService: AuthService) {}

  ngOnInit() {
    this.subscriptionService.customerChanged.subscribe((customer: Customer) => {
      this.customer = customer;
    });
    this.authService.loggedInUserChanged.subscribe((userData: UserData) => {
      this.userData = userData;
    });
  }
}
