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

  // Obtener la cantidad de un producto en el carrito
  getCantidad(idProducto: number | string): number {
    const id = Number(idProducto);
    const item = this.cartService.carrito.find(p => p.idProducto === id);
    return item?.cantidad || 0;
  }

  // Calcular el precio total de un producto (precio * cantidad)
  getPrecioTotal(producto: Producto): number {
    const cantidad = this.getCantidad(producto.id);
    return producto.precio * cantidad;
  }

  // Calcular el subtotal del carrito
  getSubtotal(): number {
    return this.productosCarrito.reduce((total, producto) => {
      return total + this.getPrecioTotal(producto);
    }, 0);
  }

  // Calcular el envío
  getEnvio(): number {
    return 50; // Envío fijo de $50
  }

  // Calcular el total del carrito
  getTotal(): number {
    return this.getSubtotal() + this.getEnvio();
  }

  // Manejar el cambio de cantidad desde el componente contador
  onCantidadCambiada(idProducto: number | string, nuevaCantidad: number): void {
    const id = Number(idProducto);
    this.cartService.cambiarCantidadProducto(id, nuevaCantidad);
  }

  trackById = (_: number, item: Producto) => item.id;
}