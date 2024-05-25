import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
const dateInput = document.getElementById("datetime-picker");

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
       userSelectedDate = selectedDates[0];
      if (userSelectedDate < new Date()) {
      iziToast.error({
              title: "Error",
              message: "Please choose a date in the future",
               position: "topRight",
                    backgroundColor: "#EF4040",
          }); 
      startBtn.setAttribute("disabled","");
    } else {
      startBtn.removeAttribute("disabled", "");
    }
  },
};
 
flatpickr(dateInput, options);

startBtn.addEventListener("click", () => {
   if (timerInterval) {
    clearInterval(timerInterval);
  }
 
  startBtn.setAttribute("disabled", "");
  dateInput.setAttribute("disabled", "");

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const diferenceTime = userSelectedDate - currentTime;

    if (diferenceTime <= 0) {
      clearInterval(timerInterval);
      startBtn.removeAttribute("disabled", "");
      startBtn.setAttribute("disabled", "");
      // iziToast.success({ title: "Success", message: "Countdown finished!", position: "topRight" });
    } else {
      redactedTime(diferenceTime);
    }

  },1000) 
});

const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

function redactedTime(diferenceTime) {
  const { days, hours, minutes, seconds } = convertMs(diferenceTime);
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
     
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));  
console.log(convertMs(140000)); 
console.log(convertMs(24140000)); 



