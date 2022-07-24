(function () {
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите наименование нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('disabled', 'true');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name, done = false) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    !done ? item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
      : item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'list-group-item-success');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoApp(container, title = 'Список дел', staticTodoObj = [], keyStorage) {
    document.getElementById(container);

    // доделать кнопку готово и удалить

    let storage = window.localStorage;
    let storageObject = storage.getItem(keyStorage.toString()) ? JSON.parse(storage.getItem(keyStorage.toString())) : [];
    let tempStorageObj = null;
    let raw = null;
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let todoItem = createTodoItem();
    let timeout = null;
    let millisec = 300;
    let keysStaticObj = Object.keys(staticTodoObj);

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    keysStaticObj.length > 0 ? storageObject = Object.assign({}, storageObject, staticTodoObj) : false;
    storage.setItem(keyStorage.toString(), JSON.stringify(storageObject));
    tempStorageObj = JSON.parse(storage.getItem(keyStorage.toString()));

    (function () {
      let values = Object.values(storageObject);
      for (let value of values) {
        todoItem = createTodoItem(value['name'], value['done']);
        todoList.append(todoItem.item);
      }
    })();

    todoItemForm.input.addEventListener('input', () => {
      if (todoItemForm.input.value === '') {
        clearTimeout(timeout);
        changeAttributeDisabled(true);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(changeAttributeDisabled, millisec);
      }
    })

    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }

      todoItem = createTodoItem(todoItemForm.input.value);
      changeStorage(keyStorage.toString());

      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
      })
      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          let removeName = todoItem.item.firstChild.textContent;
          changeStorage(keyStorage.toString(), true, removeName);
          todoItem.item.remove();
        }
      })

      todoList.append(todoItem.item);

      todoItemForm.input.value = '';
      changeAttributeDisabled(true);
    });

    function changeAttributeDisabled(off = false) {
      !off ? todoItemForm.button.removeAttribute('disabled') : todoItemForm.button.setAttribute('disabled', 'true');
    }
    function changeStorage(key, del = false, removeName = '') {
      raw = null;
      tempStorageObj = null;
      if (!del) {
        storageObject[Object.keys(storageObject).length] = { name: todoItemForm.input.value, done: false };
        storage.setItem(key.toString(), JSON.stringify(storageObject));
      } else {
        tempStorageObj = Object.entries(storageObject);
        console.log(tempStorageObj);
        storage.setItem(key.toString(), JSON.stringify(tempStorageObj));
        return true;
      }
    }
  }

  window.createTodoApp = createTodoApp;
})();
