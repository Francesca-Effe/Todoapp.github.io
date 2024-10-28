
function setVhProperty() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVhProperty();
window.addEventListener('resize', setVhProperty);

/* Menu */

const wrapper= document.querySelector(".wrapper");
const backBtn= document.querySelector(".back-btn");
const menuBtn= document.querySelector(".menu-btn");


const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
};


menuBtn.addEventListener("click" , toggleScreen);
backBtn.addEventListener("click", toggleScreen);

/* task form */

const addTaskBtn= document.querySelector(".add-task-btn");
const addTaskForm= document.querySelector(".add-task");
const blackBackdrop= document.querySelector(".black-backdrop");


const toggleAddTaskForm= () =>{
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);

/* categories and tasks */

let categories = [
    {
        title: "Personal",
        img: "lock.png"
        
    },
    {
        title: "Education",
        img: "notebook.png"
        
    },
    {
        title: "Work",
        img: "briefcase.png"
        
    },
    {
        title: "Free Time",
        img: "game.png"
        
    },
    
    {
        title: "Finance",
        img: "finance.png"
       
    },
    
];

let tasks = [
    {
       id: 1,
       task: "learn a new language",
       category:"Education",
       completed:false, 
    },
    {
       id: 2,
       task: "Do morning excersise",
       category:"Personal",
       completed:false,
    },
    {
       id: 3,
       task: "Buy a freezer",
       category:"Personal",
       completed:false,
    },
    {
       id: 4,
       task: "Review investment project",
       category:"Finance",
       completed:false,
    },
    {
       id: 5,
       task: "Check new Ozptek book",
       category:"Free Time",
       completed:false,
    },
    {
       id: 6,
       task: "Check React",
       category:"Work",
       completed:false, 
    },
    {
       id: 9,
       task: "learn more languages",
       category:"Work",
       completed:false, 
    },
    {
       id: 7,
       task: "Write a book",
       category:"Personal",
       completed:false, 
    },
    {
       id: 8,
       task: "cook more",
       category:"Personal",
       completed:false, 
    },
    {
       id: 9,
       task: "learn React",
       category:"Education",
       completed:false, 
    },
];

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

const calculateTotal = () =>{
     const categoryTasks= tasks.filter((task) => task.category.toLowerCase()=== selectedCategory.title.toLowerCase()
    );

    totalCategoryTasks.innerHTML = `${
        categoryTasks.length } Tasks `;

    totalTasks.innerHTML = tasks.length;
};




const renderCategories = () =>{
       categoriesContainer.innerHTML = "";
       categories.forEach((category) =>{
        const categoryTasks= tasks.filter((task) => task.category.toLowerCase()=== category.title.toLowerCase()
    );

    /* div to render category */
       const div = document.createElement("div");
       div.classList.add("category");
       div.addEventListener("click", () =>{
        wrapper.classList.add("show-category");
        selectedCategory = category;
       
        categoryTitle.innerHTML = category.title;
        categoryImg.src = `images/${category.img}`;
        calculateTotal ();

        /* rerender tasks when category change */
        renderTasks();

       });
       div.innerHTML=`   <div class="left">
                           <img src="images/${category.img}" alt="${category.title}"> 
                           <div class="content">
                            <h1>${category.title}</h1>
                            <p>${categoryTasks.length} Tasks</p>
                           </div>
                        </div>
                        <div class="options">
                            <div class="toggle-btn">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="m8 7 4 4 4-4m-8 6 4 4 4-4" />
                                </svg>

                            </div>
                        </div>
       
                    `;

         categoriesContainer.appendChild(div);           

       });
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = ()=>{
    tasksContainer.innerHTML = "";
     const categoryTasks= tasks.filter((task) => task.category.toLowerCase()=== selectedCategory.title.toLowerCase()
    );

    /* if no taask for selected category */
    if (categoryTasks.length===0){
        tasksContainer.innerHTML = `

         <p class="no-task">no task for this category</p>

        `;
    } else {

        /* if there are tasks for selected category render them */
        categoryTasks.forEach((task) =>{
            const div = document.createElement("div");
            div.classList.add("task-wrapper");
            const label= document.createElement("label");
            label.classList.add("task");
            label.setAttribute("for", task.id);
            const checkbox= document.createElement("input");
            checkbox.type= "checkbox";
            checkbox.id= task.id;
            checkbox.checked= task.completed;

            /* functionality on click checkbox */
            checkbox.addEventListener('change',()=>{
                const index= tasks.findIndex((t) =>t.id === task.id);
                /*  change the true to faulse or viceversa */
                tasks[index].completed= !tasks[index].completed;
                /* save in local */
                saveLocal();
            });

            div.innerHTML= `
              <div class="delete">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>

                    </div>
            `;

            label.innerHTML = `
            <span class="checkmark">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z" />
                        </svg>
 
                        </span>
                        <p>${task.task}</p>
            `;

            label.prepend (checkbox);
            div.prepend (label);
            tasksContainer.appendChild(div);

            /* delete functionality */

            const deleteBtn= div.querySelector(".delete");
            deleteBtn.addEventListener("click",()=>{
                const index= tasks.findIndex((t) =>t.id === task.id);

                /* remove the clicked task */
                tasks.splice(index,1);
                saveLocal();
                renderTasks();

            });
        });

        renderCategories();
        calculateTotal();
    }

};


/* save and get tasks from local storage */
const saveLocal = ()=>{
     localStorage.setItem("tasks", JSON.stringify(tasks));
}
const getLocal = ()=>{
     const localTasks= JSON.parse(localStorage.getItem("tasks"))

      /* if tasks found  */
      if (localTasks) {
        tasks=localTasks;
      }
};

/* render all the categories in select */
const categorySelect=document.querySelector("#category-select");
const cancelBtn=document.querySelector(".cancel-btn");
const addBtn=document.querySelector(".add-btn");

const taskInput=document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);

addBtn.addEventListener("click", ()=>{
    const task = taskInput.value;
    const category = categorySelect.value;

    if (task===""){
        alert("Please enter a task");
    } else{

        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

        const newTask = {
            id: newId,
            task,
            category,
            completed: false,

        };
        tasks.push(newTask);
        taskInput.value = "";
        saveLocal();
        toggleAddTaskForm();
        renderTasks();
        renderCategories();
    }
});

categories.forEach((category)=>{
    const option= document.createElement("option");
    option.value=category.title.toLowerCase();
    option.textContent=category.title;
    categorySelect.appendChild(option);
});

/*  stored tasks */
getLocal();
calculateTotal ();

renderTasks();

