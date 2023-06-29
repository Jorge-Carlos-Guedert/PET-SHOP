import { Injectable } from '@angular/core';
import { Pet } from './models/pet.models';
import { HttpClient } from '@angular/common/http';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  key = 'pets';
  colecaoCachorros: any[] = [];
  url = 'https://dog.ceo/api/breeds/image/random';
  public result: any = {};

  constructor(
    private http: HttpClient,
    public toast: ToastController,
    public alerta: AlertController,
    public nav: NavController
  ) // public petsCadastradosPage: PetsCadastradosPage
  {}
  //ler pets no localStorage
  getPets(): Pet[] {
    var listaCachorrosSTR = localStorage.getItem(this.key);

    var listaCachorros: Pet[] = [];
    if (listaCachorrosSTR) {
      listaCachorros = JSON.parse(listaCachorrosSTR!);
    }
    return listaCachorros;
  }

  // salvar pets em colecao
  async salvarPet(nomes: string, idades: number) {
    const pets = {
      nome: nomes,
      idade: idades,
      img: await this.gerar(),
    };
    const values = localStorage.getItem(this.key);

    if (!values) {
      this.colecaoCachorros.push(pets);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoCachorros));
    } else {
      const colecao: any[] = this.listarPet()!;
      colecao.push(pets);
      localStorage.setItem(this.key, JSON.stringify(colecao));
    }
  }

  //listar os pets pela chame pets e armazenar em colecao
  listarPet() {
    const values = localStorage.getItem(this.key);

    if (!values){
//       this.petsCadastradosPage.voltar();
      this.exibeToast('NENHUM CACHORRO CADASTRADO','warning');
      return;}

    const colecao: any[] = JSON.parse(values);
    console.log(colecao);
    this.nav.navigateForward('pets-cadastrados');
    return colecao;
  }

  // excluir pet pela chave pets
  deletar(param: any) {
    const values = this.listarPet();
    const result = values?.filter((pets) => pets.nome !== param);
    localStorage.setItem(this.key, JSON.stringify(result));
  }

  // gerar imagem consultando API
  gerar() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const resp = await this.consultaApi().toPromise();
        this.result = resp;
        resolve(this.result.message);
      } catch (error) {
        reject(error);
      }
    });
  }

  // verificando a dispobilidade da APi.
  consultaApi() {
    return this.http.get(this.url);
  }

  // Exibição de Toast na tela
  async exibeToast(msg: string, cor: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'middle',
      animated: true,
      color: cor,
    });

    toast.present();
  }

  //Fução voltar da tela de exibição dos pets
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
}
