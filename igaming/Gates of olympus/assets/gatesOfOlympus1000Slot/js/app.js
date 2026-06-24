document.addEventListener("DOMContentLoaded", function () {
  const e = document.querySelector(".animation-images");
  !(function (e) {
    let t = 150;
    e.forEach((e) => {
      setTimeout(
        () => {
          e.style.display = "block";
        },
        (t += 100)
      );
    });
  })(Array.from(e.querySelectorAll(".animation-images__item")));
});
