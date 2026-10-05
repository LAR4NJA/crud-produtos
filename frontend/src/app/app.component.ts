import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from './models/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  products: Product[] = [];

  product: Product = {
    name: '',
    price: 0,
    quantity: 0
  };

  editingId: number | null = null;

  pesquisa: string = '';

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listar().subscribe(data => {
      this.products = data;
    });
  }

  get produtosFiltrados(): Product[] {
    const texto = this.pesquisa.toLowerCase().trim();

    if (!texto) {
      return this.products;
    }

    return this.products.filter(produto =>
      produto.name.toLowerCase().includes(texto)
    );
  }

  salvar(): void {
    if (this.editingId === null) {
      this.service.cadastrar(this.product).subscribe(() => {
        this.limpar();
        this.listar();
      });
    } else {
      this.service.editar(this.editingId, this.product).subscribe(() => {
        this.limpar();
        this.listar();
      });
    }
  }

  editar(product: Product): void {
    this.editingId = product.id!;
    this.product = {
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity)
    };
  }

  excluir(id: number): void {
    if (confirm('Deseja excluir este produto?')) {
      this.service.excluir(id).subscribe(() => {
        this.listar();
      });
    }
  }

  limpar(): void {
    this.editingId = null;
    this.product = {
      name: '',
      price: 0,
      quantity: 0
    };
  }
}
