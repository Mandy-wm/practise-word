
let canvasWidth = canvasHeight = 600,
    startLoc = null,
    strokeStyle = "black";
    lineWidth = 16;

let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");


//获取鼠标 点击时在canvas 也就是c上的x,y坐标轴
function windowToCanvas(x, y) {
    var tCanvas = c.getBoundingClientRect();
    return {
        x: Math.round(x - tCanvas.left),
        y: Math.round(y - tCanvas.top)
    }
}

//鼠标按下时开始绘制  此时操作的元素是c,而非ctx0
c.onmousedown = function(e) {
    //阻止默认动作   阻止冒泡是stopPropagation
    e.preventDefault();

    //获取鼠标按下时的位置
    startLoc =  windowToCanvas(e.clientX, e.clientY);

    //鼠标移动开始画
    c.onmousemove = function(e) {
        e.preventDefault();
        //获取当前鼠标坐标
        let newLoc = windowToCanvas(e.clientX, e.clientY);
        //开画

        ctx.beginPath();
        ctx.moveTo(startLoc.x, startLoc.y);
        ctx.lineTo(newLoc.x, newLoc.y);
        ctx.closePath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
        startLoc = newLoc;  //鼠标每次移动结尾，就重新赋值为起始点
    }

    //鼠标up 再次down 继续画
    c.onmouseover = function(e) {
        e.preventDefault();
    }

}
//鼠标抬起停止绘画
c.onmouseup = function(e) {
    e.preventDefault()
    c.onmousemove = null;
    c.onmouseover = null;
}

//鼠标移出停止绘画
c.onmouseout = function(e) {
    e.preventDefault()
}


c.width = canvasWidth;
c.height = canvasHeight;


drawGrid();
function drawGrid() {
    ctx.strokeStyle = "#795e26";

    //画四边框
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasWidth, 0);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.closePath();
    ctx.lineWidth = "4";

    ctx.stroke();

    //画中间
    ctx.setLineDash([10]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.moveTo(canvasWidth, 0);
    ctx.lineTo(0, canvasHeight);
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth , canvasHeight / 2);
    ctx.lineWidth ="1";
    ctx.stroke();

}

$('.font-size li').click(function(){
    $(this).addClass("size-active").siblings().removeClass("size-active");
    lineWidth = $(this).attr("key");
})

$('.font-color li').click(function() {
    $(this).addClass("color-active").siblings().removeClass("color-size");
    strokeStyle = $(this).attr("key");
})
$('.btn-clear').click(function(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
})