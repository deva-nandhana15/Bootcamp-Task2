# Task Manager

A modern, customizable task management web app built with React + TypeScript.

Features include drag-and-drop task organization, user-created sections, ticking clock, and both task & section deletion.

## Features

✅ Add tasks to a "To Do" list.

✅ Mark tasks as completed with a single click.

✅ Drag & Drop tasks between sections using @hello-pangea/dnd.

✅ Create custom sections to organize tasks your way.

✅ Delete tasks individually with ❌ buttons.

✅ Delete user-created sections (removes all tasks in that section).

✅ Profile tab for user info (demo / placeholder).

✅ Live clock in the Home tab.

✅ Responsive layout with modern styling.

## Project Structure

src/

│

├── components/

│   ├── AddSectionInput.tsx 

|   ├── AddTaskInput.tsx 

│   ├── Clock.tsx             # Displays live time

│   ├── SectionColumn.tsx     # Each section (To Do, Completed, or custom)

|   ├── TaskItem.tsx

│

├── pages/

│   └── ProfileTab.tsx        # Placeholder profile page

│

├── types/

│   └── types.ts              # Shared TypeScript interfaces

│

├── App.tsx                   # Main app logic & state management

└── main.tsx                  # Entry point


## How to Use

1. Adding Tasks

Type a task in the "Add Task" field.

Click the ➕ button or press Enter to add it to the To Do section.

2. Completing Tasks

Click the green ✅ icon to toggle task completion.

Completed tasks move to the Completed section automatically.

3. Creating Sections

Enter a section name in the "Enter Section" input.

Click the ➕ to create it.

New sections appear alongside "To Do" and "Completed."

4. Drag & Drop

Drag tasks between sections to reorganize them.

Tasks in Completed are always marked as completed.

5. Deleting Tasks

Click ❌ on any task to remove it permanently.

6. Deleting Sections

Click ❌ in the header of a user-created section to delete it and all its tasks.

## Code Highlights

1.App.tsx

Manages global state for tasks and sections.

Handles adding, deleting, toggling, and moving tasks.

Controls creation/deletion of sections.

Integrates DragDropContext from @hello-pangea/dnd.

2.SectionColumn.tsx

Displays a droppable area for tasks.
Renders draggable task items.
Shows ❌ button for section deletion only if it’s user-created.
