let gen_button = document.getElementById('set_nazonazo');
let question = document.getElementById('question');
let my_answers = document.getElementById('my_answers');
let check_answer = document.getElementById('check_answer');
let gen_check = document.getElementById('gen_check')

let word_list = [];
let answers = [];

window.onload = function() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET","./soupdata/out.txt", true);
    // xmlHttp.open("GET","./soupdata/word_list.txt", true);
    xmlHttp.send(null);
    xmlHttp.onload = function(){
        if (xmlHttp.status === 200) {
            let separate1 = '\n';
            let separate2 = ",";
            let data1 = xmlHttp.responseText;
            // console.log(data1);
            data1 = data1.replaceAll('辞書：', '');
            data2 = data1.replace(/(\r\n|\n|\r)/gm, '\n');
            // console.log(data2);
            word_list = (data2.split(separate1)).map(function(value){
                return (value.split(separate2)).map(function(value1){
                    return value1;
                });
            });
        }
        else {
            alert('データセットの読み込みに失敗しました');
            console.error('cannot read word file');
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function set_sorted_word() {
    if(answers.length > 0){
        answers.splice(0);
    }
    let str = '';
    let words = 0;
    let category_list = [];
    while(str.length < 7){
        let index = getRandomInt(word_list.length);
        console.log(index, word_list[index]);
        category_list.push(word_list[index][0]);
        answers.push(word_list[index][1]);
        str += word_list[index][1];
        words++;
    }
    let chars = str.split('');
    chars.sort();
    str = chars.join('');
    answers.sort();
    console.log(str, words, category_list, answers);
    question.innerText = str;
    let row = my_answers.insertRow();
    let num = 0;
    for(let ans in answers) {
        let cell = row.insertCell();
        cell.innerHTML = '<input type="text" id="ans' + String(num++) + '">';
    }

}

gen_button.addEventListener('click', function () {
    // clear answer table
    my_answers.innerHTML = "";
    set_sorted_word();
    // question.innerText = 'うきぎぐぐぷみょらろん';
    check_answer.hidden = false;
});

check_answer.addEventListener('click', function () {
    my_ans = [];
    for(let num=0; num < answers.length; num++){
        my_ans.push(document.getElementById('ans' + String(num)).value);
    }
    my_ans.sort();
    console.log(my_ans);
    console.log(answers);
    let flag = true;
    for(let i = 0; i < answers.length; i++){
        if(my_ans[i] !== answers[i]) {
            flag = false;
            break;
        }
    }
    if(flag){
        alert('正解');
        gen_button.click();
    }
    else {
        alert('はずれ!');
    }
});