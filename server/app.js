const { WebSocket, WebSocketServer } = require("ws");
const http = require("http");
const uuidv4 = require("uuid").v4;

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8080;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

const clients = {};

const broadcastMessage = (json) => {
  const data = JSON.stringify(json);

  for (const userId in clients) {
    const client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
};

const handleMessage = (message) => {
  const dataFromClient = JSON.parse(message.toString());
  const json = {};
  switch (dataFromClient.type) {
    case "ready":
      json.type = "ready";
      json.data = {
        playerId: dataFromClient.playerId,
        isReady: dataFromClient.isReady,
      };
      break;
    case "start":
      json.type = "start";
      json.data = { playerId: "fuse12" };
      break;
    case "dice":
      const dice1 = Math.floor(Math.random() * 6 + 1);
      const dice2 = Math.floor(Math.random() * 6 + 1);
      json.type = "dice";
      json.data = { dice1, dice2 };
      break;
    case "endTurn":
      const nextPlayerId =
        dataFromClient.playerId === "fuse12" ? "toko123" : null;
      json.type = "endTurn";
      json.data = { nextPlayerId };
      break;
    case "events":
      const events = [
        {
          title: "이벤트1",
          content: "내용1",
          impact: "효과1",
        },
        {
          title: "이벤트2",
          content: "내용2",
          impact: "효과2",
        },
        {
          title: "이벤트3",
          content: "내용3",
          impact: "효과3",
        },
        {
          title: "이벤트4",
          content: "내용4",
          impact: "효과4",
        },
        {
          title: "이벤트5",
          content: "내용5",
          impact: "효과5",
        },
        {
          title: "이벤트6",
          content: "내용6",
          impact: "효과6",
        },
      ];
      json.type = "events";
      json.data = { events };
      break;
    case "eventResult":
      const newPrizeNumber = Math.floor(
        Math.random() * dataFromClient.events.length
      );
      const eventName = dataFromClient.events[newPrizeNumber];
      json.type = "eventResult";
      json.data = { eventName };
      break;
    default:
      break;
  }
  broadcastMessage(json);
};

const handleDisconnect = (userId) => {
  console.log(`${userId} disconnected.`);
  const json = { type: "disconnect" };
  json.data = { data: userId };
  delete clients[userId];
  broadcastMessage(json);
};

wsServer.on("connection", function (connection) {
  console.log(`Recieved a new connection.`);
  const userId = uuidv4();
  clients[userId] = connection;
  console.log(`User ${userId} connected.`);
  // 클라이언트로부터 메시지를 받았을 때 이벤트 처리
  connection.on("message", (message) => handleMessage(message, userId));
  connection.on("close", () => handleDisconnect(userId));
});
