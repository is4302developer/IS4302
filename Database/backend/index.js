const express = require('express');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// GET: Fetch all traceinfo from the database
app.get('/', (req, res) => {
    db.select('*')
        .from('traceinfo')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST: Save CheckIn traceinfo into the database
app.post('/checkin', (req,res) => {
    const {uid, shopName} = req.body;
    db('traceinfo').insert({
        id: uid,
        shop_name: shopName,
    }).then(() => {
        console.log('Checked In');
        return res.json({msg: 'Checked In'});
    })
    .catch((err) => {
        console.log(err);
    });
});

//PUT: Update CheckOut traceinfo into the database
app.put('/checkout', (req,res) => {
    const {uid, shopName} = req.body;
    db('traceinfo')
        .where('id', '=', uid, 'AND', 'shop_name', '=', shopName)
        .update({checkOut: '12:00:00'})
        .then(() => {
            console.log('Checked Out');
            return res.json({msg: 'Checked Out'});
        })
        .catch((err) => {
            console.log(err);
        });
});

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));
