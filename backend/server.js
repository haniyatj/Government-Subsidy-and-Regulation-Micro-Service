const express = require('express');
const http = require('http');
const path = require('path');
const multer = require('multer');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const subsidySearchRoutes = require('./routes/subsidySearchRoutes');
const subsidyApplicationRoutes = require('./routes/ApplicationRoutes');
const regulationsRoutes = require('./routes/regulations');
const documentRoutes = require('./routes/documentRoutes'); 
const Subsidy=require('./routes/subsidyRoutes')

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:4000', // Adjust as necessary
        methods: ['GET', 'POST'],
        credentials: true,
    },
});


app.use(express.json());
// Allow requests from specific origins
app.use(cors({ origin: 'http://localhost:5173' }));

// Allow requests from all origins (if needed)
app.use(cors());
// Routes

app.use('api/subsidy', subsidySearchRoutes);
app.use('/api/subsidies', Subsidy); //subsidy routes
app.use('/api/subsidyapplications', subsidyApplicationRoutes);
app.use('/api/regulations', regulationsRoutes);

// Document upload routes (added here)
// Document upload routes (added here)
//app.use('/api/upload', uploadRoutes); 
// Document routes
app.use('/api/upload', documentRoutes);


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
