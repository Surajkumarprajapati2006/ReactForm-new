import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';    
import connectDB from './config/db.js';
import turfRoutes from './routes/turfRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';


const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get('/',(req, res) =>{
    res.send('This is root!');
});

app.use('/api/auth', authRoutes);  
app.use('/api/user', userRoutes);  
app.use('/api/turf', turfRoutes); 
app.use('/api/booking', bookingRoutes); 
app.use('/api/dashboard', dashboardRoutes);





app.listen(port, () => {
    console.log('server is running ');
});
