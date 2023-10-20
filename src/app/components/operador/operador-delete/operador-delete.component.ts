import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Operador } from 'src/app/models/operador';
import { OperadorService } from 'src/app/services/operador.service';

@Component({
  selector: 'app-operador-delete',
  templateUrl: './operador-delete.component.html',
  styleUrls: ['./operador-delete.component.css']
})
export class OperadorDeleteComponent implements OnInit {

  operador: Operador = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  constructor(
    private service: OperadorService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.operador.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.operador.id).subscribe(resposta => {
      resposta.perfis = []
      this.operador = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.operador.id).subscribe(() => {
      this.toast.success('Operador deletado com sucesso', 'Delete');
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

}
