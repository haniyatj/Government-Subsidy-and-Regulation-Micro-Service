const express = require('express');
const http = require('http');
const path = require('path');
const multer = require('multer');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const subsidyRoutes = require('./routes/subsidyRoutes');
const subsidySearchRoutes = require('./routes/subsidySearchRoutes');
const subsidyApplicationRoutes = require('./routes/ApplicationRoutes');
const regulationsRoutes = require('./routes/regulations');
const uploadRoutes = require('./routes/documentRoutes'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:4000', // Adjust as necessary
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/subsidyapplications', subsidyRoutes);
app.use('/api/subsidies', subsidySearchRoutes);
app.use('/api/subsidyapplications', subsidyApplicationRoutes);
app.use('/api/regulations', regulationsRoutes);

// Document upload routes (added here)
// Document upload routes (added here)
app.use('/api/upload', uploadRoutes); 


// MongoDB Connection
connectDB();

// WebSocket (Socket.IO) Logic
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

// Start Server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
