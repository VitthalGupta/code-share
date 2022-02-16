import { express } from 'express'; 
import connectDB from './config/db';

const  app = express();

// connect to database

connectDB();  

// define routes

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url '));

app.use(express.json({extented: false}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server started on port ${port}'));