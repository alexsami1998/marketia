import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class NavComponent implements OnInit {

  exibirIcones: boolean;
  viewLogin = true;
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.viewLogin = true;
    this.toast.info('Logout realizado com sucesso', 'Logout')
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      this.exibirIcones = true;
      this.viewLogin = false;
      return !this.jwtService.isTokenExpired(token)
    }
    return false
    this.exibirIcones = false;
  }
}
