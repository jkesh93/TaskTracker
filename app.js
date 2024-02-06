document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('workItemForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Retrieve form values
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;
        const deadline = document.getElementById('deadline').value;
        const status = document.getElementById('status').value;

        // Create a new row for the work item
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${title}</td>
            <td>${description}</td>
            <td>${priority}</td>
            <td>${deadline}</td>
            <td>${status}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn"><i class="bi bi-pencil-square"></i></button>
				<button class="btn btn-danger btn-sm delete-btn"><i class="bi bi-trash"></i></button>
            </td>
        `;

        // Add the new row to the table
        document.getElementById('itemList').appendChild(newRow);

        // Clear the form
        this.reset();
    });

    document.getElementById('itemList').addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn')) {
            const tr = e.target.closest('tr');
            const cells = tr.querySelectorAll('td:not(:last-child)'); // Exclude the action buttons cell

            // Convert cells to editable fields
            cells.forEach((cell, index) => {
                const currentValue = cell.innerText;
                cell.innerHTML = '';
                if (index === 0) { // Title
                    cell.appendChild(createInputElement('text', currentValue));
                } else if (index === 1) { // Description
                    cell.appendChild(createInputElement('textarea', currentValue));
                } else if (index === 2) { // Priority
                    const options = ['High', 'Medium', 'Low'];
                    cell.appendChild(createSelectElement(options, currentValue));
                } else if (index === 3) { // Deadline
                    cell.appendChild(createInputElement('date', currentValue));
                } else if (index === 4) { // Status
                    const options = ['Not Started', 'In Progress', 'Completed'];
                    cell.appendChild(createSelectElement(options, currentValue));
                }
            });

            e.target.textContent = 'Save';
            e.target.classList.replace('edit-btn', 'save-btn');
        } else if (e.target.classList.contains('save-btn')) {
            const tr = e.target.closest('tr');
            const inputs = tr.querySelectorAll('input, select, textarea');
            inputs.forEach((input, index) => {
                const value = input.tagName === 'SELECT' || input.tagName === 'TEXTAREA' ? input.value : input.value;
                if (index === 3) { // Deadline formatting
                    // Adjust formatting if necessary
                }
                input.parentElement.innerText = value;
            });

            e.target.textContent = 'Edit';
            e.target.classList.replace('save-btn', 'edit-btn');
        }
    });

    function createInputElement(type, value) {
        const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
        if (type !== 'textarea') input.type = type;
        input.className = 'form-control';
        input.value = value;
        return input;
    }

    function createSelectElement(options, selectedValue) {
        const select = document.createElement('select');
        select.className = 'form-control';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.text = option;
            optionElement.selected = option === selectedValue;
            select.appendChild(optionElement);
        });
        return select;
    }
});

function exportTasksToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Title,Description,Priority,Deadline,Status\n"; // Column headers

    document.querySelectorAll('#itemList tr').forEach(row => {
        let rowData = Array.from(row.querySelectorAll('td:not(:last-child)')) // Exclude the Actions column
                           .map(td => `"${td.innerText.replace(/"/g, '""')}"`) // Escape double quotes
                           .join(',');
        csvContent += rowData + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tasks.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
}

// Add a button for exporting tasks and attach the function
// <button onclick="exportTasksToCSV()">Export Tasks to CSV</button>

function importTasksFromCSV() {
    const input = document.getElementById('csvFileInput');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const rows = e.target.result.split("\n").slice(1); // Skip header row
        rows.forEach(row => {
            const columns = row.split(',').map(column => column.replace(/"/g, "")); // Remove double quotes
            if (columns.length === 5) { // Ensure row has correct number of columns
                // Add task to table, assuming function addTaskToTable exists
                addTaskToTable(columns[0], columns[1], columns[2], columns[3], columns[4]);
            }
        });
    };

    reader.readAsText(file);
}

function addTaskToTable(title, description, priority, deadline, status) {
    // Implementation to add a new row to the table based on the provided data
    const tableBody = document.getElementById('itemList');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${title}</td>
        <td>${description}</td>
        <td>${priority}</td>
        <td>${deadline}</td>
        <td>${status}</td>
        <td>
            <button class="btn btn-primary btn-sm edit-btn">Edit</button>
			<button class="btn btn-danger btn-sm delete-btn"><i class="bi bi-trash"></i></button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

function generateReports() {
    const statusCounts = { 'Not Started': 0, 'In Progress': 0, 'Completed': 0 };
    document.querySelectorAll('#itemList tr').forEach(row => {
        const status = row.cells[4].innerText; // Assuming status is in the 5th column
        if (status in statusCounts) {
            statusCounts[status]++;
        }
    });

    let reportContent = "Task Summary:\n";
    for (const [status, count] of Object.entries(statusCounts)) {
        reportContent += `${status}: ${count}\n`;
    }

    alert(reportContent); // For simplicity, showing the report as an alert
}

document.getElementById('itemList').addEventListener('click', function(e) {
    if (e.target.closest('.delete-btn')) {
        const tr = e.target.closest('tr');
        tr.remove(); // This removes the task row from the table
    }
});

document.getElementById('csvFileInput').addEventListener('change', function(e) {
    if (this.files.length > 0) {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const rows = e.target.result.split("\n").slice(1); // Skip the header row
            rows.forEach(row => {
                const columns = row.split(',').map(column => column.trim().replace(/"/g, ''));
                if (columns.length === 5) { // Ensure the row has the correct number of columns
                    addTaskToTable(columns[0], columns[1], columns[2], columns[3], columns[4]);
                }
            });
        };

        reader.readAsText(file);
        this.value = ''; // Reset the file input after import
    }
});
