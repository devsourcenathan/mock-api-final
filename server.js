// JSON Server module
const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const tmpDir = path.join(process.cwd(), "tmp"); // Chemin vers le dossier temporaire

// Vérifiez si le dossier temporaire existe, sinon le crée
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
}

const server = jsonServer.create();
const router = jsonServer.router("db.json");

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use("/tmp", jsonServer.static(tmpDir));

// Add this before server.use(router)
server.use(
    // Add custom route here if needed
    jsonServer.rewriter({
        "/api/*": "/$1",
    })
);
server.use(router);
// Listen to port
server.listen(3000, () => {
    console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;