let express = require("express");
let app = express();

app.use(express.json());
app.use("/client", express.static("./client", ));

let msg = []

app.get("/chat", (req, res) => {
    res.type("json");
    res.send({"msg":msg});
    res.end();
});

app.post("/chat", (req, res) => {
    console.log(req.body);
    msg.push(req.body);
    res.end();
});

app.listen(8000, () => {
    console.info("Server running at localhost:8000");
});