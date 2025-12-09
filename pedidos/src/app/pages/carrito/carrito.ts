import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { Contador } from '../../core/components/contador/contador';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule , Contador],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class Carrito {
  headerService = inject(HeaderService);
  cartService = inject(CartService);

  ngOnInit(): void {
    this.headerService.titulo.set('Carrito de Compras');
  }

  eliminarProducto(idProducto: number | string, cantidad: number): void {
    const id = typeof idProducto === 'string' ? +idProducto : idProducto;
    this.cartService.eliminarProducto(id, cantidad);
  }

  trackById = (_: number, item: any) => item.idProducto;
}