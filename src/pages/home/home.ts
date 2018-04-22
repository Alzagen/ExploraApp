import { Component} from '@angular/core';
import { NavController, ModalController, ModalOptions, LoadingController} from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { InteresesPage } from '../../pages/intereses/intereses';

interface MoDal{
  img: string;
  titulo: string;
  id: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  splash = true;
 /* tabBarElment: any; 
 modals = [
    { title: 'San fransico', img: 'thumb2', subtitle: null },
    { title: 'Amsterdam', img: 'thumb1', subtitle: '45 Listings' },
    { title: 'Madison', img: 'thumb2', subtitle: '89 Listings'  },
    { title: 'São Paulo', img: 'thumb1', subtitle: '15 Listings'  },
  ]; 
 //modals: any;*/
  myModalData;
  modalCollection: AngularFirestoreCollection<MoDal>;
  modalc: MoDal[];

  public isSearchbarOpened = false;
 
  constructor(public navCtrl: NavController, private modal: ModalController, private asf: AngularFirestore,
              public NativePageTransitions: NativePageTransitions, public loading: LoadingController) {
   
  }

  ionViewDidLoad() {
    this.splash = false;
    setTimeout(() => this.splash = false, 4000);

    let loader = this.loading.create({
      content: "Cargando exhibiciones...",
    });

    loader.present().then(() => {
    this.modalCollection = this.asf.collection('exhibiciones');
    this.modalCollection.snapshotChanges().subscribe( modalList => {
      this.modalc = modalList.map(item => {
        return {
          titulo: item.payload.doc.data().titulo,
          img: item.payload.doc.data().img,
          id: item.payload.doc.id
        }
      })
    })
    setTimeout(() => {
      loader.dismiss();
    }, 3000);
    });
  }

  openModal(item : MoDal){

  const myModalOptions: ModalOptions = {
    enableBackdropDismiss: true
  }

   const myModal = this.modal.create('ModalPage', { data: item.id }, myModalOptions);
   myModal.present();
  
   /*//Recupera datos del modal
   myModal.onDidDismiss((data) => {
     //console.log(data);
   })*/
  }

  openPageI(){
    let options: NativeTransitionOptions = { 
      "duration"       :  600, // in milliseconds (ms), default 400
      "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
      "androiddelay"   :  100
    }
    this.NativePageTransitions.fade(options); 
    this.navCtrl.setRoot(InteresesPage);
  }
}
