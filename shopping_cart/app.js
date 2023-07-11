const aEle = document.querySelectorAll("a");
const path = window.location.pathname;
aEle.forEach((e) => {
  if (e.href.includes(path)) {
    e.classList.add("active");
  }
});
console.log(path, typeof path);
