const buttons = document.querySelectorAll('.btn');
const courses = document.querySelectorAll('.course-card');
const coursesContainer = document.querySelector('.courses')
console.log(coursesContainer)

/* Buttons ripple effect */

buttons.forEach(btn => {
    btn.addEventListener('mousedown', function(ev) {
        let x = ev.offsetX;
        let y = ev.offsetY;

        let ripple = document.createElement('span');

        ripple.classList.add('ripple');
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        },500)
})

    btn.addEventListener('mouseup', function(ev) {
        
          if(ev.currentTarget.value === 'all') {
            let df = new DocumentFragment();
            courses.forEach(c => {
              df.appendChild(c);
            })
            coursesContainer.innerHTML = "";
            coursesContainer.appendChild(df)
          } else {
            let df = new DocumentFragment();
            let course = filterCourses(ev);
            course.forEach(c => {
              df.appendChild(c);
            })
            coursesContainer.innerHTML = "";
            coursesContainer.appendChild(df);
          }

        

          if(ev.currentTarget === buttons[0]) {
            buttons[0].classList.add('active');
            removeActiveClass(ev);
          }

          if(!ev.currentTarget.className.includes('active')) {
            ev.currentTarget.classList.add('active');
            removeActiveClass(ev);
            buttons[0].classList.remove('active');
          } else {
            ev.currentTarget.classList.remove('active');
            buttons[0].classList.add('active');
          }       
})
})

function removeActiveClass(ev) {
    buttons.forEach(btn => {
        if(ev.currentTarget != btn)
        btn.classList.remove('active');
    })
}

function filterCourses(ev) {
    return Array.from(courses).filter(course => {
        let courseBtnValue = ev.currentTarget.value;
        return course.className.includes(courseBtnValue);
    })
}

