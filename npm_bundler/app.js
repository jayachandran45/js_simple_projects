import { v4 } from "uuid";
const h1ele = document.createElement("h1");
h1ele.innerHTML = v4();
document.body.appendChild(h1ele);
