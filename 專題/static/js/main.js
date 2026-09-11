let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 60; //每一格大小

//initial
$(function(){
    // 0:available, 1:desk, 2:Final Stop, 3:colleague, 4:apple, 5:boss, 6:clock, 7:report, 8:food
    mapArray = [
        [0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0],
        [9, 0, 7, 1, 4, 0, 0, 1, 0, 1, 1, 0],
        [4, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 6],
        [1, 1, 0, 1, 0, 0, 5, 1, 0, 0, 1, 1],
        [1, 3, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 4, 0, 1, 0, 1, 0],
        [0, 1, 1, 0, 8, 1, 0, 0, 1, 4, 1, 2]  
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    //---
    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
    }
    var sources = {
        woman: '/static/images/woman.png',
        material: '/static/images/material.png',
        colleage: '/static/images/colleague.png',
        clock: '/static/images/clock.png',
        desk: '/static/images/desk.png',
        door: '/static/images/door.png',
        report: '/static/images/report.png',
        food:'/static/images/food.png',
        counter:'/static/images/counter.png'
    };
    //---

    imgMain = new Image();
    imgMain.src = "/static/images/woman.png";
    currentImgMain = {
        x:0,
        y:0
    };

    imgMain.onload = function(){
        ctx.drawImage(imgMain,0,0,74,225,currentImgMain.x, currentImgMain.y, gridLength,gridLength);
    };
    
    loadImages(sources, function(images) {
        
        for(let x in mapArray){
            for(let y in mapArray[x]){
                if(mapArray[x][y] == 1){ 
                    ctx.drawImage(images.desk, 0, 0, 240, 260, y*gridLength, x*gridLength, gridLength, gridLength);
                }else if(mapArray[x][y] == 2){
                    ctx.drawImage(images.door, 0, 0, 85, 125, y*gridLength, x*gridLength, gridLength, gridLength);
                }else if(mapArray[x][y] == 3){
                    ctx.drawImage(images.colleage, 0, 0, 150, 325, y*gridLength, x*gridLength, gridLength, gridLength);
                }else if(mapArray[x][y] == 4){
                    ctx.drawImage(images.material, 225, 65, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
                }else if(mapArray[x][y] == 5){
                    ctx.drawImage(images.colleage, 150, 0, 135, 325, y*gridLength, x*gridLength, gridLength, gridLength);
                }else if(mapArray[x][y] == 6){
                    ctx.drawImage(images.clock, 0, 0, 795, 795, y*gridLength, x*gridLength, gridLength, gridLength);
                }else if(mapArray[x][y] == 7){
                    ctx.drawImage(images.report, 0, 0, 210, 230, y*gridLength, x*gridLength, gridLength, gridLength);
                }else if(mapArray[x][y] == 8){
                    ctx.drawImage(images.food, 0, 0, 290, 410, y*gridLength, x*gridLength, gridLength, gridLength);
                }
                else if(mapArray[x][y] == 9){
                    ctx.drawImage(images.counter, 0, 0, 1200, 1202, y*gridLength, x*gridLength, gridLength, gridLength);
                }
            }
        }
   });
});

//Click Event
$(document).on("keydown", function(event){
    console.log(event.code);
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        x:-1,
        y:-1
    };
    targetBlock = {
        x:-1,
        y:-1
    };
    event.preventDefault();
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 148;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            //cutImagePositionX = 355;
            cutImagePositionX = 296;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            //cutImagePositionX = 540;
            cutImagePositionX = 74;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if(targetImg.x <= 720 && targetImg.x >=0 && targetImg.y <= 360 && targetImg.y >=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("坐下工作");
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                break;
            case 2: 
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                $("#talkBox").text("恭喜...");
                $.post('/call_llmm').done(function(data) {
                    console.log(data);
                    $("#talkBox").text(data);
                });
                break;
            case 3: //Enemy
                $("#talkBox").text("跟妳說個秘密...");
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                $.post('/call_llm').done(function(data) {
                    console.log(data);
                    $("#talkBox").text(data);
                });
                break;
            case 4://tomato
                $("#talkBox").text("一天一蘋果，加班靠近我");
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                // 擦掉「目前目標位置」上的蘋果
                ctx.clearRect(targetImg.x, targetImg.y, gridLength, gridLength);
                // 將地圖陣列上的蘋果改成 0 (空地)，這樣蘋果就不會無限復活了
                mapArray[targetBlock.x][targetBlock.y] = 0;
                break;
            case 5: //Enemy
                $("#talkBox").text("工作做完了沒...");
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                $.post('/call_llmmm').done(function(data) {
                    console.log(data);
                    $("#talkBox").text(data);
                });
                break;
            case 6: //Enemy
                $("#talkBox").text("輸入你想要的放假時間");
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'block';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                //var dateInputs = document.getElementById("dateInputs");
                var startDateInput = document.getElementById("date1");
                var endDateInput = document.getElementById("date2");
                //var startDateText = document.getElementById("startDateText");
                //var endDateText = document.getElementById("endDateText");
                var dateDifferenceText = document.getElementById("result");

                // 监听日期选择器的 change 事件
                startDateInput.addEventListener("change", calculateDateDifference);
                endDateInput.addEventListener("change", calculateDateDifference);
                function calculateDateDifference() {
                    var date1Input = startDateInput.value;
                    var date2Input = endDateInput.value;

                    if (!date1Input || !date2Input) {
                        return;
                    }

                    var date1 = new Date(date1Input);
                    var date2 = new Date(date2Input);

                    if (date2 < date1) {
                        dateDifferenceText.innerHTML = "End date must be after start date.";
                        return;
                    }

                    var difference = date2 - date1;
                    var daysDifference = difference / (1000 * 60 * 60 * 24);
                    var day = Math.ceil(daysDifference);
        
                    dateDifferenceText.innerHTML = "哈哈其實是加班時間，所以你要加班 " + day + " 天";
                }
                break;
            case 7:
                $("#talkBox").text("到底有沒有在存錢啊");
                document.getElementById('line-chart').style.display = 'block';
                document.getElementById('line-chartt').style.display = 'block';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                let in_line = document.getElementById('line-chart');
                let in_data = JSON.parse(document.getElementById('exchangeData').innerHTML);
                let out_line = document.getElementById('line-chartt');
                let out_data = JSON.parse(document.getElementById('exchangeDataa').innerHTML);
                console.log(in_data);
                console.log(out_data);

                let trace1 = {};
                trace1.type = "scatter";
                trace1.mode = "lines";
                trace1.name = "Team A";
                trace1.text = [];
                trace1.x = [];
                trace1.y = [];

                let trace2 = {};
                trace2.type = "scatter";
                trace2.mode = "lines";
                trace2.name = "Team B";
                trace2.text = [];
                trace2.x = [];
                trace2.y = [];

                for (let i = 0; i < in_data.length; i++) {
                    trace1.x[i] = in_data[i].date;
                    trace1.y[i] = in_data[i]['in'];   
                }
                for(let i = 0; i < out_data.length; i++){
                    trace2.x[i] = out_data[i].date;
                    trace2.y[i] = out_data[i]['out'];
                }

                console.log("trace1.x: ", trace1.x);
                console.log("trace1.y: ", trace1.y);
                console.log("trace2.x: ", trace2.x);
                console.log("trace2.y: ", trace2.y);

                let data = [];
                data.push(trace1);

                let layout = {
                    margin: { t: 20, b: 40, l: 45, r: 20 }, 
                    xaxis: { showline: true },
                    yaxis: { showline: true },
                    annotations:[
                        {
                            xref:'paper',
                            yref:'paper',
                            x:0.5,
                            y:0.1,
                            text: `收入 ${trace1.x[0]} ~ ${trace1.x.slice(-1)}`,
                            showarrow:false,
                            xanchor:'center',
                            yanchor:'top',
                            font:{
                                size:15,
                                color:'gray'
                            }
                        }
                    ]
                };
                Plotly.newPlot(in_line, data, layout);

                let dataa = [];
                dataa.push(trace2);

                let layoutt = {
                    margin: { t: 20, b: 40, l: 45, r: 20 },
                    xaxis: { showline: true },
                    yaxis: { showline: true },
                    annotations:[
                        {
                            xref:'paper',
                            yref:'paper',
                            x:0.5,
                            y:0.1,
                            text: `支出 ${trace2.x[0]} ~ ${trace2.x.slice(-1)}`,
                            showarrow:false,
                            xanchor:'center',
                            yanchor:'top',
                            font:{
                                size:15,
                                color:'gray'
                            }
                        }
                    ]
                };
                Plotly.newPlot(out_line, dataa, layoutt);
                break;
            case 8:
                var lunchOptions = ["拉麵", "披薩", "三明治", "壽司", "鍋貼"];
                $("#talkBox").text("午餐要吃什麼?");
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('test').style.display = 'none';
                document.getElementById('random').style.display = 'block';
                $("input").on("click",function(){
                    var numberOfListItem=$("li").length;
                    var randomChildNumber=Math.floor(Math.random()*numberOfListItem);
                    $("h1").text($("li").eq(randomChildNumber).text());
                });
                function chooseLunch() {
                    var randomIndex = Math.floor(Math.random() * lunchOptions.length);
                    return lunchOptions[randomIndex];
                }
                displayLunch();
                break;
            case 9:
                document.getElementById('line-chart').style.display = 'none';
                document.getElementById('line-chartt').style.display = 'none';
                document.getElementById('dateInputs').style.display = 'none';
                document.getElementById('random').style.display = 'none';
                document.getElementById('test').style.display = 'block';
                $("#talkBox").text("測驗");
                let questions = [
                    {
                        "question":"你現在對今年非常樂觀？",
                        "answers":[
                            ["是的",2],
                            ["不是",3],
                            ["不知道",4]
                        ]
                    },
                    {
                        "question":"你覺得自己是不是越來越不可靠了？",
                        "answers":[
                            ["是的",3],
                            ["不是",4],
                            ["一般",5]
                        ]
                    },
                    {
                        "question":"想到要進入新的職場，就覺得很焦慮？",
                        "answers":[
                            ["是的",4],
                            ["不是",5],
                            ["還好",6]
                        ]
                    },
                    {
                        "question":"會想要積極跟同事打好關係？",
                        "answers":[
                            ["會",5],
                            ["順其自然",6],
                            ["不想要",7]
                        ]
                    },
                    {
                        "question":"面對困境你會選擇？",
                        "answers":[
                            ["求助上司",6],
                            ["先自己嘗試解決",7],
                            ["問身邊的同事",8]
                        ]
                    },
                    {
                        "question":"你喜歡用甚麼詞形容自己？",
                        "answers":[
                            ["堅強",7],
                            ["公平無私",8],
                            ["勤奮","A"]
                        ]
                    },
                    {
                        "question":"你覺得職場是豺狼虎穴嗎？",
                        "answers":[
                            ["是的",8],
                            ["不是",9],
                            ["不知道",10]
                        ]
                    },
                    {
                        "question":"你進入職場第一件想做的事？",
                        "answers":[
                            ["交到朋友",9],
                            ["完成任務","D"],
                            ["安穩度日",10]
                        ]
                    },
                    {
                        "question":"工作的目的是希望實現哪件事情？",
                        "answers":[
                            ["買房子","C"],
                            ["工作升遷","A"],
                            ["變帥變美","B"]
                        ]
                    },
                    {
                        "question":"下面哪一種上司是你最想遇到的？",
                        "answers":[
                            ["溫柔親切的","B"],
                            ["嚴厲嚴格的","C"],
                            ["放生讓你自己來的","D"]
                        ]
                    }
                    
                ];
                
                let finalAnswers={
                    "A": [
                        "市場營銷專員","在這一年裡，你可能會遇到一些挑戰和挫折，但這正是你成長和學習的機會。儘管有時會感到失落，但你對工作的熱情和堅持會帶來意想不到的成果。酸中帶甜，正是你在市場營銷中取得成功的關鍵。"
                        ],
                
                    "B": ["人力資源經理","你與同事和諧相處，團隊氣氛融洽，你的溫暖和善良讓大家感受到家庭般的溫馨。你懂得如何關心和激勵團隊成員，並且能夠有效地解決問題，提升整體的工作效率和滿意度。這種甜蜜的職場氛圍，使你在管理崗位上如魚得水。"
                        ],
                
                    "C": ["項目經理","作為項目經理，你會面臨不少挑戰和壓力，但也能從中獲得成就感和滿足感。你能夠平衡困難和機會，在苦中尋找甜美的瞬間。面對爭議和困境，你能理智地處理，帶領團隊走向成功。這種苦中有甜的體驗，使你的管理和協調能力得到提升。"
                        ],
                
                    "D": ["會計","作為會計，你的工作重心在於數據和報表，雖然乏味但至關重要。你的細心和專注確保了財務工作的準確性和可靠性。雖然工作中缺少驚喜和刺激，但你穩定的表現和專業的態度讓你成為團隊中不可或缺的一員。平淡中見真情，細水長流的職場生活正是你的寫照。"
                        ]
                };
                
                
                $(function(){
                    //儲存目前作答到第幾題
                    var currentQuiz=null;
                    //當按鈕按下後，要做的事情
                    $("#startButton").on("click",function(){
                       //如果還沒開始作答就從這裡開始
                       if(currentQuiz==null){
                        //設定目前作答從第0題開始
                        currentQuiz=0;
                        //顯示題目
                        $("#question").text(questions[0].question);
                        //將選項區清空(可以試著先不寫)
                        $("#options").empty();
                        //將選項逐個加入
                        questions[0].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' type='radio'
                             value='${index}'><label>${element[0]}</label><br><br>`);
                        });
                        //將按鈕上的文字換成Next
                        $("#startButton").attr("value","Next");
                       }else{
                        //已經開始作答從這邊繼續
                        //巡訪哪一個選項有被選取
                        $.each($(":radio"),function(i,val){
                            if(val.checked){
                                //是否已走到最後要產生結果(A~D)
                                if(isNaN(questions[currentQuiz].answers[i][1])){
                                    //通往最終結果
                                    var finalResult=questions[currentQuiz].answers[i][1];
                                    //顯示最終結果的標題
                                    $("#question").text(finalAnswers[finalResult][0]);
                                    //將選項區域清空
                                    $("#options").empty();
                                    //顯示最終結果內容
                                    $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                                    currentQuiz=null;
                                    $("#startButton").attr("value","重新開始");
                                }else{
                                    //指定下一題，原始資料從1開始，所以要-1
                                    currentQuiz=questions[currentQuiz].answers[i][1]-1;
                                    //顯示新的題目
                                    $("#question").text(questions[currentQuiz].question);
                                    $("#options").empty();
                                    questions[currentQuiz].answers.forEach(function(element,index,array){
                                        $("#options").append(`<input name='options' type='radio' value='${index
                                        }'><label>${element[0]}</label><br><br>`);
                                    });
                                }
                                return false;//跳離迴圈的方式
                            }
                        });
                       }
                    });
                });
                break;
        }
    }else{
        $("#talkBox").text("上班時間要去哪裡");
        document.getElementById('line-chart').style.display = 'none';
        document.getElementById('line-chartt').style.display = 'none';
        document.getElementById('dateInputs').style.display = 'none';
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 74, 225, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});