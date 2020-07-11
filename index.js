/* Student Form */
const nameElement = document.querySelector('#name')
const ageElement = document.querySelector('#age')
const sexElement = document.querySelector('#sex')
const submitElement = document.querySelector('#submit')
const saveStudent = () => {
    const name = nameElement.value
    const age = ageElement.value
    const sex = sexElement.value
    fetch('https://student-api3.herokuapp.com/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            age: age,
            sex: sex,
        }),
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    }).then(()=> getStudents())
}

/* Student Form Listener */
submitElement.addEventListener("click", (e) => {
    e.preventDefault();
    saveStudent()
    nameElement.value = "";
    ageElement.value = "";
    sexElement.value = "";
})

/* Student Record */
let students;
let page = 0;
const studentsElement = document.querySelector('.students')
const numberElement = document.querySelector('#amount')
const getStudents = () => fetch('https://student-api3.herokuapp.com/student')
    .then(response => response.json())
    .then(data => students = data.result)
    .then(() => renderStudents(page))


const renderStudents = i => {
    const targetStudents = students.slice(i * 4, (i + 1) * 4)
    let html = ""
    targetStudents.forEach(student => {
        let innerHtml = `<div class="row">\
            <span class="name-text">${student.name}</span>\
            <span class="age-text">${student.age}</span>\ 
            <span class="sex-text">${student.sex}</span>\
          </div>`;
        html += innerHtml;
    });
    studentsElement.innerHTML = html;
    numberElement.innerHTML = students.length
}

const refreshRecord = ()=>{
    setInterval(()=>{
        getStudents();
    },2000)
}
refreshRecord();
getStudents();

const nextElement = document.querySelector("#next")
const prevElement = document.querySelector("#prev")

/* Student Record Listener */
nextElement.addEventListener("click", () => {
    const max = Math.ceil(students.length/4)-1
    if (page + 1 > max) {
        renderStudents(max)
    } else {
        page += 1;
        renderStudents(page)
    }
})

prevElement.addEventListener("click", () => {
    if (page - 1 < 0) {
        renderStudents(0)
    } else {
        page -= 1;
        renderStudents(page)
    }
})