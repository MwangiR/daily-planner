// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  const currentDate = dayjs();
  //for test purposes one can change start time to ("hour", 0)
  //and endtime to ("hour", 23)
  //to see past present and future
  const startTime = currentDate.set("hour", 9).set("minute", 0);
  const endTime = currentDate.set("hour", 17).set("minute", 0);
  const rootDivEl = $(".container-fluid");
  let hourDiv;

  //display current date
  const displayCurrentDate = $("#currentDay").text(currentDate.format("dddd DD, MMMM YYYY"));

  console.log(rootDivEl);
  console.log(startTime.format("hh:mm A"));
  console.log(endTime.format("hh:mm A"));

  /**
   * Retrieve schedule data from local storage and update the corresponding elements.
   *
   * @return {undefined} No return value.
   */
  function retrieveScheduleData() {
    const storedData = localStorage.getItem("timeSchedule");
    if (storedData) {
      const storedArray = JSON.parse(storedData);

      storedArray.forEach((storedObj) => {
        const elementId = storedObj.id;
        const textVal = storedObj.text;

        if (elementId && textVal) {
          const targetElement = $("#" + elementId);
          if (targetElement.length > 0) {
            targetElement.find("textarea").val(textVal);
          }
        }
      });
    }
  }

  //retrieive schedule data on page load
  retrieveScheduleData();

  /**
   * Create and display a toast message.
   *
   * @param {string} message - The message to display in the toast.
   * @param {string} background - The background color of the toast.
   * @return {undefined} This function does not return a value.
   */
  function showToast(message, background) {
    const toastContainer = $("<div>")
      .attr({
        class: "toast-container position-fixed top-0 end-0 p-3",
        role: "alert",
        ariaLive: "assertive",
        ariaAtomic: "true",
      })
      .appendTo(rootDivEl);

    const liveToast = $("<div>")
      .attr({
        id: "liveToast",
        class: "toast",
        role: "alert",
        ariaLive: "assertive",
        ariaAtomic: "true",
      })
      .appendTo(toastContainer);

    const toastBody = $("<div>").text(message).appendTo(liveToast);

    if (background) {
      toastBody.removeClass().addClass(`toast-body ${background} text-white`);
    }

    const toast = new bootstrap.Toast(liveToast);
    toast.show();
  }

  /**
   * Saves schedule data.
   *
   * @param {string} elementId - The ID of the element.
   * @param {string} textVal - The value of the text.
   */
  function saveScheduleData(elementId, textVal) {
    if (textVal === null || textVal === "") {
      //alertToast("Please input Task");
      showToast("Please input Task", "bg-danger");
      return;
    } else {
      //get the stored data
      let timeSave = JSON.parse(localStorage.getItem("timeSchedule")) || [];
      if (!Array.isArray(timeSave)) {
        timeSave = [];
      }
      //check if the textval is the same as storedvalue
      const storedTextVal = timeSave.find((obj) => obj.id === elementId)?.text;
      if (storedTextVal && textVal.length === storedTextVal.length) {
        showToast("Similar task present", "bg-warning");
        return;
      }

      //stores values with similar ids instead of creating objects with the same ID
      const existingObjIndex = timeSave.findIndex((obj) => obj.id === elementId);
      if (existingObjIndex !== -1) {
        timeSave[existingObjIndex].text = textVal;
      } else {
        timeSave.push({ id: elementId, text: textVal });
      }

      //timeSave.push({ id: elementId, text: textVal });
      localStorage.setItem("timeSchedule", JSON.stringify(timeSave));

      showToast("Saved successfully", "bg-primary");
    }
  }

  // console.log(currentDate.format("h"));

  //div element(iterates through start time and end time creating time boxes for each hour)
  //sets id as hour
  for (let i = startTime.hour(); i <= endTime.hour(); i++) {
    const scheduleHour = currentDate.set("hour", i);
    const formattedHour = scheduleHour.format("ha");

    hourDiv = $("<div>")
      .attr({
        id: `hour-${i}-${formattedHour.slice(-2)}`,
        "data-time": `${i}`,
        class: "row time-block",
      })
      .appendTo(rootDivEl);

    const hourColumn = $("<div>")
      .attr({
        class: "col-2 col-md-1 hour text-center py-3",
      })
      .text(formattedHour)
      .appendTo(hourDiv);

    const textAreaColumn = $("<textarea>")
      .attr({
        class: "col-8 col-md-10 description",
        rows: 3,
      })
      .appendTo(hourDiv);

    const saveBtn = $("<button>")
      .attr({
        class: "btn saveBtn col-2 col-md-1",
        "aria-label": "save",
      })
      .appendTo(hourDiv);

    const saveBtnIcon = $("<i>")
      .attr({
        class: "fas fa-save",
        "aria-hidden": "true",
      })
      .appendTo(saveBtn);

    //check if the hour is past, present or future
    const hourTime = dayjs().hour(i).startOf("hour");

    if (hourTime.isBefore(dayjs(), "hour")) {
      hourDiv.addClass("past");
    } else if (hourTime.isAfter(dayjs(), "hour")) {
      hourDiv.addClass("future");
    } else {
      hourDiv.addClass("present");
    }

    // retievev and display saved data for current hour div
    retrieveScheduleData();
  }

  //eventListener
  $(".time-block button").on("click", function () {
    const parentEl = $(this).closest(".time-block");
    const elementId = parentEl.attr("id");
    const textVal = parentEl.find("textarea").val();

    //save schedule data
    saveScheduleData(elementId, textVal);
  });
});
