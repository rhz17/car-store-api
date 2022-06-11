const appController = require("./appController");

// Run server
appController.listen(2000, () => {
  console.log("listening");
});
