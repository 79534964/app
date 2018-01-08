// 动画
import 'web-animations-js/web-animations.min';

// 连同angular编译器一起发布到浏览器
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// angular编译器在浏览器中编译并引导该应用
platformBrowserDynamic().bootstrapModule(AppModule);
