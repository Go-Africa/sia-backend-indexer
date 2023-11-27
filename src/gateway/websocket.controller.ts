// // Dans votre contrôleur ou service NestJS
// import { Controller, Get } from '@nestjs/common';
// import { WebSocketService } from './websocket.service';

// @Controller()
// export class AppController {
//   constructor(private readonly webSocketService: WebSocketService) {}

//   @Get('subscribe-to-websocket')
//   subscribeToWebSocket(): void {
//     this.webSocketService.listenForEvents().subscribe(data => {
//       // Faites quelque chose avec les données reçues
//       console.log('Received data from WebSocket:', data);
//     });
//   }
// }
