const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing"); //npm install @mailchimp/mailchimp_marketing

const app = express();

app.use(express.static("public"));  //to use static files e.g css and img files in the server
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    // res.send("Hello World!");
    res.sendFile(__dirname + "/signup.html");
});

//Setting up MailChimp
mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "8f1f481b96d81688036b4ab9056abae8-us10",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us10"
    });


app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // console.log(firstName, lastName, email);

    // const data = {
    //     members:[
    //         {
    //             email_address: email,
    //             status: "subscribed",
    //             merge_fields: {
    //                 FNAME: firstName,
    //                 LNAME: lastName
    //             }

    //         }
    //     ]
    // };

    const listId = "7317c5561d";

    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
       };

 async function run() {
    try{

 
        
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName 

 
}


}
)
res.sendFile(__dirname + "/success.html")
// console.log(response);
console.log("success");


// if(response.statusCode===200){
//     res.send("Successfully Subscribed");
// } else{
//     res.send("There was an error, please try again later.")
// }

    }

    catch (err) {
        //This is will return the error code
        // console.log(err.status)
        // console.log("failure");
        res.sendFile(__dirname + "/failure.html")
      }
 }
  
  run();
    
    // const jsonData = JSON.stringify(data);

    // const url = "https://us10.api.mailchimp.com/3.0/lists/7317c5561d/members?skip_merge_validation=false";

    // const options = {
    //     method: "POST",
    //     auth: "alizahid:8f1f481b96d81688036b4ab9056abae8-us10"
    // };

    // const request = https.request(url, options, function(response){
    //     response.on("data", function(data){
    //         console.log(JSON.parse(data));
    //     });
    // });

    // request.write(jsonData);
    // request.end;

});

app.post("/failure", function(req, res){
    res.redirect("/");
});



app.listen('3000', function(){
    console.log("Server is running on port 3000.");
});



//API Key
//8f1f481b96d81688036b4ab9056abae8-us10

//List ID
//7317c5561d