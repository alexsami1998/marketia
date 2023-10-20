import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { Operador } from 'src/app/models/operador';
import { ProdutoService } from 'src/app/services/produto.service';
import { OperadorService } from 'src/app/services/operador.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  produto: Produto = {
    titulo: '',
    descricao: '',
    preco: '',
    estoq: '',
    categoria: '',
    operador: '',
    nomeOperador: '',
  }

  operadores: Operador[] = []

  titulo: FormControl = new FormControl(null, [Validators.required]);
  descricao: FormControl = new FormControl(null, [Validators.required]);
  preco: FormControl = new FormControl(null, [Validators.required]);
  estoq: FormControl = new FormControl(null, [Validators.required]);
  categoria: FormControl = new FormControl(null, [Validators.required]);
  operador: FormControl = new FormControl(null, [Validators.required]);
  nomeOperador: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private produtoService: ProdutoService,
    private operadorService: OperadorService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.produto.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllOperadores();
  }

  findById(): void {
    this.produtoService.findById(this.produto.id).subscribe(resposta => {
      this.produto = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  update(): void {
    this.produtoService.update(this.produto).subscribe(resposta => {
      this.toastService.success('Produto atualizado com sucesso', 'Atualizar produto');
      this.router.navigate(['produtos']);
    }, ex => {
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
      && this.estoq.valid && this.categoria.valid && this.operador.valid
  }

  retornaCategoria(categoria: any): string {
    if (categoria == '0') {
      return 'ALIMENTOS'
    } else if (categoria == '1') {
      return 'BEBIDAS'
    } else if (categoria == '2') {
      return 'PRODUTOS_DE_LIMPEZA'
    } else if (categoria == '3') {
      return 'HIGIENE'
    } else if (categoria == '4') {
      return 'ELETRONICOS'
    } else if (categoria == '5') {
      return 'VESTUARIO'
    } else if (categoria == '6') {
      return 'BRINQUEDOS'
    } else {
      return 'OUTROS'
    }
  }

}
