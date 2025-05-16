const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (userId) => {
    console.log(`User ${userId} joined`);
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
    }
  });

  socket.on('requestAppointment', (appointment) => {
    // Emit to SCAD admin
    const scadAdminId = 'scad_admin';
    const scadSocketId = connectedUsers.get(scadAdminId);
    if (scadSocketId) {
      io.to(scadSocketId).emit('newScadAppointment', appointment);
    }
  });

  socket.on('acceptAppointment', ({ appointmentId, studentId, appointmentDetails }) => {
    // Emit to SCAD admin
    const scadAdminId = 'scad_admin';
    const scadSocketId = connectedUsers.get(scadAdminId);
    if (scadSocketId) {
      io.to(scadSocketId).emit('studentAcceptedAppointment', { appointmentDetails });
    }
  });

  socket.on('rejectAppointment', ({ appointmentId, studentId }) => {
    // Emit to SCAD admin
    const scadAdminId = 'scad_admin';
    const scadSocketId = connectedUsers.get(scadAdminId);
    if (scadSocketId) {
      io.to(scadSocketId).emit('studentRejectedAppointment', { appointmentId, studentId });
    }
  });

  socket.on('callUser', ({ to, appointmentId, signal, from }) => {
    const toSocketId = connectedUsers.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('incomingCall', { from, appointmentId, signal });
    }
  });

  socket.on('acceptCall', ({ to, signal }) => {
    const toSocketId = connectedUsers.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('callAccepted', { signal });
    }
  });

  socket.on('rejectCall', ({ to }) => {
    const toSocketId = connectedUsers.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('callRejected');
    }
  });

  socket.on('endCall', ({ to }) => {
    const toSocketId = connectedUsers.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('callEnded');
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 