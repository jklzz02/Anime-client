import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfimModalComponent } from './confim-modal/confim-modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AnimeSelectComponent } from './anime-select/anime-select.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { SingleDropdownComponent } from './single-dropdown/single-dropdown.component';
import { MultiDropdownComponent } from './multi-dropdown/multi-dropdown.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { VideoEmbedComponent } from './video-embed/video-embed.component';

@NgModule({
  declarations: [
    ConfimModalComponent,
    PaginationComponent,
    AnimeSelectComponent,
    UserSelectComponent,
    SingleDropdownComponent,
    MultiDropdownComponent,
    SpinnerComponent,
    VideoEmbedComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ConfimModalComponent,
    PaginationComponent,
    AnimeSelectComponent,
    UserSelectComponent,
    SingleDropdownComponent,
    MultiDropdownComponent,
    SpinnerComponent,
    VideoEmbedComponent,
  ],
})
export class SharedModule {}
