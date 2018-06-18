import { Measurement } from './../shared/types/measurement.model';
import { Record } from './../shared/types/record.model';
import { History } from './../shared/types/history.model';
import { DateService } from './../shared/date.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { UserData } from './../auth/userData.model';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import 'rxjs/add/operator/map';


@Injectable()
export class TrackingService {
  private userId: string = null;
  private fbSubs: Subscription[] = [];
  private historySubscriptions: Subscription[] = [];
  private history: History = {
    records: []
  };
  historyChanged = new BehaviorSubject<History>(null);

  constructor(
    private db: AngularFirestore,
    private dateService: DateService
  ) {
    db.firestore.settings({ timestampsInSnapshots: false });
  }

  fetchHistoryByUserId(userId: string): void {
    this.userId = userId;
    this.historySubscriptions.push(
      this.db
      .collection(`histories`)
      .doc(userId)
      .collection('records')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const key = doc.payload.doc.id;
          const data = doc.payload.doc.data();
          const id = doc.payload.doc.id;
          return { id, key, ...data };
        });
      })
      .subscribe(
        (historyData: any) => {
        for (let i = 0; i < historyData.length; i++) {
          historyData[i].id = historyData[i].key;
        }
          this.history = {
            records: historyData
          };
          this.historyChanged.next(this.history);
        },
        error => {}
      )
    );
  }

  addRecordtoHistory(record: Record): void {
    const historyRef = this.db.collection('histories')
      .doc(this.userId)
      .collection('records');
    const oldHistory = this.history;
    const newRecord = {
      id: record.id,
      date: record.date,
      measurements: record.measurements
    };
    historyRef.add(newRecord);
  }

  updateRecord(record: Record): void {
    const newHistory = this.history;
    const recordRef = this.db
      .collection('histories')
      .doc(this.userId)
      .collection('records')
      .doc(record.id);
      recordRef.update(record);
  }

}
