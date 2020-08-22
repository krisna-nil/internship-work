const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
var path = require('path')
const app = express();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const fileupload = require('express-fileupload')

// parse requests of content-type: application/json
app.use(bodyParser.json(),fileupload());

app.post('/upload', (req, res) => {
  const fileName = req.files.prescription.name
  const path = __dirname + '/uploads/images/' + fileName
  console.log("-----------in app post upload--------------");
  console.log("req.files = ",req.files);
  console.log("path = ",path);
  let image = req.files.prescription;
  image.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
  })
})
// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cookieParser())
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/css", express.static(path.join(__dirname, '/resources/templates/css')));
app.use("/images", express.static(path.join(__dirname, '/resources/templates/images')));
app.use("/js", express.static(path.join(__dirname, '/resources/templates/js')));
// simple route

app.post('/upload', upload.array("prescription"), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.get("/", (req, res) => {
   res.sendFile( __dirname + "/resources/templates/html/" + "index.html" );
});
// Route of logging user out of application and redirecting to home page
app.get("/logout_users", (req, res) => {
    res.sendFile( __dirname + "/resources/templates/html/" + "index.html" );
});
app.get("/users_givefeedback", (req, res) => {
 res.sendFile( __dirname + "/resources/templates/html/" + "feedbackform.html" );
});
app.get("/users_seefeedback", (req, res) => {
  res.sendFile( __dirname + "/resources/templates/html/" + "All_feedback.html" );
 });
app.get("/medicines_update", (req, res) => {
   res.sendFile( __dirname + "/resources/templates/html/" + "medupdate.html" );
 });
 app.get("/medicines_add", (req, res) => {
   res.sendFile( __dirname + "/resources/templates/html/" + "medadd.html" );
 });
//
 app.get("/company_detail", (req, res) => {
   res.sendFile( __dirname + "/resources/templates/html/" + "company_detail.html" );
 });
//
 app.get("/patient_registration", (req, res) => {
    res.sendFile( __dirname + "/resources/templates/html/" + "patient_detail.html" );
 });

 app.get("/medicine_stock", (req, res) => {
    res.sendFile( __dirname + "/resources/templates/html/" + "medicine_stock.html" );
 });

 app.get("/medic", (req, res) => {
    res.sendFile( __dirname + "/resources/templates/html/" + "exp.html" );
 });
 // Route /myorders is for list of orders for delivery boys, not functional
// app.get("/my_orders", (req, res) => {
  //  res.sendFile( __dirname + "/resources/templates/html/" + "my_orders.html" );
 //});
 app.get("/carts", (req, res) => {
    res.sendFile( __dirname + "/resources/templates/html/" + "cart.html" );
});
 app.get("/porders", (req, res) => {
    res.sendFile( __dirname + "/resources/templates/html/" + "porders.html" );
 });

 app.get("/corder", (req, res) => {
   res.sendFile( __dirname + "/resources/templates/html/" + "corder.html" );
 });

 app.get("/upload_prescription", (req, res) => {
    res.sendFile( __dirname + "/resources/templates/html/" + "upload_prescription.html" );
 });

 // Route /delivery is for delivery boy's registration page , not functional
 //app.get("/delivery", (req, res) => {
   // res.sendFile( __dirname + "/resources/templates/html/" + "delivery.html" );
 //});

app.get("/login_users", (req, res) => {
   res.sendFile( __dirname + "/resources/templates/html/" + "login.html" );
 });

// This Route is for Testing Purpose, Remove it after ChatBot Integration is done.
// Also botTest.html in resources/templates/html is for testing purpose.
app.get('/botTest', function(req, res){
  res.sendFile( __dirname + "/resources/templates/html/" +'botTest.html');
});

app.post("/botTalk", function(req, res){

  // botIpAdd is the IP address of Flask Server, change it if required
  const botIpAdd = "http://127.0.0.1:8000";

  const user_input= req.body.user_input;
  const bot_url = botIpAdd + "/botTalk?user_input="+user_input;
  const requestOptions = {
     method : 'GET',
     url : bot_url,
     headers : {
        "content-type" : "application/json"
     },
     json : true
  }
  request(requestOptions, function(err, response, body){

    if (err){
      console.log(err);
      res.send("Some Error Occured. Try Again");
    }
    else{
      res.send(body);
    }
  });
});


require("./routes/storeRoutes.js")(app);
require("./routes/medicineRoutes.js")(app);

require("./routes/OrderRoute.js")(app);
require("./routes/MedicineRoute.js")(app);

require("./routes/customerRoutes.js")(app);
require("./routes/paymentRoute.js")(app);

require("./routes/loginRoute.js")(app);

// set port, listen for requests
app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});
