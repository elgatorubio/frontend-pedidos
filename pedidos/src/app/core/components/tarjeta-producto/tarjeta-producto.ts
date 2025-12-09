import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-tarjeta-producto',
  imports: [CommonModule],
  templateUrl: './tarjeta-producto.html',
  styleUrl: './tarjeta-producto.css',
})
export class TarjetaProducto {

  @Input({required:true}) producto!:Producto;

}
