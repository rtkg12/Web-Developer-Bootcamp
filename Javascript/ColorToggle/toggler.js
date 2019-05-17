// document.querySelector("button").addEventListener("click", function(){
//     let isPurple = (document.body.style.backgroundColor == "purple");
//     if(isPurple){
//         document.body.style.backgroundColor = "";
//     } else {
//         document.body.style.backgroundColor = "purple";
//     }
//     isPurple = !isPurple;
// })

// A better/ more elegant solution

document.querySelector("button").addEventListener("click", function(){
    document.body.classList.toggle("purple");
})