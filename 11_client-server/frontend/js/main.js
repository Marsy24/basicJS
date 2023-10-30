import Student from './student.js';
let today = new Date();
const SERVER_URL='http://localhost:3000';
let students = [
    /*new Student('Игорь', 'Фролов', 'Антонов', 2021, new Date(1999,3,4), 'Физмат'),
    new Student('Александр', 'Степаненко', 'Игоревич', 2020, new Date(1995,3,4), 'Литература'),
    new Student('Владимир', 'Хрущев', 'Сергеевич', 2019, new Date(1997,3,4), 'Физкультура')*/
]


const studentsData = await getStudentsData();

if (studentsData !== null) {
  for (const student of studentsData) {
    students.push(
      new Student(student.name, student.surname, student.lastname, new Date(student.birthday), parseInt(student.studyStart), student.faculty, student.id)
    )
  }
}


const $studentsList = document.getElementById('students-list'),
      $studentsListTH = document.querySelectorAll('.students-table th');

let column = 'fio',
    columnDir = true,
    searchFioInput = document.getElementById('search-fio'),
    searchFacInput = document.getElementById('search-fac'),
    searchStudyStartInput = document.getElementById('search-studyStart'),
    searchStudyEndInput = document.getElementById('search-studyEnd');

function newStudentTR(student) {
    const $studentTR = document.createElement('tr');
    const $fioTD = document.createElement('td');
    const $birthDateTD = document.createElement('td');
    const $studyStartTD = document.createElement('td');
    const $facTD = document.createElement('td');
    const $delTD = document.createElement('td');
    const $delButton = document.createElement('button')

    if (parseInt(student.studyStart) + 4 === today.getFullYear()) {
        today.getMonth() > 8 ? $studyStartTD.textContent = student.studyStart + ' - ' + (student.studyStart + 4) + ' (закончил)'
         :
         $studyStartTD.textContent = student.studyStart + ' - ' + (student.studyStart + 4) + ' (' + student.getStudyPeriod() + ' курс)'
    } else {
        $studyStartTD.textContent = student.studyStart + ' - ' + (student.studyStart + 4) + ' (' + student.getStudyPeriod() + ' курс)'
    }

    $fioTD.textContent = student.fio;
    $birthDateTD.textContent = student.getBirthDateString() + ' (' + student.getAge() + ' лет)';

    $facTD.textContent = student.getFac();

    $delTD.append($delButton);
    $delButton.innerHTML = '+';
    $delButton.classList.add('delete');
    $delButton.style.fontSize = '20px';
    $delButton.style.transform = 'rotate(45deg)';
    $delButton.style.border = 'none';
    $delButton.style.background = 'none';

    $delButton.addEventListener('click', async function() {
      await serverDeleteStudent(student.id);
      $studentTR.remove();
    })

    $studentTR.append($fioTD);
    $studentTR.append($facTD);
    $studentTR.append($birthDateTD);
    $studentTR.append($studyStartTD);
    $studentTR.append($delTD);

    return $studentTR;
}

function getSortStudents(prop, dir) {
    const studentsCopy = [...students];
    return studentsCopy.sort(function(studentA, studentB) {
        if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
        return -1;
    })
}

function getFilteredStudents(arr, prop, value) {
    let result = [],
        copy = [...arr];
    for (const item of copy) {
        if (String(item[prop]).includes(value)) {result.push(item);}
    }

    return result;
}

function getFilteredStudentsEnd(arr, prop, value) {
    let result = [],
        copy = [...arr];

    for (const item of copy) {
        console.log(item[prop] + 4)
        if(String(item[prop] + 4).includes(value)) result.push(item);
    }

    console.log(result)

    return result
}

async function getStudentsData() {
  const response = await fetch(SERVER_URL+'/api/students', {
    method: 'GET',
    headers: { 'Content-type': 'application/json' }
  });
  return response.json();
}

async function serverAddStudent(obj) {
  const response = await fetch(SERVER_URL+'/api/students', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'Content-type': 'application/json' }
  })
}

async function serverDeleteStudent(id) {
  const response = await fetch(SERVER_URL+'/api/students/' + id, {
    method: 'DELETE',
  })
}

async function render() {
  let studentsCopy = [...students];

  studentsCopy = getSortStudents(column, columnDir);

  searchFioInput.value != '' ? studentsCopy = getFilteredStudents(studentsCopy, 'fio', searchFioInput.value) : false;
  searchFacInput.value != '' ? studentsCopy = getFilteredStudents(studentsCopy, 'fac', searchFacInput.value) : false;
  searchStudyStartInput.value != '' ? studentsCopy = getFilteredStudents(studentsCopy, 'studyStart', searchStudyStartInput.value) : false;
  searchStudyEndInput.value != '' ? studentsCopy = getFilteredStudentsEnd(studentsCopy, 'studyStart', searchStudyEndInput.value) : false;



  $studentsList.innerHTML = '';

  for (const student of studentsCopy) {
      $studentsList.append(newStudentTR(student))
  }
}

$studentsListTH.forEach(element => {
    element.addEventListener('click', function() {
        column = this.dataset.column;
        columnDir = !columnDir;
        render();
    })
})

function validation(form) {
    function removeError(input) {
        const parent = input.parentNode;
        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error');
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;

        const errorLable = document.createElement('label');
        errorLable.classList.add('error-label');
        errorLable.textContent = text;

        parent.classList.add('error');
        parent.append(errorLable);

    }

    let result = true;

    const inputs = form.querySelectorAll('input');
    for (const input of inputs) {
        removeError(input)

        if (input.dataset.numberStart) {
            if (Number(input.value) < 2000) {
                removeError(input);
                createError(input, `Год начала обучения должен быть не ниже 2000 года`);
                result = false;
            }
        }

        if (input.dataset.dateBirthDay) {
            if (new Date(input.value) < new Date(1900, 0, 1)) {
                removeError(input);
                createError(input, `Дата должна быть больше, чем: ${new Date(1900,0,1)}`)
                result = false;
            }
        }

        if (input.dataset.minLength) {
            if (input.value.length < input.dataset.minLength) {
                removeError(input);
                createError(input,`Минимальное количество символов: ${input.dataset.minLength}`);
                result = false;
            }
        }

        if (input.dataset.maxLength) {
            if (input.value.length > input.dataset.maxLength) {
                removeError(input);
                createError(input,`Максимальное количество символов: ${input.dataset.maxLength}`);
                result = false;
            }
        }

        if (input.dataset.required) {
            if (input.value == "") {
                removeError(input);
                createError(input,'Поле не заполнено');
                result = false;
            }
        }
    }

    return result;
}

document.getElementById('btn-filter').addEventListener('click', function(e) {
    render();
})


document.getElementById('add-student').addEventListener('submit', async function(event) {
    event.preventDefault();

    if (validation(this) == true) {
        let newStudentObj = {
          name: document.getElementById('input-name').value.trim(),
          surname: document.getElementById('input-surname').value.trim(),
          lastname: document.getElementById('input-lastname').value.trim(),
          birthday: new Date(document.getElementById('input-birthDate').value),
          studyStart: Number(document.getElementById('input-studyStart').value.trim()),
          faculty: document.getElementById('input-fac').value.trim()
        }
        let serverDataObj = await serverAddStudent(newStudentObj);
        students.push(serverDataObj);

        await render();

        event.target.reset()
    }



    render();
})

render()
