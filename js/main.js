const serverUrl = "https://api.funtranslations.com/translate/minion.json?text=";
const input = document.querySelector("input");
const output = document.querySelector(".output");
const form = document.querySelector("form");
const loader = document.querySelector(".loader-bcg");
const btn = document.querySelector("button");

form.addEventListener("submit", submitHandler);

function submitHandler(e) {
  e.preventDefault();
  let translateText = input.value;
  let endpoint = serverUrl + translateText;
  loader.style.display = "flex";
  btn.style.display = "none";
  fetch(endpoint)
    .then((res) => res.json())
    .then((json) => {
      const translatedText = json.contents.translated;
      loader.style.display = "none";
      btn.style.display = "block";
      const title = `<div class="output-title">Translation <span class="translate-text"> (${translateText})</span>:</div>`;
      const innerH = `${title}<div class="translation">&#10132; ${translatedText}</div>`;
      // output.innerText = translatedText;
      output.innerHTML = innerH;
    })
    .catch((e) => console.log("error occured: ", e));
}

const mouseMoveArea = document.querySelector("body");

mouseMoveArea.addEventListener("mousemove", (e) => {
  const eye = document.querySelector(".eye-ball");
  const area = e.currentTarget.getBoundingClientRect();
  let x = e.pageX / area.width;
  let y = e.pageY / area.height;

  if (x > 0.5) {
    x = x - 0.5;
    x = x / 0.5;
    x = lerp(0, 10, x);
  } else {
    x = x / 0.5;
    x = lerp(-10, 0, x);
    // x = x * -1;
  }
  if (y > 0.2) {
    y = y - 0.2;
    y = y / 0.2;
    y = lerp(0, 6, y);
  } else {
    y = y / 0.2;
    y = lerp(-8, 0, y);
  }
  //   console.log(x, y);

  //   const translateValue = `translateX(${x}px)`;
  const translateValue = `translate(${x}px,${y}px)`;
  eye.style.transform = translateValue;
  //   console.log(lerp(0, 16, x));
});

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}
