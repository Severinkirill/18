"use strict";

$(function () {
  // Завантаження завдань з localStorage
  function loadTodos() {
    var saved = localStorage.getItem('todos18');
    return saved ? JSON.parse(saved) : [];
  }
  function saveTodos(todos) {
    localStorage.setItem('todos18', JSON.stringify(todos));
  }
  var todos = loadTodos();
  function renderTodos() {
    var $list = $('#todoList');
    $list.empty();
    todos.forEach(function (todo, idx) {
      var checkedClass = todo.checked ? 'list-group-item-success text-decoration-line-through' : '';
      var $li = $('<li></li>').addClass('list-group-item d-flex justify-content-between align-items-center ' + checkedClass).attr('data-idx', idx).append($('<span></span>').addClass('todo-text').text(todo.text).css('cursor', 'pointer')).append($('<div></div>').addClass('d-flex gap-2').append($('<input type="checkbox">').prop('checked', todo.checked).on('change', function () {
        todos[idx].checked = this.checked;
        saveTodos(todos);
        renderTodos();
      })).append($('<button></button>').addClass('btn btn-danger btn-sm').text('Видалити').on('click', function () {
        todos.splice(idx, 1);
        saveTodos(todos);
        renderTodos();
      })));
      $list.append($li);
    });
  }

  // Додавання завдання
  $('#todoForm').on('submit', function (e) {
    e.preventDefault();
    var value = $('#todoInput').val().trim();
    if (value) {
      todos.push({
        text: value,
        checked: false
      });
      saveTodos(todos);
      renderTodos();
      $('#todoInput').val('');
    }
  });

  // Показ модального вікна при кліку на текст завдання
  $('#todoList').on('click', '.todo-text', function () {
    var idx = $(this).parent().data('idx');
    $('#modalTaskText').text(todos[idx].text);
    var modal = new bootstrap.Modal(document.getElementById('taskModal'));
    modal.show();
  });
  renderTodos();
});