
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'nashik',
	port:3306
});




app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

app.post('/poc1', function (req, res) {
	
		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
    	var xyz ={ v1:37, v2:35};
        res.send(xyz);
    });


app.get('/getbook', function (req, res) {

	let input = req.query.book;
	let output = {status:false, bookdetails:{bookid: input, bookname:'',price:0}};

	connection.query("select * from book where bookid = ?", [input], (err, rows) => {
        if (rows.length>0){

			output.status= true;
			output.bookdetails = rows[0];

		}
		res.send(output);
           
	});
		
		
       
    });

	app.get('/getprice', function (req, res) {

		let input = {bookid:req.query.bookid,
		bookname: req.query.bookname,
	bookprice: req.query.bookprice};

		let output = {status:false, bookdetails:{bookid: input, bookname:'',bookprice:0}};
	
		connection.query("update book set price=? where bookid=?", [input.bookprice,input.bookid], (err, rows) => {
			if (err){
	
				// output.status= true;
				// output.bookdetails = rows[0];
	
			}
			else if( rows.affectedRows>0){
				output.status=true;
			}
			res.send(output);
			   
		});
			
			
		   
		});
    
	
       

		




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});