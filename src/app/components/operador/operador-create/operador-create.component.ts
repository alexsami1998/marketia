import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Operador } from 'src/app/models/operador';
import { OperadorService} from 'src/app/services/operador.service';

@Component({
  selector: 'app-operador-create',
  templateUrl: './operador-create.component.html',
  styleUrls: ['./operador-create.component.css']
})
export class OperadorCreateComponent implements OnInit {

  operador: Operador = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: OperadorService,
    private toast:    ToastrService,
    private router:          Router,
    ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.operador).subscribe(() => {
      this.toast.success('Operador cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['operadores'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfil(perfil: any): void {
    if(this.operador.perfis.includes(perfil)) {
      this.operador.perfis.splice(this.operador.perfis.indexOf(perfil), 1);
    } else {
      this.operador.perfis.push(perfil);
    }
    
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }
}
