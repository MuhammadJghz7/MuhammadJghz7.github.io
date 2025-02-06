document.addEventListener('DOMContentLoaded', () => {
    const gradeForm = document.getElementById('gradeForm');
    const courseNumberInput = document.getElementById('courseNumber');
    const courseNameInput = document.getElementById('courseName');
    const courseGradeInput = document.getElementById('courseGrade');
    const courseTypeInput = document.getElementById('courseType');
    const semesterInput = document.getElementById('semester');
    const scheduleForm = document.getElementById('scheduleForm');
    const cNuInput = document.getElementById('cNu');
    const cNaInput = document.getElementById('cNa');
    const day1Input = document.getElementById('day1');
    const startTime1Input = document.getElementById('startTime1');
    const endTime1Input = document.getElementById('endTime1');
    const weekType1Input = document.getElementById('weekType1');
    const examDateInput = document.getElementById('examDate');
    const examStartInput = document.getElementById('examStart');
    const examEndInput = document.getElementById('examEnd');
    const weeklySchedule = document.getElementById('weeklySchedule');
    const examSchedule = document.getElementById('examSchedule');
    const gradeList = document.getElementById('gradeList');

    let grades = JSON.parse(localStorage.getItem('grades')) || [];
    let classes = JSON.parse(localStorage.getItem('classes')) || [];

    function displayGrades() {
        gradeList.innerHTML = '';
        grades.forEach((item, index) => {
            const li = document.createElement('li');

            let statusText = item.grade >= 10 ? 'قبول' : 'رد';
            let statusColor = item.grade >= 10 ? 'green' : 'red';

            li.innerHTML = `<span>
               <strong>${item.number}</strong> - ${item.course} (${item.type}) - ${item.semester}:
                <strong id="grade-${index}">${item.grade}</strong> - 
                <strong style="color: ${statusColor};">${statusText}</strong>
                </span>`;

            const editButton = document.createElement('button');
            editButton.textContent = 'ویرایش نمره';
            editButton.onclick = () => editGrade(index);
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'حذف';
            deleteButton.onclick = () => removeGrade(index);
            li.appendChild(deleteButton);

            gradeList.appendChild(li);
        });
    }

    function displaySchedules() {
        weeklySchedule.innerHTML = '';
        examSchedule.innerHTML = '';

        classes.forEach((item, index) => {
            const classItem = document.createElement('li');
            classItem.innerHTML = `${item.course} - ${item.day}, ${item.startTime} till ${item.endTime} (${item.weekType})`;
            weeklySchedule.appendChild(classItem);

            if (item.examDate) {
                const examItem = document.createElement('li');
                examItem.innerHTML = `${item.course} - ${item.examDate}, ${item.examStart} till ${item.examEnd}`;
                examSchedule.appendChild(examItem);
            }
        });
    }

    gradeForm.addEventListener('submit', event => {
        event.preventDefault();

        const courseNumber = courseNumberInput.value.trim();
        const courseName = courseNameInput.value.trim();
        const courseGrade = parseFloat(courseGradeInput.value.trim());
        const courseType = courseTypeInput.value;
        const semester = semesterInput.value.trim();

        if (courseNumber !== '' && courseName !== '') {
            grades.push({ number: courseNumber, course: courseName, grade: courseGrade, type: courseType, semester: semester});
            localStorage.setItem('grades', JSON.stringify(grades));
            courseNumberInput.value = '';
            courseNameInput.value = '';
            courseGradeInput.value = '';
            courseTypeInput.value = '';
            semesterInput.value = '';
            displayGrades();
        }
    });

    scheduleForm.addEventListener('submit', event => {
        event.preventDefault();

        const newClass = {
            number: parseInt(cNuInput.value.trim()),
            course: cNaInput.value.trim(),
            day: day1Input.value,
            startTime: startTime1Input.value,
            endTime: endTime1Input.value,
            weekType: weekType1Input.value,
            examDate: examDateInput.value,
            examStart: examStartInput.value,
            examEnd: examEndInput.value
        };

        classes.push(newClass);
        localStorage.setItem('classes', JSON.stringify(classes));

        cNuInput.value = '';
        cNaInput.value = '';
        startTime1Input.value = '';
        endTime1Input.value = '';
        examDateInput.value = '';
        examStartInput.value = '';
        examEndInput.value = '';

        displaySchedules();
    });

    function editGrade(index) {
        const newGrade = prompt("لطفا نمره جدید را وارد کنید : ", grades[index].grade);
        if (newGrade !== null && !isNaN(parseFloat(newGrade))) {
            grades[index].grade = parseFloat(newGrade);
            localStorage.setItem('grades', JSON.stringify(grades));
            displayGrades();
        }
    }

    function removeGrade(index) {
        grades.splice(index, 1);
        localStorage.setItem('grades', JSON.stringify(grades));
        displayGrades();
    }

    displayGrades();
    displaySchedules();
});
