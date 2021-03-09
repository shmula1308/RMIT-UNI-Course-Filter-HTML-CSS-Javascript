const buttons = document.querySelectorAll('.btn');
const courses = document.querySelectorAll('.course-card');
const coursesContainer = document.querySelector('.courses');
const filterToggleBtn = document.querySelector('.filter-toggle');
const checkBoxFilter = document.querySelector('.industry-filter-body');
const arrow = document.querySelector('.fa-chevron-down');
const filterCheckBoxes = document.querySelectorAll('.filter-checkbox');
const categoryToggle = document.getElementById('category-toggle');
const resetBtn = document.querySelector('.reset');
const checkBoxIcons = document.querySelectorAll('.fa-square');
let counter = 0;


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

/* Filter courses */

      btn.addEventListener('mouseup', function(ev) {
              
          coursesContainer.innerHTML = "";
          coursesContainer.appendChild(documentFragment(ev));

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
          coursesContainer.innerHTML = "";
          let df = new DocumentFragment();
          courses.forEach(c => {
            df.appendChild(c);
          })
          coursesContainer.appendChild(df);
        }       
      })
})

function documentFragment(ev) {
  let df = new DocumentFragment();
  if(ev.currentTarget.value === 'all') {
    courses.forEach(c => {
      df.appendChild(c);
    })
  } else {
      let course = filterCourses(ev);
      course.forEach(c => {
        df.appendChild(c);
      })
    }
    return df;
}

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

/* Secondary Checkbox filter */

filterToggleBtn.addEventListener('mouseup',() => {
  arrow.classList.toggle('rotateArrow');
  filterToggleBtn.classList.toggle('filter-toggle-active')
  if(checkBoxFilter.style.maxHeight) {
    checkBoxFilter.style.maxHeight = null;
    checkBoxFilter.style.overflow = "hidden";
  } else {
    checkBoxFilter.style.maxHeight = checkBoxFilter.scrollHeight + 'px'; 
    setTimeout(()=>{
      checkBoxFilter.style.overflow = "visible";
    },100)
  }
})

filterCheckBoxes.forEach(checkBox => {
  checkBox.addEventListener('change', function(ev) {
    let checkBoxes = ev.target.parentNode.querySelectorAll('i');
    checkBoxes[0].classList.toggle('fas');
    checkBoxes[0].classList.toggle('checkBox-active');
    updateCategoryToggle(checkBox);
  })
  checkBox.addEventListener('mousedown', function(ev) {
    
    let span = ev.target.nextElementSibling.firstElementChild;
    console.log(span)
    span.classList.add('checkbox-ripple-active');

    setTimeout(()=> {
      span.classList.remove('checkbox-ripple-active')
    },400)
  })
})

function updateCategoryToggle(checkBox) {
  let span = document.createElement('span');
  span.classList.add('filter-toggle-counter');
  
  if(counter > 0) {
    categoryToggle.firstElementChild.remove();
  } 
  if(checkBox.checked) {
    filterToggleBtn.classList.add('filter-toggle-bg');
    counter++;
    if(counter > 1) {
      categoryToggle.innerHTML = "Categories";
    } 
    span.innerHTML = counter;
    categoryToggle.prepend(span);
    resetBtn.style.display = 'inline-flex';
  } else {
    counter--;
    if(counter < 2) {
      categoryToggle.innerHTML = "Category";
    }
    if(counter === 0) {
      filterToggleBtn.classList.remove('filter-toggle-bg');
      resetBtn.style.display = 'none';
      return;
    }
    span.innerHTML = counter;
    categoryToggle.prepend(span);
  }  
}

/* Reset secondary filter */

resetBtn.addEventListener('click', () => {
  counter = 0;
  categoryToggle.firstElementChild.remove();
  filterToggleBtn.classList.remove('filter-toggle-bg');
  categoryToggle.innerHTML = "Category";

  filterCheckBoxes.forEach(checkBox => {
    checkBox.checked = false;
  })
  checkBoxIcons.forEach(icon => {
    icon.className = "far fa-square";
    resetBtn.style.display = "none";
  })
})

