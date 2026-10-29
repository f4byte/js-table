
let employees = [
    { id: 102048, name: "Tafhim", username: "taf18", address: "Banasree" },
    { id: 102049, name: "Fahim", username: "f4byte", address: "Basabo" },
    { id: 102050, name: "Anindya", username: "haq.mawla", address: "Mdpur" }
];

let panelMode = "";
let selectedEmp = null;

function showEmployees() {
     // my container
    const div = document.getElementById("container");
    div.innerHTML = "";
    div.style.display = "flex";
    div.style.flexDirection = "row-reverse";
    div.style.gap = "20px";
    div.style.allignItems = "flex-start";
    
    const leftSide = document.createElement("div");
    //leftSide.style.flex = "1";

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
                <th>Actions</th>
            </tr>
        </thead>
        `;

     // border
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
                        
                        ["id","name","username","address"].forEach(function(key) {
                            const td = document.createElement("td");
                            td.textContent = emp[key];
                            row.appendChild(td);
                        });
            
                    const action = document.createElement("td");

             // edit btn
                    const editButton = document.createElement("button");
                    editButton.textContent = "Edit";
                    editButton.style.marginRight ="5px";
                    editButton.style.padding = "5px 15px";
                    editButton.style.borderRadius = "10px";

                    editButton.onclick = function() {
                        panelMode = "edit";
                        selectedEmp = emp;
                        showEmployees();
                    };

             // deletion
                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.style.marginRight ="5px";
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
                        div.appendChild(createPanel ());
                    }
                }
                
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
                    panelMode = "";
                    selectedEmp = null;
                    showEmployees ();
                }

                function createPanel() {
                    const panel = document.createElement("div");
                    panel.style.width = "200px";
                    panel.style.fontFamily = "Roboto";

                    const title = document.createElement("h3");
                    title.style.marginTop = "0";
                    panel.appendChild(title);

                    const buttonRow = document.createElement("div");
                    buttonRow.style.marginTop = "10px";

                    const closeButton = makeButton("close", "grey");
                    closeButton.onclick = closePanel;

                    if (panelMode === "delete") {
                        title.textContent = "Delete Employee";

                        const message = document.createElement("p");
                        message.textContent = "Are you sure you wanna delete " + selectedEmp.name + "?";
                        panel.appendChild(message);

                        const confirmButton = makeButton("Delete","red");
                        confirmButton.onclick =function() {
                            employees = employees.filter(u => u.id !== selectedEmp.id);
                            closePanel();
                        };

                        buttonRow.appendChild(confirmButton);
                        buttonRow.appendChild(closeButton);
                        panel.appendChild(buttonRow);
                        return panel;
                    }

                 // add / edit 
                 let oldName = "", oldUsername = "", oldAddress = "";
                 
                 if (panelMode === "edit") {
                    title.textContent = "Edit Employee";
                    oldName = selectedEmp.name;
                    oldUsername = selectedEmp.username;
                    oldAddress = selectedEmp.address;
                 } else {
                    title.textContent = "Add Employee";
                    }

                    const nameInput = makeInput(panel, "Name", oldName);
                    const usernameInput = makeInput(panel, "Username", oldUsername);
                    const addressInput = makeInput(panel,"Address", oldAddress);

                    const saveButton = makeButton("Save","green");
                    saveButton.onclick = function () {
                        if (panelMode === "edit") {
                            selectedEmp.name = nameInput.value;
                            selectedEmp.username = usernameInput.value;
                            selectedEmp.address = addressInput.value;
                        } else {
                            employees.push({
                                id : employees.length > 0 ? Math.max(...employees.map(u => u.id)) + 1 : 1,
                                name : nameInput.value,
                                username : usernameInput.value,
                                address : addressInput.value
                            });
                        }
                        closePanel();
                    };
                    buttonRow.appendChild(saveButton);
                    buttonRow.appendChild(closeButton);
                    panel.appendChild(buttonRow);
                    return panel;
                }
    
showEmployees();

