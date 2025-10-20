import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user:any ={}

  constructor(private router :Router) { }
  ngOnInit() {
    if(sessionStorage.getItem('user_id')){
      this.user={
        id: sessionStorage.getItem('user_id'),
        name: sessionStorage.getItem('user_name'),
      }
    } else {
      this.router.navigate(["auth"])
    }
  }

}
