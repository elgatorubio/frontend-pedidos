import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.carrito = JSON.parse(cart);
    }
  }

  carrito: Cart[] = []

  agregarProducto(idProducto: number, cantidad: number, notas?: string) {
    const i = this.carrito.findIndex(producto => producto.idProducto === idProducto);

    if (i === -1) {
      const nuevoProducto: Cart = { idProducto, cantidad };
      if (notas !== undefined) nuevoProducto.notas = notas;
      this.carrito.push(nuevoProducto);
    } else {
      this.carrito[i].cantidad += cantidad;
      if (notas !== undefined) this.carrito[i].notas = notas;
    }
    this.actualizarAlmacenamiento();
  }

  eliminarProducto(idProducto: number) {
    this.carrito = this.carrito.filter(producto => producto.idProducto !== idProducto);
    if (this.carrito.length === 0) return localStorage.clear();
    this.actualizarAlmacenamiento();
  }

  cambiarCantidadProducto(idProducto: number, cantidad: number) {
    this.carrito = this.carrito.map(producto => {
      if (producto.idProducto === idProducto) {
        return { ...producto, cantidad };
      }
      return producto;
    })
    this.actualizarAlmacenamiento();
  }

  actualizarAlmacenamiento() {
    localStorage.setItem('cart', JSON.stringify(this.carrito));
  }
}