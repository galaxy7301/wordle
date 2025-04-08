const 정답 = "APPLE";

let attempts = 0; //시도
let index = 0; //입력할 때 넘어갈 때 변수지정
let timer;

function appStart() {
  const displayGameover = () => {
    //HTMl을 javascript로 작성
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:35vh; left:35vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  //게임 종료
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  //6번 넘어가지 않도록 방지
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts = attempts + 1;
    index = 0;
  };

  //Enter 처리
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    // 정답 확인 코드
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      //includes('a') a가 포함되어있냐, true
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  //Backspace 처리
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index = index - 1;
  };

  //키보드 입력
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      //알파벳만 입력 a 65 ~ z 90
      thisBlock.innerText = key;
      index = index + 1;
    }
  };

  //타이머
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".imfo-bar__name");
      timeDiv.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown); //전체 윈도우 addListener keydown
}

appStart();
