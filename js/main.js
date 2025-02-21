//カルーセル
//ボタンクリックに応じて、cssで作成したtransform:translateX(n);のクラスを変化させ、x軸の位置を変化させることで、スライドを変化させる
// ↓const createBubble = function () {}の省略形
const carousel = () => {
  //必要なものを読み込み
  const slide = document.getElementById("js-carousel"); //スライドのの親クラス
  const prev = document.getElementById("js-prev"); //前のスライドに戻るボタン
  const next = document.getElementById("js-next"); //次のスライドボタン
  const indicator = document.getElementById("js-indicator"); //インジケーター
  const lists = document.querySelectorAll(".carousel-indicator-list"); //インジケーターのリストを全て配列として取得
  const totalSlides = lists.length; //listsの配列の要素数を取得(インジケーターのリストの数を取得)
  const reproduction = document.getElementById("js-reproduction");
  const reproductionStart = document.getElementById("js-reproduction-start");
  const reproductionStop = document.getElementById("js-reproduction-stop");
  let count = 0; //カウント用の変数(変動するので、letを使用)
  let autoPlayInterval; //自動再生用の変数
  let isReproduction = true; //自動再生判定用の変数

  //次のスライドに進むボタンの関数を用意する
  function nextClick() {
    //前のcarousel-slide値のクラスを削除
    slide.classList.remove(`carousel-slide${(count % totalSlides) + 1}`);
    //カウントを1進めるためにカウントに1を足す
    count++;
    //前のcarousel-slide値のクラスを追加
    slide.classList.add(`carousel-slide${(count % totalSlides) + 1}`);
    /*「`」:jsの文字列テンプレートの構文
    その中の${~~}は式を表す
    これにより、文字列内に動的な値や変数を埋め込むことができる
    つまり、今回の場合はslideの後ろにcount%totalSlides+1の結果がつく

    countの数がどんなに増減しても、帰ってくる値はcarousel-slide1,carousel-slide2,carousel-slide3,carousel-slide4(スライドの数によって変動)のいずれかが返ってくる仕組み
    (count % totalSlides) + 1 → count/titalSlides(今回は4)の余りに+1する
    count%totalSlidesにすることで、余りが0,1,2,3と続く
    cssで用意したクラスは、carousel-slide1...carousel-slide4と、1から始まっているため、cssに合わせて+1している
    インジケーターの更新*/
    updateListBackground();
  }

  //前のスライドに戻るボタンの関数を用意する
  function prevClick() {
    //前のcarousel-slide値のクラスを削除
    slide.classList.remove(`carousel-slide${(count % totalSlides) + 1}`);
    //カウントを1戻すためにカウントから1を引く
    count--;
    /*もしcountが0以下のマイナスになったとき、countは最後のスライドを表示させる値にする
    今回はスライドが4枚なので、countは4-1で3になる
    その下のクラス付与の際に+1をするので、帳尻を合わせて-1する*/
    if (count < 0) {
      count = totalSlides - 1;
    }
    //前のcarousel-slide値のクラスを追加
    slide.classList.add(`carousel-slide${(count % totalSlides) + 1}`);
    //インジケーターの更新
    updateListBackground();
  }

  //インジケーターの処理
  function updateListBackground() {
    //インジケーターの数だけfor文を回し、一つ一つ判定する
    //count % totalSlidesの数=今の表示しているスライドの番号と一致すれば、背景色を白にする
    for (let i = 0; i < lists.length; i++) {
      if (i === count % totalSlides) {
        lists[i].style.backgroundColor = "#fff";
        //そうでなければ背景色は透明にする
      } else {
        lists[i].style.backgroundColor = "#00000000";
      }
    }
  }

  //自動再生
  //再生
  function startAutoPlay() {
    /*setInterval:指定した時間ごとに設定した関数を繰り返し実行する関数
    3000ミリ秒 = 3秒ごとにnexClickを実行*/
    autoPlayInterval = setInterval(nextClick, 3000);
  }
  //クリックのタイミングによって2枚同時にスライドしてしまう挙動(クリックしたときと自動再生のスライド変化がそれぞれ起きるため)を防ぐ目的で使用
  function resetAutoPlayInterval() {
    if (isReproduction) {
      //clearInterval:設定されたインターバルをクリア=解除
      clearInterval(autoPlayInterval);
      startAutoPlay();
    } else {
      //何もしない
    }
  }
  //自動再生を停止する関数
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  //const next = document.getElementById('js-next'); //次のスライドボタン をクリックされて際にnextClickの関数を呼び出す
  next.addEventListener("click", () => {
    nextClick();
    //自動再生のリセット
    resetAutoPlayInterval();
  });

  //const next = document.getElementById("js-next"); //次のスライドボタン をクリックされて際にprevClickの関数を呼び出す
  prev.addEventListener("click", () => {
    prevClick();
    //自動再生のリセット
    resetAutoPlayInterval();
  });
  /*インジケーターをクリックしたときに対応するスライドを表示する
  ↓インジケーター内の要素がクリックされたときに指定された無名関数が実行される
  無名関数:名前を持たない関数。定義と同時に命令を実行したいときに使用される。また、一度だけ実行されることが多いという特徴がある*/
  indicator.addEventListener("click", (event) => {
    /*contains:指定された文字列がリスト内にあるかどうかを調べる
    ↓クリックされた要素が.carousel-indicator-listのクラスを持つ要素である場合、if文の中を実行*/
    if (event.target.classList.contains("carousel-indicator-list")) {
      /*event.target:クリックされた要素(タグ)
      Array.from():反復可能オブジェクトや配列風オブジェクトから
      シャローコピー(コピーがコピー元のオブジェクトとプロパティにおいて同じ参照を共有する（同じ基礎値を指す）コピーのことを指す)された、
      新しい配列を生成する
      indentOf:引数に与えられた内容と同じ内容を持つ最初の配列要素の添え字を返す。存在しない場合は-1を返す
      listsをコピーした配列の中でクリックされたもののインデックスを返す
      ↓index=クリックされたlistの数値が入る*/
      const index = Array.from(lists).indexOf(event.target);
      //スライドを更新
      slide.classList.remove(`carousel-slide${(count % totalSlides) + 1}`);
      //countにindexで取得した値を入れてクリックされたインジケーターに対応するスライドを表示させる
      count = index;
      slide.classList.add(`carousel-slide${(count % totalSlides) + 1}`);
      //インジケーターの背景色を更新する
      updateListBackground();
      //自動再生のリセット
      resetAutoPlayInterval();
    }
  });

  //再生ボタン
  reproduction.addEventListener("click", (event) => {
    event.target.classList.remove("carousel-reproduction-active");
    if (event.target.classList.contains("carousel-reproduction-stop")) {
      //自動再生を止めて再生ボタンの表示を更新する
      stopAutoPlay();
      reproductionStart.classList.add("carousel-reproduction-active");
      isReproduction = false;
    } else {
      reproductionStop.classList.add("carousel-reproduction-active");
      isReproduction = true;
      //自動再生のリセットして3秒後にスライドが変化するようにする
      resetAutoPlayInterval();
    }
  });
  //自動再生を実行
  startAutoPlay();
};

//カウントアップアニメーション
const countUpAnimation = () => {
  const highScoreElement = document.getElementById("js-high-score-text"); //ハイライトスコアのidの取得
  const highScore = highScoreElement.dataset.score; //ハイライトのスコアのdata属性を読み込み(data-score="6328")
  const upNumber = 13; //カウントアップする数字(動きがそれっぽくなるかつ、カウントアップにかかる時間が適切なため13を選択)
  let nowNumber = 0; //カウントするための変数

  const updataScore = setInterval(() => {
    //1ミリ秒ごとにカウントアップする
    if (nowNumber <= highScore - upNumber) {
      //今のカウント(htmlに表示されている数字)がハイスコア-カウントアップする数字(13)より小さい時は13づつカウントアップ
      nowNumber += upNumber;
      //textContent:ノードおよびその子孫のテキストの内容を表す
      //.js-high-score-textの要素のテキストの内容=nowNumber
      highScoreElement.textContent = nowNumber;
    } else if (nowNumber <= highScore) {
      //差が13以下の時に1づつカウントし、ハイスコアでカウントが止まるようにする
      highScoreElement.textContent = nowNumber;
      nowNumber++;
    } else {
      clearInterval(updataScore);
      //カウントアップが完了したら、setIntervalを解除する
    }
  }, 1);
};

//上にフェードインする
const fadeinUp = () => {
  const fadeinElement = document.getElementById("js-fadein-up");
  fadeinElement.classList.add("fadein-up-active");
};

const accordion = () => {
  const accordionTitle = document.querySelectorAll(".js-accordion-title");
  let accordionPearent; //親要素
  let accordionContent; //押されたjs-accordionのコンテンツ(中身)
  let nowHeight; //今のアコーディオンの高さ
  /*querySelectorAll:静的な (生きていない) NodeList を返す
  ↑が関数(function)として認識されないため、普通にaddEventListenerにするとエラーをはかれる
  そのため、forEachで1つづつ中身をelementに入れて、elementに対してaddEventListenerを設定する
  forEach:配列の各要素に対して一度ずつ実行する
  
  pythonの
  for i in accordionTitle: みたいな挙動のイメージ*/
  accordionTitle.forEach((element, num) => {
    //兄弟要素(アコーディオンのコンテンツ)を取得
    accordionContent = element.nextElementSibling;
    //開いた時の高さを取得するために、heightをautoにする
    accordionContent.style.height = "auto";
    let accordionContentHeight = accordionContent.clientHeight; //コンテンツの高さを取得

    if (num != 0) {
      //最初の要素以外は高さを取得した後に閉じる
      accordionContent.style.height = "0";
    }
    element.addEventListener("click", (event) => {
      //親要素にactiveを付ける
      accordionPearent = element.parentNode;
      //兄弟要素をクリックされた要素の兄弟要素に更新
      accordionContent = element.nextElementSibling;
      //開いているかどうかを判定するクラスを付け外しする
      //toggle:クラスがすでについていたら外し、ついていなければクラスを付与
      accordionPearent.classList.toggle("accordion-active");
      if (accordionPearent.classList.contains("accordion-active")) {
        accordionContent.style.height = "auto";
        accordionContentHeight = accordionContent.clientHeight;
        accordionContent.style.height = "0";

        //開く
        nowHeight = 0;
        const openAccordion = setInterval(() => {
          //3づつheightを高くする(3なのは、アコーディオンが開ききるまでのアニメーションの長さがちょうどいいとおもったため)
          nowHeight += 3;
          accordionContent.style.height = `${nowHeight}px`;
          //もし、nowHeightがaccordionContentHeightの高さを超えそうになったら、高さを高くするのをやめて、高さをautoにする
          //3づつ足しているため、if分の判定を-3にしてaccordionContentHeightの高さを超えないようにする
          if (nowHeight >= accordionContentHeight - 3) {
            clearInterval(openAccordion);
            accordionContent.style.height = "auto";
          }
        }, 1);
      } else {
        //閉じる
        nowHeight = accordionContentHeight;
        const closeAccordion = setInterval(() => {
          //3づつ高さを低くする
          nowHeight -= 3;
          accordionContent.style.height = `${nowHeight}px`;
          //3以下になったら、低くするのをやめて、高さを0にする
          if (nowHeight <= 3) {
            clearInterval(closeAccordion);
            accordionContent.style.height = "0";
          }
        }, 1);
      }
    });
  });
};

const sidenavi = (scrollNum) => {
  const sidenaviText = document.querySelectorAll(".js-sidenavi-text"); //サイドナビの文字
  const sidenaviTextList = Array.from(sidenaviText); //サイドナビの文字を配列化したもの
  const accordion = document.querySelectorAll(".js-accordion"); //アコーディオン
  let startHeight = 2760; //アコーディオンのサイドナビのスタート地点
  if (window.matchMedia("(max-width:1200px").matches) {
    startHeight = 2648;
  }
  if (window.matchMedia("(max-width:1100px").matches) {
    startHeight = 2470;
  }

  let accordionAllHeight = [startHeight]; //アコーディオンのそれぞれのテキストのスタート地点を入れる配列

  //アコーディオンの高さを計算し配列に格納する
  for (let i = 1; i < accordion.length; i++) {
    let totalHeight = startHeight; //高さ計算をリセットするために、トータルの高さをスタート
    for (let j = 0; j < i; j++) {
      //自分の上の要素の高さを計算
      if (accordion[j].classList.contains("accordion-active")) {
        totalHeight += 195;
      } else {
        totalHeight += 110;
      }
    }
    //計算した結果を配列に入れる
    accordionAllHeight.push(totalHeight);
  }
  //サイドナビの左の魚が非アクティブ時の処理
  function sidenaviNotActiveText(ActiveText) {
    const notActiveText = sidenaviTextList.filter(
      //filter:条件に合った要素で、新たに配列を作る
      //ActiveText(activeになっているアコーディオンのテキスト)以外で新たに配列を作る
      (element) => !(element === ActiveText)
    );
    //配列のそれぞれの要素に対し、クラスを外す
    notActiveText.forEach((ele) => {
      ele.classList.remove("sidenavi-active");
    });
  }

  switch (true) {
    //それぞれの要素に高さに応じてアクティブにする
    case scrollNum <= accordionAllHeight[0]:
      sidenaviText[0].classList.add("sidenavi-active");
      sidenaviNotActiveText(sidenaviText[0]);
      break;
    case scrollNum <= accordionAllHeight[1]:
      sidenaviText[1].classList.add("sidenavi-active");
      sidenaviNotActiveText(sidenaviText[1]);
      break;
    case scrollNum <= accordionAllHeight[2]:
      sidenaviText[2].classList.add("sidenavi-active");
      sidenaviNotActiveText(sidenaviText[2]);
      break;
    case scrollNum <= accordionAllHeight[3]:
      sidenaviText[3].classList.add("sidenavi-active");
      sidenaviNotActiveText(sidenaviText[3]);
      break;
    case scrollNum <= accordionAllHeight[4]:
      sidenaviText[4].classList.add("sidenavi-active");
      sidenaviNotActiveText(sidenaviText[4]);
      break;
    case scrollNum <= accordionAllHeight[5]:
      sidenaviText[5].classList.add("sidenavi-active");
      sidenaviNotActiveText(sidenaviText[5]);
      break;
    case scrollNum <= accordionAllHeight[6]:
      sidenaviText[6].classList.add("sidenavi-active");
      sidenaviNotActiveText(sidenaviText[6]);
      break;
    default: //一番最後の要素は上のどれにも当てはまらないので、swichのどれにも当てはまらない時のdefaultを私用する
      sidenaviText[7].classList.add("sidenavi-active");
      sidenaviNotActiveText(sidenaviText[7]);
      break;
  }
};

//スクロール位置でイベント発火するための関数
const loadScroll = () => {
  let isCountUp = true; //カウントアップを一度だけ実行させるためのbool
  let countUpY = 0; //カウントアップ開始する位置
  let isFadein = true;
  let fadeinY = 0;
  addEventListener("scroll", () => {
    //スクロールしたときに垂直方向のスクロール量
    let nowScrollY = window.scrollY;
    //スマホの時の値
    if (window.matchMedia("(max-width:767px").matches) {
      countUpY = 750;
      fadeinY = 1200;
    } else if (window.matchMedia("(max-width:1024px").matches) {
      countUpY = 1200;
      fadeinY = 1550;
    } else {
      //pcの時の値
      countUpY = 1600;
      fadeinY = 2000;
    }
    if (nowScrollY >= countUpY && isCountUp) {
      //スクロール量が一定に達したらカウントアップ開始
      //カウントアップ
      countUpAnimation();
      isCountUp = false;
    }
    //フェードイン
    if (nowScrollY >= fadeinY && isFadein) {
      fadeinUp();
      isFadein = false;
    }
    if (nowScrollY >= 1500) {
      //サイドナビ
      sidenavi(nowScrollY);
    }
  });
};

//インスタンス化する
//カルーセル
carousel();
//スクロール量に応じてイベント発火
loadScroll();
//アコーディオン
accordion();

// 一定時間ごとに呼び出す
setInterval(createBubble, 60000);
