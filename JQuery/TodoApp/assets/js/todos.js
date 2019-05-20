// Toggle text input
$(document).on("click", "#addTask",function(){
    $("#textInput").fadeToggle("slow");
})

// Show delete button on hover
$(document).on("mouseenter", "li",function(){
    $(".del", this).toggle("slide");
})
$(document).on("mouseleave", "li",function(){
    $(".del", this).toggle("slide");
})

//Mark item as completed on click
$(document).on("click", ".listItem",function(){
    $(this).toggleClass("done");
})

//Delete task
$(document).on("click", ".del",function(){
    $(this).parent().fadeOut();
})

//Add task
$("#textInput").keypress(function(e){
    if(e.which === 13){
        var task = $("#textInput").val();
        $("#textInput").val("");
        var newTask = "<li><button class='del'><i class='fas fa-trash'></i></button><span class='listItem'> " + task + " </span></li>";
        $("ul").append(newTask);
    }
})