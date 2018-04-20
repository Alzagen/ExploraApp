import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLikeProvider } from '../../providers/user-like/user-like';




interface MoDal {
  img: string;
  tit: string;
  cat: number[];
  cuboss: any;
  desc1: string;
  desc2: string;
}

interface Cubo {
  img: string;
  tit: string;
  cat: number[];
  cuboss: any;
  desc1: string;
  desc2: string;
}

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  data: string;
  liked: boolean;

  modalCollection: AngularFirestoreCollection<MoDal>;
  modalc: Observable<MoDal>;
  /*
  modalAny: any[];
  keys: any[];
  */

  modaldoc: AngularFirestoreDocument<MoDal>;
  modal: Observable<MoDal>;

  cuboColl: AngularFirestoreCollection<Cubo>;
  //cubos: Observable<Cubo[]>;

  cuboDoc: AngularFirestoreDocument<Cubo>;
  cubos: Observable<Cubo>;

  snapshot: any;

  success: boolean = true;
  html: string;

  constructor(private navParams: NavParams, private view: ViewController, 
              public sanitizer: DomSanitizer, private asf: AngularFirestore,
              public userlike: UserLikeProvider) {
  }

  ionViewDidLoad() {
    //Capturo datos del home
    this.data = this.navParams.get('data');

    //Busca por ID
    this.modaldoc = this.asf.doc('exhibiciones/' + this.data);
    this.modal = this.modaldoc.valueChanges();


    this.cuboDoc = this.asf.doc(this.data + '/cuboss');
    this.cubos = this.cuboDoc.valueChanges();


    //Busca por nombre
    /* this.modalCollection = this.asf.collection('exhibiciones', ref => {
                         return ref.where('titulo','==',this.data)});
     this.modal = this.modaldoc.valueChanges();   */
    /*this.modalCollection.snapshotChanges().subscribe( modalList => {
      this.modalc = modalList.map(item => {
        return {
          tit: item.payload.doc.data().titulo,
          img: item.payload.doc.data().img,
          desc1: item.payload.doc.data().desc1,
          desc2: item.payload.doc.data().desc2,
          cat: item.payload.doc.data().cat,
          cubos: item.payload.doc.data().cubos,
        }
      })
    });*/
  }

  /*

  toggleLiked(id) {

    if (card.icon === 'heart') {
      card.icon = 'heart-outline';
    } else {
      card.icon = 'heart';
    }
  }

  */

  isliked(id) {
  /*if (this.userlike.getItem(id)) {
      this.liked = true;
    } else {
      this.liked = false;
    } */
    return true; 
  }

  like(id){
    this.userlike.setItem(id);
  }

  closeModal() {
    this.view.dismiss();
  }

  getBackground(item: string) {
    return `url(${item})`;
  }

  imprimirHtml(cubo) {
    if (cubo.tipo == 1) {
      return this.html = '<div class="card">' +
        `<img src="` + cubo.img + `" alt="Avatar" style="width:100%">` +
        '<div class="containerbox">' +
        `<h4 class="titlebox"><b>` + cubo.tit + ` </b></h4>` +
        `<p class="descbox">` + cubo.desc + `</p>` +
        '</div>' +
        '</div>';

    }
    else if (cubo.tipo == 2) {
      return this.html = '<div class="card">' +
        `<video width="100%" autoplay loop muted>
                          <source src="`+ cubo.vid + `" type="video/mp4">
                          </video>`+
        '<div class="containerbox">' +
        `<h4 class="titlebox"><b>` + cubo.tit + ` </b></h4>` +
        `<p class="descbox">` + cubo.desc + `</p>` +
        '</div>' +
        '</div>';
    }
    else if (cubo.tipo == 4) {
      return this.html = `<div class="card-audio" [style.background-image]="${this.getBackground(cubo.img)}">` +
        `<audio id="player" src="` + cubo.snd + `" controls loop></audio>` +
        '<div id="wrapper" >' +
        '<div class="playpause" >' +
        `<button type="checkbox" value="None" id="playpause" name="check" onclick="document.getElementById('player').muted=!document.getElementById('player').muted"/>` +
        '<label for="playpause">   ' +
        '</label>' +
        '</div>' +
        '</div>' +
        '<div class="containerbox-audio">' +
        `<h4 class="titlebox"><b>` + cubo.tit + ` </b></h4>` +
        `<p class="descbox">` + cubo.desd + `</p>` +
        '</div>' +
        '</div>';
      //return this.sanitizer.bypassSecurityTrustHtml(this.html);              
    }
    return this.html = '<h4><b> No entro</b></h4>';

  }



}
