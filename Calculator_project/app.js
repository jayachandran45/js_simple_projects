const keysEle = document.querySelectorAll("button");
const equalEle = document.querySelector("#equal");

// add event listener for all the keys
keysEle.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    const outputEle = document.querySelector("#output-field");
    const inputEle = document.querySelector("#input-field");
    const operationEle = document.querySelector("#operant-field");

    // for operant 1
    if (
      e.target.hasAttribute("data-operant") &&
      (outputEle.value === "" || operationEle.value === "")
    ) {
      inputEle.value = "";
      outputEle.value += e.target.innerHTML;
      console.log(ele.innerHTML);
    }
    if (e.target.hasAttribute("data-operation") && operationEle.value === "") {
      operationEle.value = e.target.innerHTML;
      console.log(e.innerHTML, "go3w");
    }
    if (
      e.target.hasAttribute("data-operant") && // Fix typo here
      outputEle.value !== "" &&
      operationEle.value !== ""
    ) {
      inputEle.value += e.target.innerHTML;
      console.log(e.innerHTML);
    }

    // evaluation
    equalEle.addEventListener("click", () => {
      if (
        outputEle.value !== "" &&
        inputEle.value !== "" &&
        operationEle.value !== ""
      ) {
        // get values and perform operation
        let opr1 = outputEle.value;
        let opr = operationEle.value;
        let opr2 = inputEle.value;

        let result;

        // Perform the arithmetic operation based on the selected operation
        switch (opr) {
          case "+":
            result = parseInt(opr1) + parseInt(opr2);
            break;
          case "-":
            result = parseInt(opr1) - parseInt(opr2);
            break;
          case "*":
            result = parseInt(opr1) * parseInt(opr2);
            break;
          case "/":
            result = parseInt(opr1) / parseInt(opr2);
            break;
          default:
            result = "Invalid operation";
        }

        outputEle.value = "";
        operationEle.value = "";
        inputEle.value = result;
      }
    });
  });
});
