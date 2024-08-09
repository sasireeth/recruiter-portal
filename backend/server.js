const cors = require('cors');
const bodyParser = require('body-parser');
const {connectToMongoDB}= require('./config/db')
const {app,server}=require('./socket/socket');
require('dotenv').config();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/applications', require('./routes/applications'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/users', require('./routes/users'));


// Scheduler example for notifications


const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToMongoDB();
});
