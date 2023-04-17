// Task 2

let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Methods", 
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD",
    );
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// const port = 2412;
var port= process.env.PORT||2412;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let baseUrl = "https://repo-8qu2.onrender.com/studentServer/";

let axios = require("axios");

app.post("/post", async function(req,res) {
    let body = req.body;
    // console.log("Body ->",body);
    let url = body.form.url;
    let method = body.form.method;
    let { hK1, hK2, hK3, hV1, hV2, hV3 } = body.header;
    let token = hV1 ? hV1 : hV2 ? hV2 : hV3 ? hV3 : "";
    if(method === "GET") {
        getApi(res,body);
        return;
    }
    if(method === "POST") {
        postApi(res,body);
        return;
    }
    if(method === "PUT") {
        putApi(res,body);
        return;
    }
    if(method === "DELETE") {
        deleteApi(res,body);
        return;
    }
});

async function getApi(res, body) {
    let url = body.form.url;
    // let method = body.form.method;
    let { hK1, hK2, hK3, hV1, hV2, hV3 } = body.header;
    let token = hV1 ? hV1 : hV2 ? hV2 : hV3 ? hV3 : "";
    try{
        let response = await axios.get(url, { headers : { authorization : token } });
        console.log(response.data);
        res.json(response.data);
    }
    catch(error) {
        if(error.response) {
            let { status, statusText } = error.response;
            console.log("Error :: ", status, statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(error);
    };
}

async function postApi(res, body) {
    console.log("Body Post ->",body);
    console.log("In postApi")
    let url = body.form.url;
    let { hK1, hK2, hK3, hV1, hV2, hV3 } = body.header;
    let token = hV1 ? hV1 : hV2 ? hV2 : hV3 ? hV3 : "";
    let dt = body.form.data;
    console.log("dt :: ",dt);
    // let dt1 = JSON.stringify(dt);
    let data = JSON.parse(dt);
    console.log("DATA :: ",data);
    try{
        let response = await axios.post(url, data, { headers : { authorization : token } });
        console.log(response.data);
        res.json(response.data);
    }
    catch(error) {
        if(error.response) {
            let { status, statusText } = error.response;
            console.log("Error :: ", status, statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(error);
    };
}

async function putApi(res, body) {
    console.log("Body Put ->",body);
    console.log("In putApi")
    let url = body.form.url;
    // let method = body.form.method;
    let { hK1, hK2, hK3, hV1, hV2, hV3 } = body.header;
    let token = hV1 ? hV1 : hV2 ? hV2 : hV3 ? hV3 : "";
    let dt = body.form.data;
    console.log("dt :: ",dt);
    // let dt1 = JSON.stringify(dt);
    let data = JSON.parse(dt);
    console.log("DATA :: ",data);
    try{
        let response = await axios.put(url, data, { headers : { authorization : token } });
        console.log(response.data);
        res.json(response.data);
    }
    catch(error) {
        if(error.response) {
            let { status, statusText } = error.response;
            console.log("Error :: ", status, statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(error);
    };
}

async function deleteApi(res, body) {
    let url = body.form.url;
    // let method = body.form.method;
    let { hK1, hK2, hK3, hV1, hV2, hV3 } = body.header;
    let token = hV1 ? hV1 : hV2 ? hV2 : hV3 ? hV3 : "";
    try{
        let response = await axios.delete(url, { headers : { authorization : token } });
        console.log(response.data);
        res.json(response.data);
    }
    catch(error) {
        if(error.response) {
            let { status, statusText } = error.response;
            console.log("Error :: ", status, statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(error);
    };
}