import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { Operador } from 'src/app/models/operador';
import { ProdutoService } from 'src/app/services/produto.service';
import { OperadorService } from 'src/app/services/operador.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    titulo:                  '',
    descricao:               '',
    preco:                   '',
    estoq:                   '',
    categoria:               '',
    operador:                '',
    nomeOperador:            '',
  }

  operadores: Operador[] = []

  titulo: FormControl = new FormControl(null, [Validators.required]);
  descricao: FormControl = new FormControl(null, [Validators.required]);
  preco: FormControl = new FormControl(null, [Validators.required]);
  estoq: FormControl = new FormControl(null, [Validators.required]);
  categoria: FormControl = new FormControl(null, [Validators.required]);
  operador: FormControl = new FormControl(null, [Validators.required]);


  constructor(
    private produtoService: ProdutoService,
    private operadorService: OperadorService,
    private toastService:    ToastrService,
    private router: Router,
  ) {
    this.produto.preco = '';
   }

  ngOnInit(): void {
    this.findAllOperadores();
  }

  create(): void {
    this.produtoService.create(this.produto).subscribe(resposta => {
      this.toastService.success('Produto registrado com sucesso', 'Novo produto');
      this.router.navigate(['produtos']);
    }, ex => {
      console.log(ex);
      
      this.toastService.error(ex.error.error);
    })
  }

  findAllOperadores(): void {
    this.operadorService.findAll().subscribe(resposta => {
      this.operadores = resposta;
    })
  }

  validaCampos(): boolean {
    return this.titulo.valid && this.descricao.valid && this.preco.valid
     && this.categoria.valid && this.operador.valid
  }

}
