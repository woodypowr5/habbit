import { SharedModule } from './../shared/shared.module';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TosComponent } from './tos/tos.component';
import { ReportComponent } from './report/report.component';
import { FeatureComponent } from './feature/feature.component';
import { LegalComponent } from './legal/legal.component';
import { AboutComponent } from './about/about.component';
import { MissionComponent } from './mission/mission.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
    declarations: [HomeComponent, HomeCarouselComponent, SubscribeComponent, PrivacyComponent, TosComponent, ReportComponent, FeatureComponent, LegalComponent, AboutComponent, MissionComponent, CareersComponent, ContactComponent],
    imports: [SharedModule],
    providers: []
})
export class PagesModule {}
