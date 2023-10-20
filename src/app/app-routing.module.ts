import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoReadComponent } from './components/produto/produto-read/produto-read.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { OperadorCreateComponent } from './components/operador/operador-create/operador-create.component';
import { OperadorDeleteComponent } from './components/operador/operador-delete/operador-delete.component';
import { OperadorListComponent } from './components/operador/operador-list/operador-list.component';
import { OperadorUpdateComponent } from './components/operador/operador-update/operador-update.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';

const routes: Routes = [
  
  /*{ path: 'login', component: LoginComponent },
  {
    path: '', component: InicialComponent, children: [ 
      { path: 'inicial',                                                 component:                              HomeComponent }, 

      { path: 'cadastro/create-usuario',                                 component:                           CadastroComponent},

      { path: 'principal',                                               component:                      PrincipalListComponent},
      { path: 'principal/read/:id',                                      component:                      PrincipalReadComponent},



      { path: 'login', component: LoginComponent },
    ]
  },*/

  { path:     'login',                                                   component:                             LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },


      { path: 'operadores',                                                component:                       OperadorListComponent },
      { path: 'operadores/create',                                         component:                     OperadorCreateComponent },
      { path: 'operadores/update/:id',                                     component:                     OperadorUpdateComponent },
      { path: 'operadores/delete/:id',                                     component:                     OperadorDeleteComponent },

      { path: 'clientes',                                                component:                       ClienteListComponent },
      { path: 'clientes/create',                                         component:                     ClienteCreateComponent },
      { path: 'clientes/update/:id',                                     component:                     ClienteUpdateComponent },
      { path: 'clientes/delete/:id',                                     component:                     ClienteDeleteComponent },

      { path: 'produtosRegister',                                                component:                       ProdutoListComponent },
      { path: 'produtosRegister/create',                                         component:                     ProdutoCreateComponent },
      { path: 'produtosRegister/update/:id',                                     component:                     ProdutoUpdateComponent },
      { path: 'produtosRegister/read/:id',                                       component:                       ProdutoReadComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }