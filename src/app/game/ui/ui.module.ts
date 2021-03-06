import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UiModule as AppUiModule } from '../../ui/ui.module';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { ConfirmNewGameDialogComponent } from './confirm-new-game-dialog/confirm-new-game-dialog.component';
import { CharacterGenerationComponent } from './character-generation/character-generation.component';

const uiComponents = [ConfirmNewGameDialogComponent, MainMenuComponent, CharacterGenerationComponent];

@NgModule({
  declarations: [uiComponents],
  entryComponents: [uiComponents],
  imports: [SharedModule, AppUiModule],
  exports: [uiComponents]
})
export class UiModule { }
