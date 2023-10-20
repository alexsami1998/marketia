import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { NgxMaskModule } from 'ngx-mask';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  ELEMENT_DATA: Produto[] = []
  FILTERED_DATA: Produto[] = []

  displayedColumns: string[] = ['id', 'titulo', 'descricao', 'preco', 'dataAbertura', 'categoria', 'acoes'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ProdutoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Produto>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  orderByCategoria(status: any): void{
    let list: Produto[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.categoria == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Produto>(list);
    this.dataSource.paginator = this.paginator;
  }


}
