import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss'
})
export class CategoriaListComponent implements OnInit, AfterViewInit, OnChanges{

  public authService: AuthService = inject(AuthService); 
  public isSuperAdmin: boolean = false;

@Input() title: string  = '';

@Input() categorias: ICategoria[] = [];

@Output() callModalAction: EventEmitter<ICategoria> = new EventEmitter<ICategoria>;
@Output() callDeleteAction: EventEmitter<ICategoria> = new EventEmitter<ICategoria>;


constructor(){
  console.log('Title',this.title)
}

  
  ngOnInit(): void {
    console.log('ngOnInit',this.title)
    this.isSuperAdmin = this.authService.isSuperAdmin();

  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit',this.title)
  }

  ngOnChanges(changes: SimpleChanges): void {
    //if(changes['title'].firstChange)
      //console.log('ngOnChanges', changes['title'].currentValue)

  }
}
