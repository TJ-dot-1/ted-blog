import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/database.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();
await connectDB();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ted-blog-5jqu.vercel.app',
    'https://ted-blog-neon.vercel.app'  
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});

app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);



// For now, start the server without MongoDB
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
