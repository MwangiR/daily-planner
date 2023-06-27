// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const currentDate = dayjs();
  const startTime = currentDate.set("hour", 9).set("minute", 0);
  const endTime = currentDate.set("hour", 17).set("minute", 0);

  const rootDivEl = $(".container-fluid");

  console.log(rootDivEl);
  console.log(startTime.format("hh:mm A"));
  console.log(endTime.format("hh:mm A"));

  //div element
  for (let i = startTime.hour(); i <= endTime.hour(); i++) {
    const scheduleHour = currentDate.set("hour", i);
    const formattedHour = scheduleHour.format("h A");

    const hourDiv = $("<div>")
      .attr({
        id: `hour-${i}-${formattedHour.slice(-2)}`,
        class: "row time-block past",
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
  }

  //eventListener
  $(".time-block button").on("click", function () {
    const parentEl = $(this).closest(".time-block");
    const elementId = parentEl.attr("id");
    const textVal = parentEl.find("textarea").val();
    if (textVal === null || textVal === "") {
      alert("input schedule");
      $(".saveBtn").attr("disabled");
    } else {
      console.log(elementId);
      console.log(textVal);
    }
  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
