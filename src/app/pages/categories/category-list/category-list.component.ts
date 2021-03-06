import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      c => this.categories = c,
      error => alert('Erro ao carregar a lista de categorias')
    );
  }

  deleteCategory(category) {
    const deveExcluir = confirm('Deseja realmente excluir este item?');

    if (deveExcluir) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(e => e !== category),  // filtra a lista sem a categoria que foi excluída
        () => alert('Erro ao tentar excluir')
      );
    }
  }

}
