import { UserData } from './../../auth/userData.model';
import { AuthService } from './../../auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class PaymentsService {
  private userData: UserData;
  membership: any;


  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.authService.loggedInUserChanged.subscribe(userData => {
      this.userData = userData;
    });
  }

  processPayment(source: any) {
    this.db.collection(`customers`).doc(`${this.userData.userId}`).update({
      source: source
    });
  }

  createNewUser() {

  }
}

// firebase functions:config:set stripe.testkey="pk_test_JcxDwMOwS2qiHbqvBuQtkPVj"
