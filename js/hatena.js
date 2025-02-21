//コインをランダムに配置する
const randomCoinPos = () => {
  //コインを全て取得
  const coins = document.querySelectorAll(".js-random-coin");
  //上下のランダムの最小値
  const topMinVal = 0;
  //上下のランダムの最大値
  let topMaxVal = 300;
  //左右のランダムの最小値
  let randomLeftValMin = 6;
  //左右のランダムの最大値
  let randomLeftValMax = 15;
  //上下(top)の値
  let randomTopPos = 0;
  //左右(left)の値
  let randomLeftPos = 0;

  if (window.matchMedia("(max-width:767px").matches) {
    topMaxVal = 185;
    randomLeftValMin = 8;
    randomLeftValMax = 10;
  }
  for (let i = 0; i < coins.length; i++) {
    if (i === 0) {
      randomLeftValMin = 0;
    }
    //左右の値を6~15の中からランダムで決める
    randomLeftPos =
      Math.random() * (randomLeftValMax - randomLeftValMin) + randomLeftValMin;
    //決めた値にi*15を足して左にずらし、コインを被らないように散りばめる
    randomLeftPos += i * 15;
    //上下の値を0~300の中からランダムで決める
    randomTopPos = Math.random() * (topMaxVal - topMinVal) + topMinVal;
    //左右は%、上下はpxでそれぞれに決定した値を反映
    coins[i].style.left = `${randomLeftPos}%`;
    coins[i].style.top = `${randomTopPos}px`;
  }
};

randomCoinPos();
