import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category";

@Injectable({providedIn: 'root'})
export class CategoryService {
  
    private categoryUrl = 'http://localhost:8080/categories';

    constructor(private http: HttpClient){}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoryUrl);
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.categoryUrl, category);
    }
}