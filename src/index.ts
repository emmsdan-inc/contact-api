import App from "./app";
import Contact from "./controller/contact";
import LiveEvents from "./services/socket";
import Database from "./database";

const Module = new App("myContaxt");

// register a global middleware
Module.Middlewares([]);

// register app controllers
Module.Controllers([new Contact()]);

// register services
Module.Services([
    { name: 'LiveEvents', handler: LiveEvents },
    { name: 'Database', handler: Database },
])

// start app server
Module.Start();