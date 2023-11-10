"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors();
    app.use((0, helmet_1.default)());
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('APP_PORT');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Backend')
        .setDescription('Full api for the SIA indeser')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT, () => console.log(`Application bootstrap on port ${PORT} 💆😇️ `));
}
bootstrap();
//# sourceMappingURL=main.js.map