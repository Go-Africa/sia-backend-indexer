// // Dans votre service ou contrôleur NestJS

// import { Injectable } from '@nestjs/common';
// import { Socket } from 'socket.io-client';
// import { Client, ClientProxy, Transport } from '@nestjs/microservices';
// import { Observable } from 'rxjs';

// @Injectable()
// export class WebSocketService {
//   private socket: Socket;

//   constructor() {
//     // Spécifiez l'URL de votre serveur WebSocket
//     this.socket = require('socket.io-client')('http://localhost:3000'); // Remplacez par le bon port et le bon protocole
//   }

//   // Méthode pour établir la connexion et écouter les événements
//   listenForEvents(): Observable<any> {
//     return new Observable(observer => {
//       this.socket.on('connect', () => {
//         console.log('Connected to WebSocket');

//         // S'abonner aux événements WebSocket
//         this.socket.on('task', (data) => {
//           observer.next(data);
//         });
//       });

//       this.socket.on('disconnect', () => {
//         console.log('Disconnected from WebSocket');
//         observer.complete();
//       });
//     });
//   }
// }
