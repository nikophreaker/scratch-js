let dpr = 2; //window.devicePixelRatio;

window.onload = function () {
  let gameConfig = {
    type: Phaser.CANVAS,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "canvas",
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio,
    },
    dom: {
      createContainer: true,
    },
    backgroundColor: 0x2a3141, //0xD30000,
    // scene: [LobbyGame, InputData, PlayGame, Leaderboard, Loading],
    scene:[InputData],
  };
  var game = new Phaser.Game(gameConfig);
  window.focus();
};

class InputData extends Phaser.Scene
















// var userToken = "<%= token %>";
var userToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luZ29vZ2xlIiwiaWF0IjoxNjc4MTcwMDI4LCJuYmYiOjE2NzgxNzAwMjgsImp0aSI6IjRQMnpJMUpwNEZiUHJUNFYiLCJzdWIiOiIxNDEiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.titAjpe-j46UdSafEbMhTAtq7hZTEv5KoVxixz8Tthk";
var ticket;

// fetch("https://api.msportsid.com/api/game/tiket", {
fetch("http://127.0.0.1:8000/api/game/tiket", {
  method: "get",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
  },
})
  .then((res) => {
    res.json().then((res2) => {
      ticket = res2.data[0].tiket;
      console.log(res2.data[0].tiket);
    });
  })
  .catch((err) => {
    console.log(err);
  });

var prize1 = {
  img: "img/prize1.png",
  text: "MPoint 10000",
};
var prize2 = {
  img: "img/prize2.png",
  text: "MReferral 5000",
};
var prize3 = {
  img: "img/prize5.png",
  text: "T-SHIRT",
};
var prize4 = {
  img: "img/prize6.png",
  text: "HOODIE",
};
var prize5 = {
  img: "img/prize3.png",
  text: "MPoint 1000",
};
var prize6 = {
  img: "img/prize4.png",
  text: "MReferral 500",
};
var prize7 = {
  img: "img/sorry.png",
};

// var prizeArray = [prize1, prize2, prize5, prize6];
// var prizeArray = [prize1, prize2, prize3, prize4, prize5, prize6, prize7];
var prizeArray = [prize1, prize2, prize3];

// for (var i = 0; i <= 46; i++) {
//     prizeArray.push(prize3);
//     prizeArray.push(prize4);
// }

// for (var i = 0; i <= 50; i++) {
//     prizeArray.push(prize7);
// }

// selectPrize = prizeArray[Math.floor(Math.random() * prizeArray.length)];

const min = parseInt(1);
const max = parseInt(3);
const rand = Math.floor(Math.random() * (max - min + 1)) + min;
const rand1 = Math.floor(Math.random() * (max - min + 1)) + min;
const rand2 = Math.floor(Math.random() * (max - min + 1)) + min;

if (rand == 1) {
  selectPrize = prizeArray[0];
} else if (rand == 2) {
  selectPrize = prizeArray[0];
} else if (rand == 3) {
  selectPrize = prizeArray[0];
}

if (rand1 == 2) {
  selectPrize1 = prizeArray[1];
} else if (rand1 == 3) {
  selectPrize1 = prizeArray[2];
} else if (rand1 == 1) {
  selectPrize1 = prizeArray[0];
}

if (rand2 == 3) {
  selectPrize2 = prizeArray[2];
} else if (rand2 == 1) {
  selectPrize2 = prizeArray[0];
} else if (rand2 == 2) {
  selectPrize2 = prizeArray[1];
}

if (rand == 1 && rand1 == 1 && rand2 == 1) {
  prize = prize1;
  console.log(prize);
}

console.log(rand);
console.log(rand1);
console.log(rand2);

// console.log(selectPrize);

// var rand = Math.random();
// if (rand < 0.3) {
//     selectPrize = prizeArray[6]
// } else if (rand < 0.6) {
//     selectPrize = prizeArray[6]
// } else if (rand <= 0.9) {
//     selectPrize = prizeArray[Math.floor(Math.random() * (5 - 4 + 1)) + 4]
// } else if (rand > 0.9) {
//     selectPrize = prizeArray[Math.floor(Math.random() * (3 - 0 + 1)) + 0]
// } else {
//     selectPrize = prizeArray[6]
// }

// console.log(`Get Random Number : ${rand}`);

this.startTheGame();

function startTheGame() {
  //   fetch("https://api.msportsid.com/api/game/fortunewheel/start", {
  fetch("http://127.0.0.1:8000/api/game/fortunewheel/start", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  }).then((res) => {
    res.json().then((res2) => {
      if (res2.messege != undefined) {
        // promt view to know your ticket insufficient
        Android.showToast(res2.messege);
        console.log(res2.messege);
      } else {
        this.setGame();
        ticket = res2.data[0].tiket - 1;
        console.log("GOSOK GOSOK");
      }
    });
  });
}

function setGame() {
  var promo1 = $("#promo");
  var promo2 = $("#promo2");
  var promo3 = $("#promo3");
  var promo01 = $("#promo01");
  var promo02 = $("#promo02");
  var promo03 = $("#promo03");
  var scratch;

  $("#promo").wScratchPad({
    // the size of the eraser
    size: 70,
    // the randomized scratch image
    bg: selectPrize.img,
    // give real-time updates
    realtime: true,
    // The overlay image
    fg: "img/overlay.png",
    // The cursor (coin) image
    cursor: 'url("img/coin1.png") 5 5, default',

    scratchMove: function (e, percent) {
      // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched

      if (percent > 50 && selectPrize.text != undefined) {
        $(".promo-container").show();
        $("body").removeClass("not-selectable");
        $(".promo-code").html("Congrats You Got: " + selectPrize.text);
      }

      if (percent > 2) {
        promo1 = percent;
        promo2.prop("disabled", true);
        promo3.prop("disabled", true);
      }

      if (promo1 > 50) {
        promo2.wScratchPad("clear").show();
        promo3.wScratchPad("clear").show();
        // console.log(promo2.show());
      }
    },
  });

  $("#promo2").wScratchPad({
    // the size of the eraser
    size: 70,
    // the randomized scratch image
    bg: selectPrize1.img,
    // give real-time updates
    realtime: true,
    // The overlay image
    fg: "img/overlay.png",
    // The cursor (coin) image
    cursor: 'url("img/coin1.png") 5 5, default',

    scratchMove: function (e, percent) {
      // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched
      if (percent > 50 && selectPrize1.text != undefined) {
        $(".promo-container").show();
        $("body").removeClass("not-selectable");
        $(".promo-code").html("Congrats You Got: " + selectPrize1.text);
      }

      if (percent > 2) {
        promo2 = percent;
        promo1.prop("disabled", true);
        promo3.prop("disabled", true);
      }

      if (promo2 > 50) {
        promo1.wScratchPad("clear").show();
        promo3.wScratchPad("clear").show();
      }
    },
  });

  $("#promo3").wScratchPad({
    // the size of the eraser
    size: 70,
    // the randomized scratch image
    bg: selectPrize2.img,
    // give real-time updates
    realtime: true,
    // The overlay image
    fg: "img/overlay.png",
    // The cursor (coin) image
    cursor: 'url("img/coin1.png") 5 5, default',

    scratchMove: function (e, percent) {
      // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched
      if (percent > 50 && selectPrize2.text != undefined) {
        $(".promo-container").show();
        $("body").removeClass("not-selectable");
        $(".promo-code").html("Congrats You Got: " + selectPrize2.text);
      }

      if (percent > 2) {
        promo3 = percent;
        promo1.prop("disabled", true);
        promo2.prop("disabled", true);
      }

      if (promo3 > 50) {
        promo1.wScratchPad("clear").show();
        promo2.wScratchPad("clear").show();
      }
    },
  });

  $("#promo01").wScratchPad({
    // the size of the eraser
    size: 70,
    // the randomized scratch image
    bg: prize6.img,
    // give real-time updates
    realtime: true,
    // The overlay image
    fg: "img/overlay.png",
    // The cursor (coin) image
    cursor: 'url("img/coin1.png") 5 5, default',

    scratchMove: function (e, percent) {
      // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched

      if (percent > 50 && prize6.text != undefined) {
        $(".promo-container").show();
        $("body").removeClass("not-selectable");
        $(".promo-code").html("Congrats You Got: " + prize6.text);
      }

      if (percent > 2) {
        promo01 = percent;
        promo02.prop("disabled", true);
        promo03.prop("disabled", true);
        document.getElementById("promo02").style.pointerEvents = "none";
        document.getElementById("promo03").style.pointerEvents = "none";
      }

      if (promo01 > 50) {
        promo2.wScratchPad("clear").show();
        promo3.wScratchPad("clear").show();
        document.getElementById("promo2").removeAttribute("hidden");
        document.getElementById("promo3").removeAttribute("hidden");
        promo02.wScratchPad("clear").hide();
        promo03.wScratchPad("clear").hide();
        // console.log(promo2.show());
      }
    },
  });

  $("#promo02").wScratchPad({
    // the size of the eraser
    size: 70,
    // the randomized scratch image
    bg: prize6.img,
    // give real-time updates
    realtime: true,
    // The overlay image
    fg: "img/overlay.png",
    // The cursor (coin) image
    cursor: 'url("img/coin1.png") 5 5, default',

    scratchMove: function (e, percent) {
      // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched

      if (percent > 50 && prize6.text != undefined) {
        $(".promo-container").show();
        $("body").removeClass("not-selectable");
        $(".promo-code").html("Congrats You Got: " + prize6.text);
      }

      if (percent > 2) {
        promo02 = percent;
        promo01.prop("disabled", true);
        promo03.prop("disabled", true);
        document.getElementById("promo01").style.pointerEvents = "none";
        document.getElementById("promo03").style.pointerEvents = "none";
      }

      if (promo02 > 50) {
        promo1.wScratchPad("clear").show();
        promo3.wScratchPad("clear").show();
        document.getElementById("promo").removeAttribute("hidden");
        document.getElementById("promo3").removeAttribute("hidden");
        promo01.wScratchPad("clear").hide();
        promo03.wScratchPad("clear").hide();
        // console.log(promo2.show());
      }
    },
  });

  $("#promo03").wScratchPad({
    // the size of the eraser
    size: 70,
    // the randomized scratch image
    bg: prize6.img,
    // give real-time updates
    realtime: true,
    // The overlay image
    fg: "img/overlay.png",
    // The cursor (coin) image
    cursor: 'url("img/coin1.png") 5 5, default',

    scratchMove: function (e, percent) {
      // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched

      if (percent > 50 && prize6.text != undefined) {
        $(".promo-container").show();
        $("body").removeClass("not-selectable");
        $(".promo-code").html("Congrats You Got: " + prize6.text);
      }

      if (percent > 2) {
        promo03 = percent;
        promo01.prop("disabled", true);
        promo02.prop("disabled", true);
        document.getElementById("promo01").style.pointerEvents = "none";
        document.getElementById("promo02").style.pointerEvents = "none";
      }

      if (promo03 > 50) {
        promo1.wScratchPad("clear").show();
        promo2.wScratchPad("clear").show();
        document.getElementById("promo").removeAttribute("hidden");
        document.getElementById("promo2").removeAttribute("hidden");
        promo01.wScratchPad("clear").hide();
        promo02.wScratchPad("clear").hide();
        // console.log(promo2.show());
      }
    },
  });
}
