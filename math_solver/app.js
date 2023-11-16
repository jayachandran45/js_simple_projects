const inputEle = document.querySelector("#input");
const countBtnEle = document.querySelector("#calc-btn");

countBtnEle.addEventListener("click", () => {
  const arr = inputEle.value.split(/[ +-]/);
  console.log(arr);
});
