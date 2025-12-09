// src/app/core/services/productos.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { Categorias } from '../interfaces/categorias';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private readonly dbUrl = '/assets/data/database.json';

  private async loadDb(): Promise<Categorias[] | null> {
    // Evita intentar leer assets en el servidor (SSR)
    if (!isPlatformBrowser(this.platformId)) return null;
    return await firstValueFrom(this.http.get<Categorias[]>(this.dbUrl));
  }

  async getByCategoria(id: number): Promise<Producto[]> {
    const data = await this.loadDb();
    return data?.find(c => c.id === id)?.productos ?? [];
  }

  async getAll(): Promise<Producto[]> {
    const data = await this.loadDb();
    return data?.flatMap(c => c.productos ?? []) ?? [];
  }

  async getById(id: number): Promise<Producto | undefined> {
    const all = await this.getAll();
    // En tu JSON los ids de producto son strings ("1","2"...)
    const idStr = String(id);
    return all.find(p => String((p as any).id) === idStr);
  }
}