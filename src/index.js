let express = require("express");
let app = express();
let fs = require("fs");

let student = {
  student3: {
    id: "3",
    firstName: "Ivan",
    lastName: "Ivanov",
    group: "VIS21",
    createdAt: "2020-03-02T12:41:09.533Z", // дата создания
    updatedAt: "2020-03-02T12:45:02.121Z" // дата редактирования
  }
};

let studentPut = {
  firstName: "Pavel"
};

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/students", (req, res) => {
  fs.readFile(__dirname + "/" + "students.json", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/students", (req, res) => {
  fs.readFile(__dirname + "/" + "students.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    data["student3"] = student["student3"];
    res.end(JSON.stringify(data));
  });
});

app.get("/students/:id", (req, res) => {
  fs.readFile(__dirname + "/" + "students.json", "utf-8", (err, data) => {
    let students = JSON.parse(data);
    let student = students["student" + req.params.id];
    res.send(JSON.stringify(student));
  });
});

app.delete("/students/:id", (req, res) => {
  fs.readFile(__dirname + "/" + "students.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    delete data["student" + req.params.id];
    res.end(JSON.stringify(data));
  });
});

app.put("/students/:id", (req, res) => {
  fs.readFile(__dirname + "/" + "students.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    data["student" + req.params.id][studentPut.firstName] =
      studentPut.firstName;
    res.send(JSON.stringify(data));
  });
});

app.listen(8080, () => {
  console.log("Server running");
});
