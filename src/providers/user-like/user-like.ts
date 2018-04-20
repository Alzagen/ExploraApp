import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the UserLikeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserLikeProvider {

  public data: boolean; 

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello UserLikeProvider Provider');
  }

  setItem(key){
    this.nativeStorage.setItem(key, {id: true})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }

  getItem(key){
    this.nativeStorage.getItem(key)
    .then(
      data => this.data = data.id,
      error => { console.error(error);
                 this.data = false;
        }, 
    );
    return this.data;
  }
}
