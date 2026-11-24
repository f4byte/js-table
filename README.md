# Employees CRUD (TypeScript)

A small employee management table built with plain TypeScript and the DOM. It uses `fetch` (AJAX) to Create, Read, Update and Delete employees against the free [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake API.

## Features

- Loads the employee list from the API when the page opens (READ)
- Add a new employee (CREATE)
- Edit an existing employee (UPDATE)
- Delete an employee with a confirmation dialog (DELETE)
- Form validation with regex for ID, name, username, address, email, phone and website
- Duplicate ID check
- Error messages for failed requests

## Project structure

```
employees-ts/
├── index.html         Page that loads the compiled script
├── tsconfig.json      TypeScript compiler settings
├── README.md          This file
├── src/
│   └── employees.ts   TypeScript source (edit this file)
└── dist/
    └── employees.js   Compiled output (generated, do not edit)
```

## Requirements

- [Node.js](https://nodejs.org/) (to install TypeScript)
- TypeScript compiler:
  ```
  npm install -g typescript
  ```
- VS Code with the **Live Server** extension (or any local web server)

## How to run

1. Open a terminal inside the `employees-ts` folder.
2. Compile the TypeScript and keep watching for changes:
   ```
   tsc --watch
   ```
   For a one-time build, run `tsc` instead.
3. Open `index.html` with Live Server.

The page loads `dist/employees.js`, so the project must be compiled before it works.

## How it works

All server calls go through one helper, `request()`, which wraps `fetch`. The `api` object gives one method per CRUD operation:

| Action | `api` method | HTTP method | Triggered by |
|---|---|---|---|
| Read | `api.getAll()` | GET | Page load |
| Create | `api.create(emp)` | POST | Add, then Save |
| Update | `api.update(id, emp)` | PUT | Edit, then Save |
| Delete | `api.remove(id)` | DELETE | Delete, then confirm |

Clicking Add, Edit or Delete in the table only opens a dialog. The request is sent when you click the final button inside the dialog. The table changes only after the server replies successfully.

### Types

| Type | Purpose |
|---|---|
| `Employee` | One employee row shown in the table |
| `ApiUser` | Raw user object returned by JSONPlaceholder |
| `PanelMode` | `"" \| "add" \| "edit" \| "delete"` |
| `HttpMethod` | `"GET" \| "POST" \| "PUT" \| "DELETE"` |

## Important note about JSONPlaceholder

JSONPlaceholder is a fake API. It accepts your requests and returns success, but it does **not** save anything.

- Refreshing the page resets the table to the original 10 users.
- Editing or deleting an employee you just added (ID 11 or higher) returns an error from the server, so you will see "Could not save" or "Failed to delete". This is expected.

## Troubleshooting

| Problem | Fix |
|---|---|
| Console shows `404 (Not Found)` for `employees.js` | Run `tsc` first so `dist/employees.js` exists, and check the `<script src>` path in `index.html` |
| Console shows "MIME type ('text/html') is not executable" | Same cause as above: the script path is wrong |
| Table does not appear | Make sure `index.html` has `<div id="container"></div>` before the script tag |
| Changes do not show | Check that `tsc --watch` is still running, then hard refresh with `Ctrl + Shift + R` |
