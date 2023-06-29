import { NavController, ToastController } from '@ionic/angular';
import { PetService } from './../pet.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public url = 'https://dog.ceo/api/breeds/image/random';

  public result: any = {};
  dados: any = {};

  pet: Pet = {
    nome: '',
    idade: null,
    imagem: '',
  };

  LabelBotaoCadastrar = 'CADASTRAR';
  LabelBotaoConsultar = 'CONSULTAR';
  imagem = '';

  constructor(
    public petService: PetService,
    public toast: ToastController,
    public nav: NavController,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.imagem = await this.petService.gerar();
  }

  async salvandoPet() {
    if (this.pet.nome == '' || this.pet.idade == null) {
      this.petService.exibeToast('Preencha os campos necesssários.', 'danger');
    } else {
      this.petService.salvarPet(this.pet.nome, this.pet.idade);
      this.petService.exibeToast('Cadastrado com sucesso', 'success');
      this.pet.nome = '';
      this.pet.idade = null;
      this.pet.imagem = '';
    }
  }

  consultarPet() {
    this.petService.listarPet();
  }
}
