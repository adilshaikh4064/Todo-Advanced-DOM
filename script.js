let todoAddNewButton=document.querySelector(".todoAddButton")
let todoInputForm=document.querySelector(".todoForm");
let todoMenuButton=document.querySelector(`.todoMenu`);
let todoVisit=true;

let inprocessAddNewButton=document.querySelector(".inprocessAddButton")
let inprocessInputForm=document.querySelector(".inprocessForm");
let inprocessMenuButton=document.querySelector(`.inprocessMenu`);
let inprocessVisit=true;

let inurAddNewButton=document.querySelector(".inurAddButton")
let inurInputForm=document.querySelector(".inurForm");
let inurMenuButton=document.querySelector(`.inurMenu`);
let inurVisit=true;

let finishedAddNewButton=document.querySelector(".finishedAddButton")
let finishedInputForm=document.querySelector(".finishedForm");
let finishedMenuButton=document.querySelector(`.finishedMenu`);
let finishedVisit=true;


function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todosState));
}
function saveInProcess(){
    localStorage.setItem("inprocess", JSON.stringify(inprocessState));
}
function saveUR(){
    localStorage.setItem("inUR", JSON.stringify(inurState));
}
function saveFinished(){
    localStorage.setItem("finished", JSON.stringify(finishedState));
}

document.addEventListener(`DOMContentLoaded`,()=>{
    renderAll();
})
function renderAll(){
    todosRender();
    inprocessRender();
    inurRender();
    finishedRender();
    footerRender();
}


//TO-DO SECTION
todoAddNewButton.addEventListener("click",()=>{
    todoInputForm.style.display="block";
})
todoMenuButton.addEventListener("click",(event)=>{
    let tasklist=document.querySelector(`.todoTasks`);
    if(todoVisit){
        tasklist.style.display="none";
        todoVisit=false;
    }
    else{
        tasklist.style.display="block";
        todoVisit=true;
    }
})
todoInputForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
    }).format(now);
    
    const todo={
        title:document.querySelector(`input[name="title"]`).value,
        discription:document.querySelector(`input[name="discription"]`).value,
        label:document.querySelector(`input[name="checklist"]:checked`).value,
        timestamp:formattedDate
    };
    todosState.push(todo);
    todosRender();
    todoInputForm.reset();
    todoInputForm.style.display="none";
})

const todosState=JSON.parse(localStorage.getItem("todos")) || []; //JSON.parse(localStorage.getItem("todos")) || 
function todosRender(){
    let todoBoxlist=document.querySelector(`.todoTasks`);
    todoBoxlist.innerHTML=``;
    let index=0;
    todosState.forEach((todoObject)=>{
        let todoBox=todosComponent(todoObject,index);
        index++;
        todoBoxlist.appendChild(todoBox);
    });
    todoBoxlist.style.backgroundColor=`#ffcccb`;
    Object.assign(todoBoxlist.style,{
        borderRadius:`0.5rem`,
    });
    saveTodos();
    footerRender();
}
function todosComponent(todoObject,index){
    const contentBox=document.createElement("div");
    const titleHeader=document.createElement("h2"); 
    const discriptionPara=document.createElement("p");

    const infoBox=document.createElement("div");
    const labelButton=document.createElement("button");
    const labelButtonPara=document.createElement(`p`);
    const timePara=document.createElement("p");
    
    const optionBox=document.createElement("div");
    const toInProgress=document.createElement("button");
    const toUnderReview=document.createElement("button");
    const toFinish=document.createElement("button");
    const deleteTodoBox=document.createElement(`div`);
    const deleteTodo=document.createElement("button");

    titleHeader.innerText = todoObject.title || "Untitled";
    discriptionPara.innerText = todoObject.discription || "No description provided";
    labelButtonPara.innerText = todoObject.label || "Label";
    timePara.innerText = todoObject.timestamp || "No time provided";

    Object.assign(deleteTodoBox.style,{
        backgroundColor:`red`,
        borderRadius:`0.5rem`,
        color:`black`,
    });
    deleteTodoBox.appendChild(deleteTodo);
    Object.assign(optionBox.style,{
        backgroundColor:`#676767`,
        color:`white`,
        borderRadius:`0.5rem`,
        display:`flex`,
        justifyContent:`space-between`,
        alignItems:`center`,
    });
    const optionButtons=[toInProgress,toUnderReview,toFinish,deleteTodo];
    optionButtons.forEach((button)=>{
        button.style.padding=`0.25rem`;
        if(button===deleteTodo){
            button.id=`${index}`;
            button.addEventListener(`click`,()=>{
                todosState.splice(index,1);
                renderAll();
            })
            deleteTodoBox.style.transition=`transform 0.3s ease-in`;
            button.style.width=`full`;
            button.innerText=`Delete`;
        }
        if(button===toInProgress){
            button.innerText=`In Progress`;
            button.addEventListener(`click`,()=>{
                inprocessState.push(todosState[index]);
                todosState.splice(index,1);
                renderAll();
            })
        }
        if(button===toUnderReview){
            button.innerText=`Under Review`;
            button.addEventListener(`click`,()=>{
                inurState.push(todosState[index]);
                todosState.splice(index,1);
                renderAll();
            })
        }
        if(button===toFinish){
            button.innerText=`Finished`;
            button.addEventListener(`click`,()=>{
                finishedState.push(todosState[index]);
                todosState.splice(index,1);
                // finishedtodos+=1;
                renderAll();
            })
        }
        button.addEventListener(`mouseover`,()=>{
            if(button===toInProgress){
                button.style.color=`#b5e2ff`;
            }
            if(button===toUnderReview){
                button.style.color=`#fecb98`;
            }
            if(button===toFinish){
                button.style.color=`#aaf0c9`;
            }
            if(button===deleteTodo){
                deleteTodoBox.style.transform=`scale(1.1)`;
            }
        })
        button.addEventListener(`mouseout`,()=>{
            if(button===deleteTodo){
                deleteTodoBox.style.transform=``;
            }
            else{
                button.style.color=``;
            }
        })
        if(button!==deleteTodo){
            optionBox.appendChild(button);
        }
    });
    optionBox.appendChild(deleteTodoBox);


    Object.assign(infoBox.style,{
        height:`2rem`,
        display:`flex`,
        justifyContent:`space-between`,
        boxSizing:`border-box`,
        paddRight:`0.75rem`,
        borderTop:`1px solid black`,
    });
    Object.assign(labelButtonPara.style,{
        width:`5rem`,
        textAlign:`center`,
        fontSize:`1rem`,
        fontWeight:`500`,
        borderRadius:`1.5rem`,
        transition:`transform 0.3s ease-in`,
    });
    if(todoObject.label===`Low`){
        labelButtonPara.style.color=`green`;
    }
    if(todoObject.label===`Medium`){
        labelButtonPara.style.color=`orange`;
    }
    if(todoObject.label===`Urgent`){
        labelButtonPara.style.color=`red`;
    }
    Object.assign(timePara.style,{
        boxSizing:`border-box`,
        paddingTop:`0.5rem`,
        width:`8rem`,
        textAlign:`center`,
        fontSize:`0.75rme`,
        fontWeight:`500`,
    });
    labelButtonPara.addEventListener(`mouseover`,()=>{{
        labelButton.style.transform=`scale(1.1)`;
    }})
    labelButtonPara.addEventListener(`mouseout`,()=>{{
        labelButton.style.transform=``;
    }})
    labelButton.appendChild(labelButtonPara);
    infoBox.appendChild(labelButton);
    infoBox.appendChild(timePara);

    discriptionPara.style.color=`#728294`;
    discriptionPara.style.fontWeight=`300`;
    contentBox.appendChild(titleHeader);
    contentBox.appendChild(discriptionPara);


    const todoBox=document.createElement(`div`);
    Object.assign(todoBox.style,{
        display:`flex`,
        flexDirection:`column`,
        justifyContent:`space-between`,
        gap:`1rem`,
        boxSizing:`border-box`,
        padding:`1rem 0.75rem`,
        backgroundColor:`#f9f9f9`,
        border:`0.5px solid grey`,
        borderRadius:`0.5rem`,
        marginBottom:`0.5rem`,
    });
    todoBox.appendChild(contentBox);
    todoBox.appendChild(infoBox);
    todoBox.appendChild(optionBox);

    return todoBox;
}


//IN-PROCESS SECTION
inprocessAddNewButton.addEventListener("click",()=>{
    inprocessInputForm.style.display="block";
})
inprocessMenuButton.addEventListener("click",(event)=>{
    let tasklist=document.querySelector(`.inprocessTasks`);
    if(inprocessVisit){
        tasklist.style.display="none";
        inprocessVisit=false;
    }
    else{
        tasklist.style.display="block";
        inprocessVisit=true;
    }
})
inprocessInputForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
    }).format(now);
    
    const todo={
        title:document.querySelector(`input[name="inprtitle"]`).value,
        discription:document.querySelector(`input[name="inprdiscription"]`).value,
        label:document.querySelector(`input[name="checklist"]:checked`).value,
        timestamp:formattedDate
    };
    inprocessState.push(todo);
    inprocessRender();
    inprocessInputForm.reset();
    inprocessInputForm.style.display="none";
})

const inprocessState=JSON.parse(localStorage.getItem("inprocess")) || []; //JSON.parse(localStorage.getItem("inprocess")) || 
function inprocessRender(){
    let todoBoxlist=document.querySelector(`.inprocessTasks`);
    todoBoxlist.innerHTML=``;
    let index=0;
    inprocessState.forEach((todoObject)=>{
        let todoBox=inprocessComponent(todoObject,index);
        index++;
        todoBoxlist.appendChild(todoBox);
    });
    todoBoxlist.style.backgroundColor=`#b5e2ff`;
    todoBoxlist.style.borderRadius=`0.5rem`;
    saveInProcess();
    footerRender();
}
function inprocessComponent(todoObject,index){
    const contentBox=document.createElement("div");
    const titleHeader=document.createElement("h2"); 
    const discriptionPara=document.createElement("p");

    const infoBox=document.createElement("div");
    const labelButton=document.createElement("button");
    const labelButtonPara=document.createElement(`p`);
    const timePara=document.createElement("p");
    
    const optionBox=document.createElement("div");
    const toTodo=document.createElement("button");
    const toUnderReview=document.createElement("button");
    const toFinish=document.createElement("button");
    const deleteTodoBox=document.createElement(`div`);
    const deleteTodo=document.createElement("button");

    titleHeader.innerText = todoObject.title || "Untitled";
    discriptionPara.innerText = todoObject.discription || "No description provided";
    labelButtonPara.innerText = todoObject.label || "Label";
    timePara.innerText = todoObject.timestamp || "No time provided";

    Object.assign(deleteTodoBox.style,{
        backgroundColor:`red`,
        borderRadius:`0.5rem`,
        color:`black`,
    });
    deleteTodoBox.appendChild(deleteTodo);
    Object.assign(optionBox.style,{
        backgroundColor:`#676767`,
        color:`white`,
        borderRadius:`0.5rem`,
        display:`flex`,
        justifyContent:`space-between`,
        alignItems:`center`,
    });
    const optionButtons=[toTodo,toUnderReview,toFinish,deleteTodo];
    optionButtons.forEach((button)=>{
        button.style.padding=`0.25rem`;
        if(button===deleteTodo){
            button.id=`${index}`;
            button.addEventListener(`click`,()=>{
                inprocessState.splice(index,1);
                renderAll();
            })
            deleteTodoBox.style.transition=`transform 0.3s ease-in`;
            button.style.width=`full`;
            button.innerText=`Delete`;
        }
        if(button===toTodo){
            button.innerText=`Todo`;
            button.addEventListener(`click`,()=>{
                todosState.push(inprocessState[index]);
                inprocessState.splice(index,1);
                renderAll();
            })
        }
        if(button===toUnderReview){
            button.innerText=`Under Review`;
            button.addEventListener(`click`,()=>{
                inurState.push(inprocessState[index]);
                inprocessState.splice(index,1);
                renderAll();
            })
        }
        if(button===toFinish){
            button.innerText=`Finished`;
            button.addEventListener(`click`,()=>{
                finishedState.push(inprocessState[index]);
                inprocessState.splice(index,1);
                // finishedprogress+=1;
                renderAll();
            })
        }
        button.addEventListener(`mouseover`,()=>{
            if(button===toTodo){
                button.style.color=`#ffcccb`;
            }
            if(button===toUnderReview){
                button.style.color=`#fecb98`;
            }
            if(button===toFinish){
                button.style.color=`#aaf0c9`;
            }
            if(button===deleteTodo){
                deleteTodoBox.style.transform=`scale(1.1)`;
            }
        })
        button.addEventListener(`mouseout`,()=>{
            if(button===deleteTodo){
                deleteTodoBox.style.transform=``;
            }
            else{
                button.style.color=``;
            }
        })
        if(button!==deleteTodo){
            optionBox.appendChild(button);
        }
    });
    optionBox.appendChild(deleteTodoBox);


    Object.assign(infoBox.style,{
        height:`2rem`,
        display:`flex`,
        justifyContent:`space-between`,
        boxSizing:`border-box`,
        paddRight:`0.75rem`,
        borderTop:`1px solid black`,
    });
    Object.assign(labelButtonPara.style,{
        width:`5rem`,
        textAlign:`center`,
        fontSize:`1rem`,
        fontWeight:`500`,
        borderRadius:`1.5rem`,
        transition:`transform 0.3s ease-in`,
    });
    if(todoObject.label===`Low`){
        labelButtonPara.style.color=`green`;
    }
    if(todoObject.label===`Medium`){
        labelButtonPara.style.color=`orange`;
    }
    if(todoObject.label===`Urgent`){
        labelButtonPara.style.color=`red`;
    }
    Object.assign(timePara.style,{
        boxSizing:`border-box`,
        paddingTop:`0.5rem`,
        width:`8rem`,
        textAlign:`center`,
        fontSize:`0.75rme`,
        fontWeight:`500`,
    });
    labelButtonPara.addEventListener(`mouseover`,()=>{{
        labelButton.style.transform=`scale(1.1)`;
    }})
    labelButtonPara.addEventListener(`mouseout`,()=>{{
        labelButton.style.transform=``;
    }})
    labelButton.appendChild(labelButtonPara);
    infoBox.appendChild(labelButton);
    infoBox.appendChild(timePara);

    discriptionPara.style.color=`#728294`;
    discriptionPara.style.fontWeight=`300`;
    contentBox.appendChild(titleHeader);
    contentBox.appendChild(discriptionPara);


    const todoBox=document.createElement(`div`);
    Object.assign(todoBox.style,{
        display:`flex`,
        flexDirection:`column`,
        justifyContent:`space-between`,
        gap:`1rem`,
        boxSizing:`border-box`,
        padding:`1rem 0.75rem`,
        backgroundColor:`#f9f9f9`,
        border:`0.5px solid grey`,
        borderRadius:`0.5rem`,
        marginBottom:`0.5rem`,
    });
    todoBox.appendChild(contentBox);
    todoBox.appendChild(infoBox);
    todoBox.appendChild(optionBox);

    return todoBox;
}


//UNDER-REVIEW SECTION
inurAddNewButton.addEventListener("click",()=>{
    inurInputForm.style.display="block";
})
inurMenuButton.addEventListener("click",(event)=>{
    let tasklist=document.querySelector(`.inurTasks`);
    if(inurVisit){
        tasklist.style.display="none";
        inurVisit=false;
    }
    else{
        tasklist.style.display="block";
        inurVisit=true;
    }
})
inurInputForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
    }).format(now);
    
    const todo={
        title:document.querySelector(`input[name="inurtitle"]`).value,
        discription:document.querySelector(`input[name="inurdiscription"]`).value,
        label:document.querySelector(`input[name="checklist"]:checked`).value,
        timestamp:formattedDate
    };
    inurState.push(todo);
    inurRender();
    inurInputForm.reset();
    inurInputForm.style.display="none";
})

const inurState= JSON.parse(localStorage.getItem("inUR")) || []; //JSON.parse(localStorage.getItem("inUR")) || 
function inurRender(){
    let todoBoxlist=document.querySelector(`.inurTasks`);
    todoBoxlist.innerHTML=``;
    let index=0;
    inurState.forEach((todoObject)=>{
        let todoBox=inurComponent(todoObject,index);
        index++;
        todoBoxlist.appendChild(todoBox);
    });
    todoBoxlist.style.backgroundColor=`#fecb98`;
    todoBoxlist.style.borderRadius=`0.5rem`;
    saveUR();
    footerRender();
}
function inurComponent(todoObject,index){
    const contentBox=document.createElement("div");
    const titleHeader=document.createElement("h2"); 
    const discriptionPara=document.createElement("p");

    const infoBox=document.createElement("div");
    const labelButton=document.createElement("button");
    const labelButtonPara=document.createElement(`p`);
    const timePara=document.createElement("p");
    
    const optionBox=document.createElement("div");
    const toTodo=document.createElement("button");
    const toInProgress=document.createElement("button");
    const toFinish=document.createElement("button");
    const deleteTodoBox=document.createElement(`div`);
    const deleteTodo=document.createElement("button");

    titleHeader.innerText = todoObject.title || "Untitled";
    discriptionPara.innerText = todoObject.discription || "No description provided";
    labelButtonPara.innerText = todoObject.label || "Label";
    timePara.innerText = todoObject.timestamp || "No time provided";

    Object.assign(deleteTodoBox.style,{
        backgroundColor:`red`,
        borderRadius:`0.5rem`,
        color:`black`,
    });
    deleteTodoBox.appendChild(deleteTodo);
    Object.assign(optionBox.style,{
        backgroundColor:`#676767`,
        color:`white`,
        borderRadius:`0.5rem`,
        display:`flex`,
        justifyContent:`space-between`,
        alignItems:`center`,
    });
    const optionButtons=[toTodo,toInProgress,toFinish,deleteTodo];
    optionButtons.forEach((button)=>{
        button.style.padding=`0.25rem`;
        if(button===deleteTodo){
            button.id=`${index}`;
            button.addEventListener(`click`,()=>{
                inurState.splice(index,1);
                renderAll();
            })
            deleteTodoBox.style.transition=`transform 0.3s ease-in`;
            button.style.width=`full`;
            button.innerText=`Delete`;
        }
        if(button===toTodo){
            button.innerText=`Todo`;
            button.addEventListener(`click`,()=>{
                todosState.push(inurState[index]);
                inurState.splice(index,1);
                renderAll();
            })
        }
        if(button===toInProgress){
            button.innerText=`In Progress`;
            button.addEventListener(`click`,()=>{
                inprocessState.push(inurState[index]);
                inurState.splice(index,1);
                renderAll();
            })
        }
        if(button===toFinish){
            button.innerText=`Finished`;
            button.addEventListener(`click`,()=>{
                finishedState.push(inurState[index]);
                inurState.splice(index,1);
                // finishedunderreview+=1;
                renderAll();
            })
        }
        button.addEventListener(`mouseover`,()=>{
            if(button===toTodo){
                button.style.color=`#ffcccb`;
            }
            if(button===toInProgress){
                button.style.color=`#b5e2ff`;
            }
            if(button===toFinish){
                button.style.color=`#aaf0c9`;
            }
            if(button===deleteTodo){
                deleteTodoBox.style.transform=`scale(1.1)`;
            }
        })
        button.addEventListener(`mouseout`,()=>{
            if(button===deleteTodo){
                deleteTodoBox.style.transform=``;
            }
            else{
                button.style.color=``;
            }
        })
        if(button!==deleteTodo){
            optionBox.appendChild(button);
        }
    });
    optionBox.appendChild(deleteTodoBox);


    Object.assign(infoBox.style,{
        height:`2rem`,
        display:`flex`,
        justifyContent:`space-between`,
        boxSizing:`border-box`,
        paddRight:`0.75rem`,
        borderTop:`1px solid black`,
    });
    Object.assign(labelButtonPara.style,{
        width:`5rem`,
        textAlign:`center`,
        fontSize:`1rem`,
        fontWeight:`500`,
        borderRadius:`1.5rem`,
        transition:`transform 0.3s ease-in`,
    });
    if(todoObject.label===`Low`){
        labelButtonPara.style.color=`green`;
    }
    if(todoObject.label===`Medium`){
        labelButtonPara.style.color=`orange`;
    }
    if(todoObject.label===`Urgent`){
        labelButtonPara.style.color=`red`;
    }
    Object.assign(timePara.style,{
        boxSizing:`border-box`,
        paddingTop:`0.5rem`,
        width:`8rem`,
        textAlign:`center`,
        fontSize:`0.75rme`,
        fontWeight:`500`,
    });
    labelButtonPara.addEventListener(`mouseover`,()=>{{
        labelButton.style.transform=`scale(1.1)`;
    }})
    labelButtonPara.addEventListener(`mouseout`,()=>{{
        labelButton.style.transform=``;
    }})
    labelButton.appendChild(labelButtonPara);
    infoBox.appendChild(labelButton);
    infoBox.appendChild(timePara);

    discriptionPara.style.color=`#728294`;
    discriptionPara.style.fontWeight=`300`;
    contentBox.appendChild(titleHeader);
    contentBox.appendChild(discriptionPara);


    const todoBox=document.createElement(`div`);
    Object.assign(todoBox.style,{
        display:`flex`,
        flexDirection:`column`,
        justifyContent:`space-between`,
        gap:`1rem`,
        boxSizing:`border-box`,
        padding:`1rem 0.75rem`,
        backgroundColor:`#f9f9f9`,
        border:`0.5px solid grey`,
        borderRadius:`0.5rem`,
        marginBottom:`0.5rem`,
    });
    todoBox.appendChild(contentBox);
    todoBox.appendChild(infoBox);
    todoBox.appendChild(optionBox);

    return todoBox;
}


//FINISHED SECTION
finishedAddNewButton.addEventListener("click",()=>{
    finishedInputForm.style.display="block";
})
finishedMenuButton.addEventListener("click",(event)=>{
    let tasklist=document.querySelector(`.finishedTasks`);
    if(finishedVisit){
        tasklist.style.display="none";
        finishedVisit=false;
    }
    else{
        tasklist.style.display="block";
        finishedVisit=true;
    }
})
finishedInputForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
    }).format(now);
    
    const todo={
        title:document.querySelector(`input[name="finishedtitle"]`).value,
        discription:document.querySelector(`input[name="finisheddiscription"]`).value,
        label:document.querySelector(`input[name="checklist"]:checked`).value,
        timestamp:formattedDate
    };
    finishedState.push(todo);
    finishedRender();
    finishedInputForm.reset();
    finishedInputForm.style.display="none";
})

const finishedState=JSON.parse(localStorage.getItem("finished")) || []; //JSON.parse(localStorage.getItem("finished")) || 
function finishedRender(){
    let todoBoxlist=document.querySelector(`.finishedTasks`);
    todoBoxlist.innerHTML=``;
    let index=0;
    finishedState.forEach((todoObject)=>{
        let todoBox=finishedComponent(todoObject,index);
        index++;
        todoBoxlist.appendChild(todoBox);
    });
    todoBoxlist.style.backgroundColor=`#aaf0c9`;
    todoBoxlist.style.borderRadius=`0.5rem`;
    saveFinished();
    footerRender();
}
function finishedComponent(todoObject,index){
    const contentBox=document.createElement("div");
    const titleHeader=document.createElement("h2"); 
    const discriptionPara=document.createElement("p");

    const infoBox=document.createElement("div");
    const labelButton=document.createElement("button");
    const labelButtonPara=document.createElement(`p`);
    const timePara=document.createElement("p");
    
    const optionBox=document.createElement("div");
    const toTodo=document.createElement("button");
    const toInProgress=document.createElement("button");
    const toUnderReview=document.createElement("button");
    const deleteTodoBox=document.createElement(`div`);
    const deleteTodo=document.createElement("button");

    titleHeader.innerText = todoObject.title || "Untitled";
    discriptionPara.innerText = todoObject.discription || "No description provided";
    labelButtonPara.innerText = todoObject.label || "Label";
    timePara.innerText = todoObject.timestamp || "No time provided";

    Object.assign(deleteTodoBox.style,{
        backgroundColor:`red`,
        borderRadius:`0.5rem`,
        color:`black`,
    });
    deleteTodoBox.appendChild(deleteTodo);
    Object.assign(optionBox.style,{
        backgroundColor:`#676767`,
        color:`white`,
        borderRadius:`0.5rem`,
        display:`flex`,
        justifyContent:`space-between`,
        alignItems:`center`,
    });
    const optionButtons=[toTodo,toInProgress,toUnderReview,deleteTodo];
    optionButtons.forEach((button)=>{
        button.style.padding=`0.25rem`;
        if(button===deleteTodo){
            button.id=`${index}`;
            button.addEventListener(`click`,()=>{
                finishedState.splice(index,1);
                renderAll();
            })
            deleteTodoBox.style.transition=`transform 0.3s ease-in`;
            button.style.width=`full`;
            button.innerText=`Delete`;
        }
        if(button===toTodo){
            button.innerText=`Todo`;
            button.addEventListener(`click`,()=>{
                todosState.push(finishedState[index]);
                finishedState.splice(index,1);
                renderAll();
            })
        }
        if(button===toInProgress){
            button.innerText=`In Progress`;
            button.addEventListener(`click`,()=>{
                inprocessState.push(finishedState[index]);
                finishedState.splice(index,1);
                renderAll();
            })
        }
        if(button===toUnderReview){
            button.innerText=`Under Review`;
            button.addEventListener(`click`,()=>{
                inurState.push(finishedState[index]);
                finishedState.splice(index,1);
                renderAll();
            })
        }
        button.addEventListener(`mouseover`,()=>{
            if(button===toTodo){
                button.style.color=`#ffcccb`;
            }
            if(button===toInProgress){
                button.style.color=`#b5e2ff`;
            }
            if(button===toUnderReview){
                button.style.color=`#fecb98`;
            }
            if(button===deleteTodo){
                deleteTodoBox.style.transform=`scale(1.1)`;
            }
        })
        button.addEventListener(`mouseout`,()=>{
            if(button===deleteTodo){
                deleteTodoBox.style.transform=``;
            }
            else{
                button.style.color=``;
            }
        })
        if(button!==deleteTodo){
            optionBox.appendChild(button);
        }
    });
    optionBox.appendChild(deleteTodoBox);


    Object.assign(infoBox.style,{
        height:`2rem`,
        display:`flex`,
        justifyContent:`space-between`,
        boxSizing:`border-box`,
        paddRight:`0.75rem`,
        borderTop:`1px solid black`,
    });
    Object.assign(labelButtonPara.style,{
        width:`5rem`,
        textAlign:`center`,
        fontSize:`1rem`,
        fontWeight:`500`,
        borderRadius:`1.5rem`,
        transition:`transform 0.3s ease-in`,
    });
    if(todoObject.label===`Low`){
        labelButtonPara.style.color=`green`;
    }
    if(todoObject.label===`Medium`){
        labelButtonPara.style.color=`orange`;
    }
    if(todoObject.label===`Urgent`){
        labelButtonPara.style.color=`red`;
    }
    Object.assign(timePara.style,{
        boxSizing:`border-box`,
        paddingTop:`0.5rem`,
        width:`8rem`,
        textAlign:`center`,
        fontSize:`0.75rme`,
        fontWeight:`500`,
    });
    labelButtonPara.addEventListener(`mouseover`,()=>{{
        labelButton.style.transform=`scale(1.1)`;
    }})
    labelButtonPara.addEventListener(`mouseout`,()=>{{
        labelButton.style.transform=``;
    }})
    labelButton.appendChild(labelButtonPara);
    infoBox.appendChild(labelButton);
    infoBox.appendChild(timePara);

    discriptionPara.style.color=`#728294`;
    discriptionPara.style.fontWeight=`300`;
    contentBox.appendChild(titleHeader);
    contentBox.appendChild(discriptionPara);


    const todoBox=document.createElement(`div`);
    Object.assign(todoBox.style,{
        display:`flex`,
        flexDirection:`column`,
        justifyContent:`space-between`,
        gap:`1rem`,
        boxSizing:`border-box`,
        padding:`1rem 0.75rem`,
        backgroundColor:`#f9f9f9`,
        border:`0.5px solid grey`,
        borderRadius:`0.5rem`,
        marginBottom:`0.5rem`,
    });
    todoBox.appendChild(contentBox);
    todoBox.appendChild(infoBox);
    todoBox.appendChild(optionBox);

    return todoBox;
}




//FOOTER SECTION
// let finishedtodos=0;

// let finishedprogress=0;

// let finishedunderreview=0;


function footerRender(){
    let todos=todosState.length;
    let progress=inprocessState.length;
    let underreview=inurState.length;
    let finished=finishedState.length;


    let todosDisplay=document.querySelector(`.todos-circle p`);
    todosDisplay.innerText=`${todos}`;
    
    let todosColor=document.querySelector(`.todos-with`);
    if(todos==0){
        todosColor.style.width=`100%`;
    }else{
        if(todos>=99){
            todosColor.style.width=`1%`;
        }
        else{
            todosColor.style.width=`${100-todos}%`;
        }
    }
    
    
    // 
    let progressDisplay=document.querySelector(`.inprogress-circle p`);
    progressDisplay.innerText=`${progress}`;
    
    let progressColor=document.querySelector(`.inprogress-with`);
    //progressColor.style.width=`${(finishedprogress/progress)*100}%`;
    if(progress==0){
        progressColor.style.width=`100%`;
    }else{
        if(progress>=99){
            progressColor.style.width=`1%`;
        }
        else{
            progressColor.style.width=`${100-progress}%`;
        }
    }
    
    
    // 
    let underreviewDisplay=document.querySelector(`.underreview-circle p`);
    underreviewDisplay.innerText=`${underreview}`;
    
    let underreviewColor=document.querySelector(`.underreview-with`);
    //underreviewColor.style.width=`${(finishedunderreview/underreview)*100}%`;
    if(underreview==0){
        underreviewColor.style.width=`100%`;
    }else{
        if(underreview>=99){
            underreviewColor.style.width=`1%`;
        }
        else{
            underreviewColor.style.width=`${100-underreview}%`;
        }
    }
    
    
    // 
    let finishedDisplay=document.querySelector(`.finished-circle p`);
    finishedDisplay.innerText=`${(finished)}/${todos+progress+underreview+finished}`;
    
    let finishedColor=document.querySelector(`.finished-with`);
    finishedColor.style.width=`${(finished/(todos+progress+underreview+finished))*100}%`;
    
    
    
    //FLOATER SECTION
    let progressBar=document.querySelector(`.progress-bar`);
    let progressFraction=document.querySelector(`.progress`);
    
    let percentage=`${(finished/(todos+progress+underreview+finished))*100}%`;
    progressBar.style.width=percentage;
    // const interval=setInterval(()=>{
    //     if(percentage>=100){
    //         clearInterval(interval);
    //     }
    //     else{
    //         percentage+=1;
    //         progressBar.style.width=percentage+`%`;
    //     }
    // },100);
}
