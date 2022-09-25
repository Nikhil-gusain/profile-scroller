console.log("welcome to profile scroller")
//all these lets and const are being used multimple times at different functions so to save lines of code i made at global scope
const men = document.getElementById("men")
const women = document.getElementById("women")
let data;
let profile

/************************************************************** FUNCTION TO GET PROFILES **************************************************************/ 
//this function takes gender and gives the according results
function get_profile(gender){
    let xhr = new XMLHttpRequest() ;
    xhr.open("GET",`${gender.toLowerCase()}_profile.txt`,true);
    xhr.onload = function(e){
        data = ""
        data = JSON.parse(this.responseText);
        
    }
    xhr.send()
}

/****************************************************** ITERATOR FOR SELECTING INDIVIDUAL PROFILE ******************************************************/
//by making i outside the function gives me advantage to go back to last profile
let i = 0;
function profile_iterator(dlist) {
    return {
        next : ()=>{
        /*
        making if else loop so that 
        1. If value of i drop to -1 so i can increase it to not get error
        2.If value of i raise that there is no element to show to reduce its value to avoid error
         */
        if(dlist.length==i){
            i=0
        }
        else if (i<0){
            i = dlist.length-1
        }
             return dlist.length<i? {value : dlist[i],done:true}:{value : dlist[i++],done:false}}}
    

}

/*************************************************** ADDING EVENT LISTNER TO GET AND SHOW PROFILES ***************************************************/
const sub_btn = document.getElementById("sub_btn")
//here this btn gives gender to get_profile() to fetch data 
sub_btn.addEventListener("click",(e)=>{
    e.preventDefault()
    //initializing value to gender according to the user selection
    let gender
    if(men.checked){
        gender = men.value
    }
    else if(women.checked){
        gender = women.value
    }
    get_profile(gender)
    /*
    using setTimeout to avoid error as get_profile is asycronous and take a 
    little time it will show nothing if show profile is used just after
    get_profile will not be able to assign fetched data to variable name data
    */
    setTimeout(() => {
        profile = profile_iterator(data)
        show_profile()
        }, 1000);
})


/************************************************************FUNCTION TO SHOW PROFILES ************************************************************/
 function show_profile(dir) {
    if(dir == 1){
        i-=2
    }
    let candidate = profile.next().value
    const container = document.getElementById("container")
    let gender
    if(men.checked){
        container.innerHTML = `<img src="${candidate["Image"]}" class="rounded mx-auto d-block" alt="...">
                            <br>
                           <ul class="list-group  mx-auto d-block">
                           <li class="list-group-item mx-auto d-block">NAME : ${candidate["Name"]} </li>
                           <li class="list-group-item mx-auto d-block">AGE : ${candidate["Age"]} </li>
                           <li class="list-group-item mx-auto d-block">JOB : ${candidate["Job"]} </li>
                           <li class="list-group-item mx-auto d-block">INCOME : ${candidate["Income"]} </li>
                           </ul>
                           <button class="btn btn-primary btn-block" onclick = "show_profile(0)"> Next profile --> </button>
                           <button class="btn btn-primary btn-block" onclick = "show_profile(1)"> <--Last Profile </button>
                           <button onclick = "go_back()">HOME </button>`
    }
    else if(women.checked){
        container.innerHTML = `<img src="${candidate["Image"]}" class="rounded mx-auto d-block" alt="...">
                            <br>
                           <ul class="list-group  mx-auto d-block">
                           <li class="list-group-item mx-auto d-block">NAME : ${candidate["Name"]} </li>
                           <li class="list-group-item mx-auto d-block">AGE : ${candidate["Age"]} </li>
                           </ul>
                           <button class="btn btn-primary btn-block" onclick = "show_profile(0)"> Next profile --> </button>
                           <button class="btn btn-primary btn-block" onclick = "show_profile(1)"> <--Last Profile </button>
                           <button onclick = "go_back()">HOME </button>`
    }
    
    
 }
/***********************************************************FUNCTION TO RELODE WEB PAGE ***********************************************************/
function go_back(){
    location.reload()
}
//image HTML
//<img src="..." class="rounded mx-auto d-block" alt="...">


/*
// html for showing data 
<ul class="list-group">
<li class="list-group-item active" aria-current="true">An active item</li>
<li class="list-group-item">A second item</li>
<li class="list-group-item">A third item</li>
<li class="list-group-item">A fourth item</li>
<li class="list-group-item">And a fifth one</li>
</ul>*/