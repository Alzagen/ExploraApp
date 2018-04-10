import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { Http, Response } from '@angular/http';

@Injectable()
export class ModalService{
    constructor(public afDB: AngularFireDatabase){}
    modals = [];
    
    public getModals(){
        return this.afDB.list('exhibiciones/');
    }
}