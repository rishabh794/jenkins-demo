const http = require("http");

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Backend is running" }));
});

server.listen(5000, () => {
  console.log("Backend listening on port 5000");
});
