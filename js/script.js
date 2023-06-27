// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  const currentDate = dayjs();
  const startTime = currentDate.set("hour", 9).set("minute", 0);
  const endTime = currentDate.set("hour", 17).set("minute", 0);

  const rootDivEl = $(".container-fluid");

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

  function saveScheduleData(elementId, textVal) {
    if (textVal === null || textVal === "") {
      alert("Please input a schedule");
    } else {
      let timeSave = JSON.parse(localStorage.getItem("timeSchedule")) || [];
      if (!Array.isArray(timeSave)) {
        timeSave = [];
      }
      timeSave.push({ id: elementId, text: textVal });
      localStorage.setItem("timeSchedule", JSON.stringify(timeSave));
    }
  }

  console.log(rootDivEl);
  console.log(startTime.format("hh:mm A"));
  console.log(endTime.format("hh:mm A"));
  console.log(currentDate.format("h"));

  //div element
  for (let i = startTime.hour(); i <= endTime.hour(); i++) {
    const scheduleHour = currentDate.set("hour", i);
    const formattedHour = scheduleHour.format("h A");

    const hourDiv = $("<div>")
      .attr({
        id: `hour-${i}-${formattedHour.slice(-2)}`,
        "data-time": `${i}`,
        class: "row time-block",
      })
      .appendTo(rootDivEl);

    if (i < currentDate.format("h")) {
      hourDiv.attr("class", "row time-block past");
    } else if (i > currentDate.format("h")) {
      hourDiv.attr("class", "row time-block future");
    } else {
      hourDiv.attr("class", "row time-block present");
    }

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
