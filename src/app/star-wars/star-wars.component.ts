import { Component, OnInit } from '@angular/core';
import { StarWarsClass } from '../star-wars-class';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.scss']
})
export class StarWarsComponent implements OnInit {

  public personagens: StarWarsClass[] = [];

  public dadosPersonagem: StarWarsClass = { id: this.personagens.length + 1, nome: '', habilidade: '', planeta: '', armas: '', avatar: '' }

  public divPersonagem: boolean = false;

  public divAdicionarPersonagem: boolean = false;

  public divAtualizarPersonagem: boolean = false;

  public divIdRemover: boolean = false;

  public divIdAddUm: boolean = false;

  public divId: boolean = false;

  public idPersonagem!: number;


  constructor(private _starWarsService: StarWarsService) { }

  ngOnInit(): void {
    this.obterTodos();
  }

  public obterTodos() {
    this._starWarsService.getPersonagens()
      .subscribe(
        retorno => {
          this.personagens = retorno.map(
            personagem => {
              return new StarWarsClass(
                personagem.id,
                personagem.nome,
                personagem.habilidade,
                personagem.planeta,
                personagem.armas,
                personagem.avatar
              )
            }
          )
        }
      )
  }

  public obterPorId(id: number) {
    this._starWarsService.getPersonagemId(id)
      .subscribe(
        retorno => {
          console.log(retorno)
        }
      )
    this.divIdAddUm = false;
    this.divId = false;
    location.reload();
  }

  public atualizar() {
    this._starWarsService.editPersoangem(this.dadosPersonagem);
    this.divAtualizarPersonagem = false;
    this.divPersonagem = false;
    location.reload();
  }

  public addPersonagem() {
    this._starWarsService.postPersoangem(this.dadosPersonagem);
    this.divAdicionarPersonagem = false;
    this.divPersonagem = false;
    location.reload();
  }

  public remover(id: number) {
    this._starWarsService.deletePersoangem(id);
    this.divIdRemover = false;
    this.divId = false;
    location.reload();
  }




}
