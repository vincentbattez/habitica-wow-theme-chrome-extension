export const TaskSelector = {
  formTitle: () => (
    document.querySelector(".task-modal-header .form-group")
  ),
  createTaskMenu: () => (
    document.querySelector('#create-task-btn')
  ),
  createTaskCollection: () => (
    document.querySelectorAll('.create-task-btn')
  ),
  quickAddCollection: () => (
    document.querySelectorAll('.quick-add')
  ),
  taskCollection: () => (
    document.querySelectorAll('.task-clickable-area')
  ),
  taskHeader: () => (
    document.querySelector('.task-modal-header')
  ),
  inputNote: (): HTMLTextAreaElement => (
    document.querySelector(".input-notes")
  ),
  buttonTask: (): HTMLButtonElement => (
    document.querySelector('.task-modal-header .btn')
  ),
  buttonCancelTask: (): HTMLButtonElement => (
    document.querySelector('.cancel-task-btn')
  ),
  buttonDeleteTask: (): HTMLButtonElement => (
    document.querySelector('.delete-task-btn')
  ),
}
