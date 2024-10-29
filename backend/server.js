
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const subsidyRoutes = require('./routes/subsidyRoutes');
//here we can import other routes 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.use(cors());
app.use(express.json());
app.use('/api/subsidyapplications', subsidyRoutes);

connectDB();

io.on('connection', (socket) => {
    console.log('New WebSocket connection:', socket.id);

    socket.on('requestStatusChange', async (id) => {
        try {
            const status = await changeApplicationStatus({ params: { id } });
            io.emit('statusChanged', { applicationId: id, status });
        } catch (error) {
            console.error(error);
        }
    });
});



server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
