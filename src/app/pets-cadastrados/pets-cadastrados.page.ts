import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pets-cadastrados',
  templateUrl: './pets-cadastrados.page.html',
  styleUrls: ['./pets-cadastrados.page.scss'],
})
export class PetsCadastradosPage implements OnInit {
  imagem = 'http://wallpapercave.com/wp/wp12146395.jpg';
  petList: any = {};
  nomeApresentar = '';
  idadeApresentar = '';

  constructor(
    public alerta: AlertController,
    public nav: NavController,
    public petService: PetService
  ) {}

  novo() {
    this.nav.navigateRoot('/');
  }

  ngOnInit(): void {
    this.petList = this.petService.getPets();
    if (!this.petList) {
      return;
    }
  }

  ionViewDidEnter() {
    this.carregados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇÃO!',
      message: 'Nenhum Pet cadastrado, cadastre um novo!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            localStorage.clear();
            this.nav.navigateBack('/');
          },
        },
      ],
    });

    await voltando.present();
  }

  apresentarPets() {
    this.petList = this.petService.getPets();
    if (!this.petList) {
      return;
    } else {
      this.petList = this.petService.listarPet();
    }
  }

  deletarPet(nome: string) {
    this.petService.deletar(nome);
    this.carregados();
  }

  carregados() {
    if (this.petService.listarPet()) {
      this.petList = this.petService.listarPet()!;

      if (this.petList.length == 0) {
        this.voltar();
      }
    }
  }
}
