import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MoedaPipe } from './moeda.pipe';
import { MomentPipe } from './moment.pipe';


@NgModule({
  declarations: [MomentPipe, MoedaPipe],
  exports: [MomentPipe, MoedaPipe],
  imports: [CommonModule],
})
export class PipesModule { }
