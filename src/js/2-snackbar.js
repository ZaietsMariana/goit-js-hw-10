import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit)
function handleSubmit(event) {
    event.preventDefault();
   
    const delay = form.elements.delay.value;
    const state = form.elements.state.value;
    
    const promise = new Promise((resolve, reject) => {
        if (state === "fulfilled") {
            setTimeout(() => {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
        }, delay)
        } else {
            setTimeout(() => {
                reject(`❌ Rejected promise in ${delay}ms`); 
            }, delay);
        }
    });
        promise
            .then(value => {
                iziToast.success({
                   title: "Ok",
                   message: `✅ Fulfilled promise in ${delay}ms`,
                    position: "topRight",
                    backgroundColor: "#59A10D",
});
            })
            .catch(error => {
                iziToast.error({
                   title: "Error",
                   message: `❌ Rejected promise in ${delay}ms`,
                    position: "topRight",
                    backgroundColor: "#EF4040",
                });
            });
        event.target.reset();
    };
