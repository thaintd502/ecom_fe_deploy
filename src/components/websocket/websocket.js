import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

export function connect(onMessageCallback, token) {
  if (!token) {
    console.warn("❗ JWT token is missing. WebSocket will not connect.");
    return;
  }

  const socket = new SockJS(`http://localhost:9090/ws?token=${token}`); // Thêm token vào query param

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("🔌 Connected to WebSocket");

      // Lắng nghe message riêng theo user
      stompClient.subscribe('/user/queue/private', (message) => {
        console.log("📥 Notification received:", message.body);
        if (onMessageCallback) {
          onMessageCallback(message.body);
        }
      });
    },
    onDisconnect: () => {
      console.log("🛑 Disconnected from WebSocket");
    },
    debug: (str) => console.log(str),
  });

  stompClient.activate();
}

export function disconnect() {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log("🔌 WebSocket connection closed");
  }
}
