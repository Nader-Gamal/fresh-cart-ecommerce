import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/servies/looding.service';

@Component({
  selector: 'app-looder',
  templateUrl: './looder.component.html',
  styleUrls: ['./looder.component.css'],
})
export class LooderComponent implements OnInit {
  isLoading$ = this._LoadingService.isLoading$;
  constructor(private _LoadingService: LoadingService) {}
  ngOnInit(): void {}
}
