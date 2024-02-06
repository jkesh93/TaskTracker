# Task Management Web Application

This Task Management Web Application enables users to add, edit, and delete tasks. It also supports importing tasks from a CSV file, making it easy to bulk add tasks. The application uses HTML, CSS (Bootstrap), and JavaScript, with no backend dependencies, making it simple to set up and run on any static web server.

## Features

- **Add Tasks**: Users can add new tasks with details such as title, description, priority, deadline, and status.
- **Edit Tasks**: Each task can be edited inline, allowing users to update any piece of information.
- **Delete Tasks**: Tasks can be deleted individually.
- **Import Tasks**: Tasks can be imported in bulk from a CSV file.
- **Responsive Design**: Built with Bootstrap, the application is fully responsive and works on mobile devices.

## Installation / Setup
To get the application running on your local machine, follow these steps:
cd path/to/repository
open index.html # On macOS

## Usage

- **Adding a Task**: Fill out the form with the task's details and click the "Add Item" button.
- **Editing a Task**: Click the "Edit" button (pencil icon) next to any task, make your changes, and then click the "Save" button (diskette icon).
- **Deleting a Task**: Click the "Delete" button (trash bin icon) next to any task you wish to remove.
- **Importing Tasks**: Click the "Import from CSV" button, select a CSV file with the format Title,Description,Priority,Deadline,Status, and the tasks will be automatically added.

## CSV Format
When importing tasks from a CSV file, ensure the file follows this format:

Title,Description,Priority,Deadline,Status
"Task 1","Description 1","High","2023-01-01","Not Started"
"Task 2","Description 2","Medium","2023-01-02","In Progress"
...

## License
This project is open-source and available under the MIT License.