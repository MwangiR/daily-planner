# Daily-Planner

## Link

[Daily Planner](https://mwangir.github.io/daily-planner/)

## Screenshot

![Daily Planner](./images/Screenshot%201.gif)

### Test Screenshot

![Daily Planner](./images/Test%20Screenshot.png)

# Purpose

The main purpose of this code is to create a schedule planner that allows users to input and save tasks for different hours of the day. The code dynamically generates time blocks for each hour between a specified start time and end time. It also retrieves and displays any previously saved schedule data from local storage.

# Usage

To use this code, follow these steps:

Make sure you have the jQuery library included in your HTML file.
Wrap all the code that interacts with the DOM inside a

```Javascript
$(function () {
    // Your code here
})
```

function to ensure it runs after the browser has finished rendering all the elements in the HTML.

# Displaying Current Date

The code retrieves the current date using the dayjs library and displays it in the #currentDay element.

# Retrieving Schedule Data

The retrieveScheduleData function retrieves any previously saved schedule data from local storage and updates the corresponding elements in the schedule planner. It loops through the stored data, finds the target elements based on their IDs, and sets the values of their textarea elements.

# Displaying Toast Messages

The showToast function creates and displays a toast message. It takes a message and a background color as parameters and dynamically creates the necessary HTML elements to show the toast.

# Saving Schedule Data

The saveScheduleData function is called when the user clicks the save button for a specific time block. It first checks if the input text is empty and displays an error message if it is. If the input is not empty, it retrieves the stored schedule data, checks if a similar task is already present, and updates the existing task or adds a new task accordingly. The updated schedule data is then stored in local storage, and a success message is displayed.

# Creating Time Blocks

The code dynamically creates time blocks for each hour between a specified start time and end time. It iterates over the hours and creates a div element for each hour with a unique ID. Each time block includes an hour column, a textarea for inputting tasks, and a save button. The class of the time block is set based on whether it is in the past, present, or future.

# Event Listener

An event listener is added to the save buttons within the time blocks. When a save button is clicked, the corresponding parent time block element is identified, and the ID and value of the textarea within that time block are passed to the saveScheduleData function to save the task.

### Note

This README provides an overview of the code functionality and usage. Additional information about external dependencies and integration into a larger project may be necessary.
