import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbAlertModule, NbCardModule, NbUserModule, NbButtonModule,
  NbTabsetModule, NbActionsModule, NbRadioModule, NbSelectModule, NbListModule, NbIconModule, NbSpinnerModule
} from '@nebular/theme';
import { Component } from '@angular/core';
import { DxTileViewModule, DxButtonModule, DxListModule, DxDataGridModule, DxPivotGridModule } from 'devextreme-angular';
import { TabelaComissaoComponent } from './tabela-comissao.component';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [ TabelaComissaoComponent ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ThemeModule,
    NbAlertModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbSpinnerModule,
    NbActionsModule,
    PipesModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    DxTileViewModule,
    DxButtonModule,
    DxDataGridModule,
    DxPivotGridModule,
    DxListModule,
  ],
})
export class TabelaComissaoModule { }

