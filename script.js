
function sctEmployees() {
    let employees = [];
    let loadingMessage = "Loading users...";
    let loadError = "";
    let panelMode = "";
    let selectedEmp = null;

    // regex
    function isValidId(id) {
        return /^[0-9]+$/.test(id);
    }
    function isValidName(name) {
        return /^[A-Za-z\s.]+$/.test(name);
    }
    function isValidUsername(username) {
        return /^[A-Za-z0-9._]+$/.test(username);
    }
    function isValidAddress(address) {
        return /^[A-Za-z0-9\s,.-]+$/.test(address);
    }
    function isValidEmail(email) {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email);
    }
    function isValidPhone(phone) {
        return /^[0-9\s()+.\-x]+$/i.test(phone);
    }
    function isValidWebsite(website) {
        return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/.test(website);
    }

    // create button
    function makeButton(text, color) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = text;
        btn.style.backgroundColor = color;
        btn.style.color = "white";
        btn.style.marginRight = "5px";
        return btn;
    }
    function makeInput(panel, labelText, value) {
        const label = document.createElement("div");
        label.textContent = labelText;
        label.style.marginTop = "10px";

        const input = document.createElement("input");
        input.type = "text";
        input.value = value;

        input.style.width = "100%";
        input.style.boxSizing = "border-box";

        panel.appendChild(label);
        panel.appendChild(input);
        return input;
    }

    function closePanel() {
        const dialog = document.querySelector("dialog");
        panelMode = "";
        selectedEmp = null;
        if (dialog) dialog.close();
        showEmployees();
    }

    function createPanel() {
        const panel = document.createElement("dialog");
        panel.style.width = "300px";
        panel.style.fontFamily = "Roboto";
        panel.style.padding = "20px";
        panel.style.borderRadius = "10px";
        panel.onclose = function () {
            if (panelMode !== "") closePanel();
        };

        const title = document.createElement("h3");
        title.style.marginTop = "0";
        panel.appendChild(title);

        const buttonRow = document.createElement("div");
        buttonRow.style.marginTop = "10px";

        const closeButton = makeButton("close", "grey");
        closeButton.onclick = closePanel;

        // delete panel
        if (panelMode === "delete") {
            title.textContent = "Delete Employee";

            const message = document.createElement("p");
            message.textContent = "Are you sure you want to delete but why " + selectedEmp.name + "?";
            panel.appendChild(message);

            const confirmButton = makeButton("Delete", "red");

            confirmButton.onclick = function () {
                fetch("https://jsonplaceholder.typicode.com/users/" + selectedEmp.id, {
                    method: "DELETE"
                }) 
                .then(function (res) { 
                    if (!res.ok)throw new Error("Status" + res.status);
                    employees = employees.filter(u => u !== selectedEmp);
                    closePanel();
                })
                .catch(function () {
                    alert ("Failed to delete employee. Try again.");
                });
            };

            buttonRow.appendChild(confirmButton);
            buttonRow.appendChild(closeButton);
            panel.appendChild(buttonRow);
            return panel;
        }

        // add / edit panel

        let oldId = "", oldName = "", oldUsername = "", oldAddress = "", oldEmail = "", oldPhone = "", oldWebsite = "";

        if (panelMode === "edit") {
            title.textContent = "Edit Employee";
            oldId = selectedEmp.id;
            oldName = selectedEmp.name;
            oldUsername = selectedEmp.username;
            oldAddress = selectedEmp.address;
            oldEmail = selectedEmp.email;
            oldPhone = selectedEmp.phone;
            oldWebsite = selectedEmp.website;
        } else {
            title.textContent = "Add Employee";
        }

        const idInput = makeInput(panel, "ID", oldId);
        const nameInput = makeInput(panel, "Name", oldName);
        const usernameInput = makeInput(panel, "Username", oldUsername);
        const addressInput = makeInput(panel, "Address", oldAddress);
        const emailInput = makeInput(panel, "Email", oldEmail);
        const phoneInput = makeInput(panel, "Phone", oldPhone);
        const websiteInput = makeInput(panel, "Website", oldWebsite);
        const saveButton = makeButton("Save", "green");
        const errorMessage = document.createElement("p");
        errorMessage.style.color = "red";
        errorMessage.style.marginTop = "10px";
        errorMessage.style.margin = "5px 0 0";
        errorMessage.style.fontSize = "14px";
        errorMessage.style.display = "none";

        function showError(msg) {
            errorMessage.textContent = msg;
            errorMessage.style.display = "block";
        }

        panel.appendChild(errorMessage);
        saveButton.onclick = function () {

            const id = idInput.value.trim();
            if (!isValidId(id)) {
                showError("Please enter a valid ID.");
                return;
            }
            const name = nameInput.value.trim();
            if (!isValidName(name)) {
                showError("Please enter a valid name (letters and spaces only).");
                return;
            }
            const username = usernameInput.value.trim();
            if (!isValidUsername(username)) {
                showError("Please enter a valid username (letters, numbers, dots, and underscores only).");
                return;
            }
            const address = addressInput.value.trim();
            if (!isValidAddress(address)) {
                showError("Please enter a valid address (letters, numbers, spaces, commas, dots, and hyphens only).");
                return;
            }
            const email = emailInput.value.trim();
            if (!isValidEmail(email)) {
                showError("Please enter a valid email address.");
                return;
            }
            const phone = phoneInput.value.trim();
            if (!isValidPhone(phone)) {
                showError("Please enter a valid phone number (numbers, spaces, parenthesis, plus, and hyphens only).");
                return;
            }
            const website = websiteInput.value.trim();
            if (!isValidWebsite(website)) {
                showError("Please enter a valid website URL.");
                 return;
            }

            const duplicate = employees.some(u => String(u.id) === id && u !== selectedEmp);
            if (duplicate) {
                showError("ID already assigned to another employee.");
                return;
            }

            if (panelMode === "edit") {
                const target = selectedEmp;
                fetch("https://jsonplaceholder.typicode.com/users/" + target.id, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json" },
                    body: JSON.stringify({ id: Number(id), name, username, address, email, phone, website })
                })
                .then(function (res) {
                    if (!res.ok) throw new Error("Status" + res.status);
                    Object.assign(target, {id: Number(id), name, username, address, email, phone, website });
                // selectedEmp.id = Number(id);
                // selectedEmp.name = name;
                // selectedEmp.username = username;
                // selectedEmp.address = address;
                // selectedEmp.email = email;
                // selectedEmp.phone = phone;
                // selectedEmp.website = website;
                closePanel();
            })
            .catch(function () {
                showError("Could not save. Try again.");
            });
            } else {
                const newEmp = {id: Number(id), name, username, address, email, phone, website};
                fetch("https://jsonplaceholder.typicode.com/users" , {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newEmp)
            })
                    .then(function(res) {
                        if(!res.ok) throw new Error("Status" + res.status);
                        employees.push(newEmp);
                        closePanel();
                    })
                    .catch(function() {
                        showError("Could not add. try again.");
                // employees.push({
                //     //id:employees.length > 0 ? Math.max(...employees.map(u => u.id)) + 1 : 1,    //[for the id auto increment]
                //     id: Number(id), // Add the new employee to the employees array
                //     name: nameInput.value,
                //     username: usernameInput.value,
                //     address: addressInput.value,
                //     email: email,
                //     phone : phoneInput.value,
                //     website : websiteInput.value
                });
            }
        };
        buttonRow.appendChild(saveButton);
        buttonRow.appendChild(closeButton);
        panel.appendChild(buttonRow);
        return panel;
    }

    function showEmployees() {

        // my container
        const div = document.getElementById("container");
        div.innerHTML = "";
        div.style.display = "flex";
        div.style.flexDirection = "row-reverse";
        div.style.gap = "20px";
        div.style.allignItems = "flex-start";

        const leftSide = document.createElement("div");
        leftSide.style.flex = "1";

        if (loadingMessage || loadError) {
            const status = document.createElement("p");
            status.textContent = loadingMessage || loadError;
            status.style.color = loadError ? "red" : "inherit";
            leftSide.appendChild(status);
        }

        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.fontFamily = "Roboto";
        console.log('Fahim`s', table);

        // Add button
        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.id = "addButton";
        addButton.type = "button";
        addButton.style.backgroundColor = "red";
        addButton.style.color = "white";
        addButton.style.padding = "5px 15px";
        addButton.style.borderRadius = "10px";
        addButton.onclick = function (e) {
            e.preventDefault();
            panelMode = "add";
            selectedEmp = null;
            showEmployees();
        };

        const buttonContainer = document.createElement("div");
        buttonContainer.style.textAlign = "right";
        buttonContainer.style.marginBottom = "10px";
        buttonContainer.appendChild(addButton);


        // table header
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                          <th>Address</th>
                             <th>Email</th>
                            <th>Phone</th>
                        <th>Website</th>
                    <th>Actions</th>
                </tr>
            </thead>
            `;

        // cell style
        table.querySelectorAll("th, td").forEach(function (cell) {
            cell.style.border = "1px solid ";
            cell.style.padding = "10px";
            cell.style.backgroundColor = "#6b4fb9";
            cell.style.textAlign = "left";
        });

        // body
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        // rows 
        employees.forEach(function (emp) {
            const row = document.createElement("tr");

            ["id", "name", "username", "address", "email", "phone", "website"].forEach(function (key) {
                const td = document.createElement("td");
                td.textContent = emp[key];
                row.appendChild(td);
            });

            const action = document.createElement("td");

            // edit btn
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";

            editButton.style.marginRight = "5px";
            editButton.style.padding = "5px 15px";
            editButton.style.borderRadius = "10px";

            editButton.onclick = function () {
                panelMode = "edit";
                selectedEmp = emp;
                showEmployees();
            };

            // deletion

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.marginRight = "5px";
            deleteButton.style.padding = "5px 15px";
            deleteButton.style.borderRadius = "10px";

            deleteButton.onclick = function () {
                panelMode = "delete";
                selectedEmp = emp;
                showEmployees();
            };

            action.appendChild(editButton);
            action.appendChild(deleteButton);
            row.appendChild(action);
            tbody.appendChild(row);
        });

        // cell styling

        table.querySelectorAll("th, td").forEach(function (cell) {
            cell.style.border = "1px solid black";
            cell.style.padding = "10px";
            cell.style.textAlign = "left";
        });
        table.querySelectorAll("th").forEach(function (th) {
            th.style.backgroundColor = "#0000003f";
        });

        leftSide.appendChild(buttonContainer);
        leftSide.appendChild(table);
        div.appendChild(leftSide);

        if (panelMode !== "") {
            const dialog = createPanel();
            div.appendChild(dialog);
            dialog.style.border = "1px solid black";
            dialog.style.backgroundColor = "#f0f0f0";
            dialog.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
            dialog.showModal();
        }
        div.appendChild(createPanel());
    }

    // load emp from API 
    async function loadEmployees() {
        showEmployees();

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const users = await response.json();
            employees = users.map(function (user) {
                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    address: `${user.address.street}, ${user.address.city},`,
                    email: user.email,
                    phone: user.phone,
                    website: user.website,

                };
            });
            loadingMessage = "";
            loadError = "";
        } catch (error) {
            loadingMessage = "";
            loadError = "Unable to load users. Please check your connection and try again.";
            console.error("Failed to load users:", error);
        }

        showEmployees();
    }

    loadEmployees();
}

sctEmployees();
