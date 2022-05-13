import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StarWarsClass } from './star-wars-class';


@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  private API_PATH = environment.API_PATH;

  constructor(private _httpCliente: HttpClient) { }

  public getPersonagens(): Observable<StarWarsClass[]> {
    return this._httpCliente.get<StarWarsClass[]>(`${this.API_PATH}personagens`);
  }

  public getPersonagemId(id: number): Observable<StarWarsClass[]> {
    return this._httpCliente.get<StarWarsClass[]>(`${this.API_PATH}personagens/${id}`);
  }

  public deletePersoangem(id: number) {
    this._httpCliente.delete<StarWarsClass[]>(`${this.API_PATH}personagens/${id}`).subscribe(
      resultado => {
        console.log('Personagem excluído com sucesso.');
      },
      erro => {
        if (erro.status == 404) {
          console.log('Personagem não localizado. Favor rever o Id digitado.');
        }
      }
    );
  }

  public postPersoangem(personagem: any) {
    this._httpCliente.post(`${this.API_PATH}personagens/`, personagem).subscribe(() => {
      console.log(`Personagem ${personagem.nome} adicionado!`);
    },
      () => {
        console.log(`Erro ao adicionar o personagem ${personagem.nome}.`);
      });
  }

  public editPersoangem(personagem: any) {
    this._httpCliente.put(`${this.API_PATH}personagens/${personagem.id}`, personagem).subscribe(
      resultado => {
        console.log(`Personagem ${personagem.nome} alterado com sucesso.`);
      },
      erro => {
        switch (erro.status) {
          case 400:
            console.log(erro.error.mensagem);
            break;
          case 404:
            console.log('Personagem não localizado.');
            break;
        }
      }
    );
  }

}
