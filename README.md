TaskManager
# React + Vite

1. Add Task
Fields: Title (required), Description, Due Date (required), Priority (Low/Medium/High), Status (To Do/In Progress/Completed).

Action: Form submission → Task added to list with auto-generated id and createdAt timestamp.

Validation: Ensures title/due date aren’t empty; due date isn’t in the past.

2. Display Tasks
List View: Shows task title, priority (color-coded dot), status (badge), and due date.

Expandable Details: Click to view full description and creation date.

Visual Cues:

Priority: 🔴 High, 🟡 Medium, 🟢 Low.

Status: Gray (To Do), Blue (In Progress), Green (Completed).

3. Edit Task
Action: Click "Edit" → Pre-fill form with existing task data.

Save Changes: Updates task in the list with new values (validates inputs).

Cancel: Discards changes without saving.

4. Delete Task
Action: Click "Delete" → Removes task permanently after confirmation (soft delete optional).

Persistence: Updates localStorage immediately.

Key Features
Filter/Sort: By status, priority, or due date.

Search: Find tasks by title/description.

Responsive: Works on mobile and desktop.

Tech Used: React, Material UI, Context API, localStorage.

