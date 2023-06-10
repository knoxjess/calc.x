var operators = ["+", "-", "/", "*"];

var box = null;
var last_operation_history = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operator_value;
var last_button;
var calc_operator;

var total;

var key_combination = []
function button_number(button) {

    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    last_operation_history = document.getElementById("operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;
    
    last_button = button;

    //if button is not an operator 
    if (!operators.includes(button) && button!=equal){

    // if it is the first button clicked
    if (firstNum){
    // and it's a dot, show 0.
    if (button == dot){
        box.innerText = "0"+dot;
    }
    // else clear box and show the number
    else {
        box.innerText = button;
    }
    firstNum = false;
}
else {

    // return if the box value is 0
    if (box.innerText.length == 1 && box.innerText == 0){

        if (button == dot){
            box.innerText += button;
        }
        return;
    }
    // return if the box already has a dot and clicked button is a dot
    if (box.innerText.includes(dot) && button == dot){
        return;
    }
    // maximum allowed numbers inputted are 20
    if (box.innerText.length == 20){
        return;
    }

    // if pressed dot and box already has a - sign, show -0.
    if (button == dot && box.innerText == "-"){
        box.innerText = "-0"+dot;
    }
    // else append number
    else {
        box.innerText += button;
    }  
}
}

    // if button 
    // if it's an operator or = sign
else {

    // return if operator is already pressed
    if (operator_value != null && button == operator_value){
        return
    }
    
    // show minus sign if it's the first value selected and finally return
    if (button == "-" && box.innerText == 0){
        box.innerText = button;
        firstNum = false;
        operator_value = button
        showSelectedOperator()
        return;
    }
    // return if minus operator pressed and it's already printed on screen 
    else if (operators.includes(button) && box.innerText == "-"){
        return
    }
    // return if minus operator pressed and history already has equal sign
    else if (button == "-" && operator_value == "-" && operation_history.innerText.includes("=")){
        return
    }
    // set value of operator if it's one
if (operators.includes(button)){
    if (typeof last_operator != "undefined" && last_operator != null){
        calc_operator = last_operator
    }
    else {
        calc_operator = button
    }
    if (button == "*"){
        last_operator = "×"
    }
    else if (button == "/"){
        last_operator = "÷"
    }
    else {
        last_operator = button
    }
    operator_value = button
    firstNum = true
    showSelectedOperator()
}

// add first number to numbers array and show it on history
if (numbers.length == 0){
    numbers.push(box.innerText)
    if (typeof last_operator != "undefined" && last_operator != null){
        operation_history.innerText = box.innerText + " " + last_operator
    }

// rest of calculations
else {   
    if (numbers.length == 1){
        numbers[1] = box.innerText
    }
    var temp_num = box.innerText

    // calculate total
    if (button==equal && calc_operator != null){
        var total = calculate(numbers[0], numbers[1], calc_operator)
        box.innerText = total;

        // append second number to history
        if (!operation_history.innerText.includes("=")){
            operation_history.innerText += " " + numbers[1] + " ="
        }
        temp_num = numbers[0]

        numbers[0] = total
        operator_value = null
        showSelectedOperator()

        // replace first number of history with the value of total
        var history_arr = operation_history.innerText.split(" ")
        history_arr[0] = temp_num
        operation_history.innerText = history_arr.join(" ")
    }
    // update history with the value on screen and the pressed operator
    else if (calc_operator != null) {
         operation_history.innerText = temp_num + " " + last_operator
         calc_operator = button
         numbers = []
         numbers.push(box.innerText)
    }
}
// highlight operator button when selected
function showSelectedOperator(){

var elements = document.getElementsByClassName("operator");

for (var i=0; i<elements.length; i++){
elements[i].style.backgroundColor  = "#e68a00";
}

if (operator_value == "+"){
document.getElementById("plusOp").style.backgroundColor  = "#ffd11a";
}
else if (operator_value == "-"){
document.getElementById("subOp").style.backgroundColor  = "#ffd11a";
}
else if (operator_value == "*"){
document.getElementById("multiOp").style.backgroundColor  = "#ffd11a";
}
else if (operator_value == "/"){
document.getElementById("divOp").style.backgroundColor  = "#ffd11a";
}
}
// function to calculate the result using two number and an operator
function calculate(num1, num2, operator){

    if (operator === "+"){
    total = (parseFloat)(num1)+(parseFloat)(num2)
    }
    else if (operator === "-"){
    total = (parseFloat)(num1)-(parseFloat)(num2)
    }
    else if (operator === "*"){
    total = (parseFloat)(num1)*(parseFloat)(num2)
    }
    else if (operator === "/"){
    total = (parseFloat)(num1)/(parseFloat)(num2)
    }
    else {
    if (total == box.innerText){
        return total
    }
    else {
        return box.innerText
    }
    }
    // if total is not integer, show maximum 12 decimal places
    if (!Number.isInteger(total)){
    total = total.toPrecision(12);
    }
    return parseFloat(total);
    }
    
    // function to clear box and reset everything
    function button_clear(){
    window.location.reload()
    }
    
    function backspace_remove(){
    
    box = document.getElementById("box");
    var elements = document.getElementsByClassName("operator");
    
    for (var i=0; i<elements.length; i++){
    elements[i].style.backgroundColor  = "#e68a00";
    }
    
    var last_num = box.innerText;
    last_num = last_num.slice(0, -1)
    
    box.innerText = last_num
    
    // show 0 zero if all characters on screen are removed
    if (box.innerText.length == 0){
    box.innerText = 0
    firstNum = true
    }
    
    }
    
