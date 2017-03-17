import Server from 'socket.io';

const port = 8090;

export default function startServer(store) {
    const io = new Server().attach(port);
    console.log("Server started on port : " + port);
    store.subscribe(() => io.emit('state', store.getState().toJS()));

    io.on('connection', (socket) => {
      socket.emit('state', store.getState().toJS());
      socket.on('action', store.dispatch.bind(store));
    })
}
