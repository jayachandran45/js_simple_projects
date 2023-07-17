const formEle = document.querySelector(".form");
const firstNameEle = document.querySelector("#first-name");
const secondNameEle = document.querySelector("#second-name");
const buttonEle = document.querySelector("#flames");
gsap.from(formEle, { opacity: 0, duration: 0.5, y: -50 });

// function to return alert if the user clicks the button when the input field is empty
function checkInput() {
  if (firstNameEle.value === "" || secondNameEle.value === "") {
    return 0;
  } else {
    return 1;
  }
}

function logic() {
  const name1 = document.querySelector("#first-name").value;
  const name2 = document.querySelector("#second-name").value;
  // clear all the white spaces from the name string
  const name1WithOutWhiteSpace = name1.replace(/\s/g, "");
  const name2WithOutWhiteSpace = name2.replace(/\s/g, "");
  let flameValue =
    name1WithOutWhiteSpace.length + name2WithOutWhiteSpace.length;
  for (let i = 0; i < name1WithOutWhiteSpace.length; i++) {
    let v = name1WithOutWhiteSpace[i];
    for (let j = 0; j < name2WithOutWhiteSpace.length; j++) {
      if (v === name2WithOutWhiteSpace[j]) {
        flameValue -= 2;
      }
    }
  }
  return flameValue;
}
// all function when I clicking the click button
buttonEle.addEventListener("click", () => {
  if (!checkInput()) {
    bootbox.alert({
      message: "Please Enter Two Names and then click! ",
      backdrop: true,
    });
  } else {
    const flameValue = logic();
    if (!flameValue) {
      bootbox.alert({
        message: "Both Name's are same, pls Type a Valid Names",
        backdrop: true,
      });
    }
    while (flameValue) {
      if (flameValue < 7) {
        switch (flameValue) {
          case 1:
            bootbox.alert({
              message: "You'r just <b>Frieds</> &#128527",
              backdrop: true,
            });
            break;
          case 2:
            bootbox.alert({
              message: "&#128152 Hello my Dear, <b>Lover</b>",
              backdrop: true,
            });
            break;
          case 3:
            bootbox.alert({
              message: "<b>Affection,</b> baby &#128139",
              backdrop: true,
            });
            break;
          case 4:
            bootbox.alert({
              message: "<b>Marriage</b> &#128525",
              backdrop: true,
            });
            break;
          case 5:
            bootbox.alert({
              message: "<b>Enemies</b> &#128545",
              backdrop: true,
            });
            break;
          case 6:
            bootbox.alert({
              message: "<b>Sister</b> &#129493",
              backdrop: true,
            });
            break;
        }
        break;
      } else {
        flameValue -= 7;
      }
    }
  }
});
