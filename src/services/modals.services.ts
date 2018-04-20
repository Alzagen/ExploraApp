import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';

@Injectable()
export class ModalService{
    constructor(public afDB: AngularFireDatabase){}
    modals = [];
    
    public getModals(){
        return this.afDB.list('exhibiciones/');
    }
}