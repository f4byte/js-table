let employees = [
    { id: 102048, name: "Tafhim", username: "taf18", address: "Banasree", email: "tafhim.sct@gmail.com" },
    { id: 102049, name: "Fahim", username: "f4byte", address: "Basabo", email: "fahim.sct@gmail.com" },
    { id: 102050, name: "Anindya", username: "haq.mawla", address: "Mdpur", email: "anindya.sct@gmail.com" }
];

function showEmployees() {
     // my container
    const div = document.getElementById("container");
    div.innerHTML = "";
    div.style.display = "inline-block";
    
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
    addButton.style.backgroundColor = "grey";
    addButton.style.color = "white";
    addButton.style.padding = "3px 10px";
    addButton.style.borderRadius = "5px";

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
        
          // 
          //     
          //     
          // 
          ["id","name","username","address","email"].forEach(function(key) {
            const td = document.createElement("td");
            td.textContent = emp[key];
            row.appendChild(td);
          });
          
            const action = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.style.marginRight ="5px";

            editButton.onclick = function() {

                const name = prompt ("Enter name:", emp.name);
                if(name === null) return;

                const username = prompt ("Enter username:", emp.username);
                if(username === null)return;

                const address = prompt ("Enter Address:", emp.address);
                if (address === null) return;
                             
                const email = prompt ("Enter Email:", emp.email);
                if (email === null) return;

                emp.name = name;
                emp.username = username;
                emp.address = address;
                emp.email = email;
                
                showEmployees();
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            deleteButton.onclick = function () {
                if (confirm("Are you sure you want to delete this user?")) {
                employees = employees.filter(u => u.id !== emp.id);
                showEmployees();
                }
            };

            action.appendChild(editButton);
            action.appendChild(deleteButton);
            row.appendChild(action);
            tbody.appendChild(row);
        });

     // cell
     table.querySelectorAll("th, td").forEach(function (cell) {
        cell.style.border = "1px solid black";
        cell.style.padding = "10px";
        cell.style.textAlign = "left";
    });       
    table.querySelectorAll("th").forEach(function (th) {
        th.style.backgroundColor = "#0000003f";
    });

     // new employee
        addButton.onclick = function (e) {
            e.preventDefault();

        const name = prompt("Enter name:");
        if (name === null) return;

        const username = prompt("Enter username:");
        if (username === null) return;

        const address = prompt("Enter address:");
        if (address === null) return;

        const email = prompt("Enter email:");
        if (email === null) return;

         employees.push ({
            id:       employees.length > 0 ? Math.max(...employees.map(u => u.id))+1:1,
            name:     name,
            username: username,
            address:  address,
            email : email
        });
        
        showEmployees();
    };
        div.appendChild(buttonContainer);
        div.appendChild(table);
        //tbody.appendChild(row);
    }

    
showEmployees();

