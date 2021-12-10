const net = require("net");

// const client = new net.Socket();
var server = net.createServer(function (c) {
  //   client.connect(3000, "127.0.0.1", function () {
  //     console.log("Connected");
  //     client.write("Hello C, I am Nodejs");
  //   });

  //   client.on("data", function (data) {
  //     console.log("Received: ", data);
  //   });

  //   client.on("close", function () {
  //     console.log("Connection closed");
  //   });

  c.on("end", function () {
    console.log("server disconnected");
  });

  c.on("error", function (error) {
    console.log(error);
    c.write(error);
  });
  c.on("data", function (data) {
    // data = data.toString();
    // var num = parseInt(data[0], 10);
    // console.log(Math.sqrt(num).toString());
    // c.write(Math.sqrt(num).toString());
    console.log(data);
    // console.log(typeof JSON.parse(data));
    // console.log(JSON.parse(data).name);
    c.write(data);
  });

  c.write("What would you like to do?\n");
  c.write("(S) - Square root <arg>\n");
  //   c.pipe(c);
});

server.listen(3000, "0.0.0.0", function () {
  console.log("server is listening");
});
