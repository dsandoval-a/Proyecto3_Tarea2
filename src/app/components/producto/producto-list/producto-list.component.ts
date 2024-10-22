import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProducto } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.scss'
})
export class ProductoListComponent implements OnInit, AfterViewInit, OnChanges {

  public authService: AuthService = inject(AuthService); 
  public isSuperAdmin: boolean = false;



@Input() title: string  = '';

@Input() productos: IProducto[] = [];

@Output() callModalAction: EventEmitter<IProducto> = new EventEmitter<IProducto>;
@Output() callDeleteAction: EventEmitter<IProducto> = new EventEmitter<IProducto>;


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
