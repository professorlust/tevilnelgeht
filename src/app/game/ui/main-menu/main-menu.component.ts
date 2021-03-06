import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';

import { StoreApi, StoreService } from '../../../core/store.service';
import { MenuItems } from '../../../ui/menu/menu.component';
import { UiTransition, uiTransitionInjectionToken } from '../../../ui/ui-transition';

import { CharacterGenerationComponent } from '../character-generation/character-generation.component';
import { ConfirmNewGameDialogComponent } from '../confirm-new-game-dialog/confirm-new-game-dialog.component';
import { StoreNamespace } from '../../store-namespace.enum';

@Component({
  selector: 'game-ui-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnDestroy {
  /**
   * Menu title.
   */
  public readonly title = 'Tevilnelgeht';

  /**
   * Menu items.
   */
  public readonly menuItems: MenuItems = [
    { title: 'Continue', icon: 'send', activate: () => this.continueGame() },
    { title: 'New', icon: 'open_in_new', activate: () => this.newGame() }
  ];

  /**
   * Continue game menu item.
   */
  private continueGameMenuItem = this.menuItems[0];

  /**
   * Subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Instantiate main menu component.
   *
   * @param uiTransitionService UI transition service.
   * @param matDialog Material dialog.
   */
  public constructor(
    @Inject(uiTransitionInjectionToken) private uiTransitionService: UiTransition,
    private matDialog: MatDialog,
    private storeService: StoreService
  ) {
    if (!this.storeService.namespace(StoreNamespace.Level).get('currentLevel')) {
      this.continueGameMenuItem.disabled = true;
    }
  }

  /**
   * Lifecycle hook that is called when a directive, pipe or service is destroyed.
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Continue current game.
   */
  private continueGame(): void {
    this.playGame();
  }

  /**
   * Start new game.
   */
  private newGame(): void {
    if (this.continueGameMenuItem.disabled) {
      this.proceedWithNewGame();
    } else {
      this.subscriptions.push(
        this.matDialog.open(ConfirmNewGameDialogComponent).afterClosed().subscribe(ok => {
          if (ok) {
            this.proceedWithNewGame();
          }
        })
      );
    }
  }

  /**
   * Play game.
   */
  private playGame(): void {
    this.uiTransitionService.deactivate();
    (this.uiTransitionService.game.scene.getScene('Main') as any).playTest();
  }

  /**
   * Proceed with new game.
   */
  private proceedWithNewGame(): void {
    this.resetGame();
    this.uiTransitionService.transitionUi('chargen', CharacterGenerationComponent);
  }

  /**
   * Reset game state.
   */
  private resetGame(): void {
    this.storeService.namespace(StoreNamespace.Level).clearAll();
    this.storeService.namespace(StoreNamespace.PlayerCharacter).clearAll();
  }
}
