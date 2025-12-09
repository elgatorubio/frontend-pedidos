import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Categorias } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor() {}

  async getByCategoria(id: number): Promise<Producto[]> {
    const res = await fetch('./../../../assets/data/database.json');
    const resJson: Categorias[] = await res.json();
    const productos = resJson.find((categoria) => categoria.id === id)?.productos;
    return productos ?? [];
  }

  async getAll(): Promise<Producto[]> {
    const res = await fetch('./../../../assets/data/database.json');
    const resJson: Categorias[] = await res.json();
    let productos: Producto[] = [];

    resJson.forEach((categoria) => {
      productos = [...productos, ...categoria.productos];
    });

    return productos;
  }

  async getById(id: number): Promise<Producto | undefined> {
    const productos = await this.getAll();
    const productoElegido = productos.find((producto) => producto.id === id);
    return productoElegido ?? undefined;
  }
}