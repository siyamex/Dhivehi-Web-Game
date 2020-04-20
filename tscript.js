// JQUERY
$("#joke-form").on("submit", function(e) {
  e.preventDefault();
  var $answer = $("#respuesta");
  var answer = $answer.val();

  if (answer === "ބައްތި") {
    $("#respuesta").val("");
    $("#checkingText").text("ވަރަށް މޮޅު");
    $(".scrambled").text("ބަސް: ނަވަރުވަ");

    //ESSENTIAL
    $("#joke-form").on("submit", function(e) {
      e.preventDefault();
      var $answer = $("#respuesta");
      var answer = $answer.val();

      if (answer === "ވަނަވަރު") {
        $("#checkingText").text("ވަރަށް މޮޅު");
        $("#respuesta").val("");
        $(".scrambled").text("ބަސް: މަންސްޒަފަރު");

        //ELOTRAIN
        $("#joke-form").on("submit", function(e) {
          e.preventDefault();
          var $answer = $("#respuesta");
          var answer = $answer.val();

          if (answer === "ފަސްމަންޒަރު") {
            $("#checkingText").text("ބަރާބަރު");
            $("#respuesta").val("");
            $(".scrambled").text("ނިމުނީ ...މަރުހަބާ");
          }
        }); //Closing EloTrain eventListener
      } // Closing ->  if (answer === "ESSENTIAL")
    }); // Closing Essential eventListener
  }// Closing if (answer === "JQUERY") 
    
    else if (count < 2) {
    $("#checkingText").text("އަދި މަސައްކަތް ކޮށްލައްވާ");
  } else if (count === 2) {
    $("#checkingText").text("ނުބައޭ އަދިވެސް ނުބައޭ");
  } else if (count > 2) {
    $("#checkingText").text("އަދި ރަނގަޅެއްނުވޭ");
  }
}); //Closing Jquery eventListener

var count = 0;
$("#joke-form").submit(function() {
  count++;
  console.log(count);
});