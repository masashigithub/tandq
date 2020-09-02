var timerId = NaN;
var count = 0, tcount = 20;
var fin = "finish!!!";
var finNext = "yes";

//問題 
// var q = [
//     { Q: "Q1.aaaaaaaaaaaaaaaaaaaaa", A: "aaa" },
//     { Q: "Q2.bbbbbbbbbbbbbbbbbbbbb", A: "bbb" },
//     { Q: "Q3.ccccccccccccccccccccc", A: "ccc" },
//     { Q: "Q4.ddddddddddddddddddddd", A: "ddd" },
//     { Q: "Q5.eeeeeeeeeeeeeeeeeeeee", A: "eee" },
//     { Q: "Q6.fffffffffffffffffffff", A: "fff" }
// ]
var q = [
    { Q: "Q1.aaaaaaaaaaaaaaaaaaaaa", A: "aaa" },
    { Q: "Q6.fffffffffffffffffffff", A: "fff" }
]

//初期設定 スコアボード内の数を問題数にあわせる
function init() {
    var sb = document.getElementById("scoreBoard");
    var tr = document.createElement("tr");
    for (var i = 1; i <= q.length; i++) {
        var td = document.createElement("td");
        td.id = "cell" + (i);
        td.textContent = "・";
        td.style.width = `${400 / q.length}px`;
        tr.appendChild(td);
    }
    sb.appendChild(tr);
}

//タイマーをスタートさせる
function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
}

//タイマーをストップさせる
function stopTimer() {
    tcount = 20;
    clearInterval(timerId);
}

//タイマー内の処理 時間が20秒を過ぎるとスコアボードに×が表示される
function tick() {
    if (--tcount < 0) {
        stopTimer();
        count++;
        var cells = "cell" + count;
        document.getElementById(cells).textContent = "×";
        questNext();
    } else {
        document.getElementById("cTimer").textContent = tcount;
    }
}

//ボタンを押したときの処理 正解するとスコアボードに★が表示される
function btnClick() {
    var ans = document.getElementById("answer").value;
    if (ans == q[count].A) {
        stopTimer();
        count++;
        var cells = "cell" + count;
        document.getElementById(cells).textContent = "★";
        questNext();
    } else if (ans == finNext) {
        location.reload();
    }
}

//次の問題を表示する
function questNext() {
    if (count == q.length) {
        document.getElementById("cTimer").textContent = "--";
        count = 0;
        stopTimer();
        questfinish();
    } else {
        document.getElementById("question").textContent = q[count].Q;
        document.getElementById("answer").placeholder = "";
        document.getElementById("answer").value = "";
        document.getElementById("cTimer").textContent = 20;
        startTimer();
    }
}
//全問終了 finish!!!を表示する
function questfinish() {
    document.getElementById("question").textContent = fin;
    document.getElementById("answer").placeholder = "RETRY yes enter";
    document.getElementById("answer").value = "";
    document.getElementById("cTimer").textContent = "--";
}
