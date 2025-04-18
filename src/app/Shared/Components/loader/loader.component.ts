import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  loading = inject(LoaderService).Loading;

  constructor(private loaderService: LoaderService) {}
}
