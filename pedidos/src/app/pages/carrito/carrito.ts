import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { ProductosService } from '../../core/services/productos.service';
import { Contador } from '../../core/components/contador/contador';
import { Producto } from '../../core/interfaces/producto';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, Contador, RouterLink, RouterLinkActive],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class Carrito {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService);

  productosCarrito: Producto[] = [];

  async ngOnInit(): Promise<void> {
    this.headerService.titulo.set('Carrito de Compras');

    // Cargar productos del carrito
    const promesas = this.cartService.carrito.map(item =>
      this.productosService.getById(item.idProducto)
    );

    const resultados = await Promise.all(promesas);
    this.productosCarrito = resultados.filter(
      (p): p is Producto => p !== undefined && p !== null
    );
  }

  eliminarProducto(idProducto: number | string): void {
  console.log('Eliminar producto', idProducto, 'tipo:', typeof idProducto);

  const id = Number(idProducto);
  console.log('id numérico', id);

  this.cartService.eliminarProducto(id);

  this.productosCarrito = this.productosCarrito.filter(
    p => Number(p.id) !== id
  );

  console.log('productosCarrito después:', this.productosCarrito);
}

  trackById = (_: number, item: Producto) => item.id;
}