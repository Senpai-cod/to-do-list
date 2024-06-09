export class Project{
    constructor(name){
        this.tasksNum = 0;
        this.name = name;
        this.tasks = [];
    }
    addToList(task){
        
        if(this.tasks.some(element => 
        JSON.stringify(element) == JSON.stringify(task)))
            return;
        this.tasks.push(task);
        this.tasksNum++;
    }
    listSize(){
        return this.tasksNum;
    }
    displayTasksTitle(){
        this.tasks.forEach((task)=> console.log(task.title))
    }

    deleteTask(task){
        let index = this.tasks.findIndex(element => 
            JSON.stringify(element) == JSON.stringify(task))
         if(index != -1){
            this.tasks.splice(index, 1);
            this.tasksNum--;
         }   
    }
}

export class Task{
    constructor(title, description, 
        date, priority, project){
            this.title = title;
            this.description = description;
            this.date = date;
            this.priority = priority;
            this.project = project;
            this.complete = false;
        }
    editTask(property, newValue){
        if(property != "complete") 
            this[property] = newValue;
    }
    completeTask(){
        this.complete = true;
    }
}

export const defaultList = new Project("All");
export const projects = [ defaultList ];

export function createNewProject(name){
    const project = new Project(name);
    projects.push(project);
}

export function addTaskToList(task, project){
    project.addToList(task);
    defaultList.addToList(task);
}

export function createNewTask(title, description, date, priority, project){
    const task = new Task(title, description, date, priority, project);
    const list = projects.find((list)=> list.name == project);
    if(!list){
        createNewProject(project);
        addTaskToList(task, projects[projects.length - 1])
    }
    else
        addTaskToList(task, list)
    return task;
}

export function deleteTaskFromLists(task){
    const list = projects.find((list)=> list.name == task.project);
    list.deleteTask(task);
    defaultList.deleteTask(task);
}
export function deleteProject(name){
    let foundIndex = projects.findIndex((element)=> element.name == name);
    projects.splice(foundIndex, 1);
    let index = 0;
    defaultList.tasks.forEach((task)=>{
        if(task.project == name){
            defaultList.tasks.splice(index, 1);
            defaultList.tasksNum--;
        }
        index++;
    })
}