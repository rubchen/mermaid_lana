const createBubble = () => {
  //背景を読み込み
  const background = document.querySelector(".-bubble");
  //spanタグを生成
  const bubbleElR = document.createElement("span");
  const bubbleElL = document.createElement("span");
  //生成したspanタグに泡のクラスを付ける
  bubbleElR.className = "bubble-right";
  bubbleElL.className = "bubble-left";
  //ランダムなサイズを指定する
  const minSize = 10;
  const maxSize = 40;
  //Math.random:0以上1未満(1 は含まない)の範囲で浮動小数点の擬似乱数を返す
  const sizeR = Math.random() * (maxSize + 1 - minSize) + minSize;
  const sizeL = Math.random() * (maxSize + 1 - minSize) + minSize;
  bubbleElR.style.width = `${sizeR}px`;
  bubbleElL.style.width = `${sizeL}px`;
  bubbleElR.style.height = `${sizeR}px`;
  bubbleElL.style.height = `${sizeL}px`;
  //発生位置をランダムで決める
  const maxPosition = -5;
  const positionR = Math.random() * maxPosition - 10;
  const positionL = Math.random() * maxPosition - 10;
  bubbleElR.style.right = `${positionR}%`;
  bubbleElL.style.left = `${positionL}%`;
  //appendChild:指定された親ノードの子ノードリストの末尾にノードを追加
  //要するに末尾に要素を追加する
  background.appendChild(bubbleElR);
  background.appendChild(bubbleElL);

  // 一定時間が経てば泡を消す
  //setTImeout:時間切れになると関数または指定されたコードの断片を実行するタイマーを設定する
  setTimeout(() => {
    bubbleElR.remove();
    bubbleElL.remove();
    //↑タイマーが満了したと時に実行する関数
  }, 60000);
};

const modal = () => {
  const modalLink = document.querySelectorAll(".js-modal-link"); //モーダルリンク
  const modalWindow = document.querySelectorAll(".js-modal-window"); //開くウィンドウ
  //モーダルを開く
  modalLink.forEach((element) => {
    element.addEventListener("click", (event) => {
      //押されたリンクの兄弟要素（開くウィンドウの親要素）
      const activeWindow = element.nextElementSibling;
      //兄弟要素にクラスを付けてモーダルを開く
      activeWindow.classList.add("modal-active");
    });
  });
  //開いたモーダルを閉じる
  modalWindow.forEach((element) => {
    element.addEventListener("click", (event) => {
      clickTarget = event.target; //押されたターゲット
      if (
        clickTarget.classList.contains("modal-window-box") ||
        clickTarget.classList.contains("modal-window-close")
        //押された要素がモーダルウィンドウの外か閉じるボタンだった場合
      ) {
        //アクティブのクラスを外し、モーダルウィンドウを閉じる
        element.classList.remove("modal-active");
      }
    });
  });
};

createBubble();
modal();
