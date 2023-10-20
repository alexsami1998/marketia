import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  viewWel: boolean;
  jwtService: JwtHelperService = new JwtHelperService();


  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  topo() {
    this.router.navigate(['home'])
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      this.viewWel = true;
      return !this.jwtService.isTokenExpired(token)
    }
    return false
    this.viewWel = false;  
  }

}
