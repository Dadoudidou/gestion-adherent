import serverApp from "./app";



serverApp()
.then(async (server) => {
    await server.start();
    console.log(`Serveur démarré à l'url : ${server.info.uri}`);
})
.catch((err) => {
    console.log(err);
    process.exit(err.message);
})
