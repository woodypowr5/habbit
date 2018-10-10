import { SharedModule } from './../shared/shared.module';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent, HomeCarouselComponent],
    imports: [SharedModule],
    providers: []
})
export class PagesModule {}
