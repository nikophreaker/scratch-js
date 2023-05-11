// var userToken =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luZ29vZ2xlIiwiaWF0IjoxNjc4MTcwMDI4LCJuYmYiOjE2NzgxNzAwMjgsImp0aSI6IjRQMnpJMUpwNEZiUHJUNFYiLCJzdWIiOiIxNDEiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.titAjpe-j46UdSafEbMhTAtq7hZTEv5KoVxixz8Tthk";
// var ticket;

// // fetch("https://api.msportsid.com/api/game/tiket", {
// fetch("http://127.0.0.1:8000/api/game/tiket", {
//     method: "get",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${userToken}`,
//     },
//   })
//   .then((res) => {
//     res.json().then((res2) => {
//       ticket = res2.data[0].tiket;
//       console.log(res2.data[0].tiket);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });


var prize1 = {
  img: "img/25ribu.png",
  text: "Rp 25.000",
};
var prize2 = {
  img: "img/50ribu.png",
  text: "Rp 50.000",
};
var prize3 = {
  img: "img/100ribu.png",
  text: "Rp 100.000",
};

var prizeArray = [prize2, prize3];
var a = []; 

const min = parseInt(1);
const max = parseInt(2);
const rand1 = Math.floor(Math.random() * (max - min + 1)) + min;
const rand2 = Math.floor(Math.random() * (max - min + 1)) + min;
const rand3 = Math.floor(Math.random() * (max - min + 1)) + min;



selectPrize1 = prizeArray[0];
selectPrize2 = prizeArray[1];
// if  (rand1 === 1 || rand1 === 2){
//     selectPrize1 = prizeArray[0];
//     selectPrize2 = prizeArray[1];
// }

if (rand2 === 1 || rand2 === 2 ) {
    selectPrize3 = prizeArray[1];
    if (selectPrize2 == prizeArray[0] && selectPrize1 == prizeArray[0]) {
        selectPrize1 = prizeArray[0];
        selectPrize2 = prizeArray[1];
        if (selectPrize3 == prizeArray[1] && selectPrize1 == prizeArray[0]) {
          selectPrize3 = prizeArray[0];
          selectPrize1 = prizeArray[1];
        }
        console.log("www");
    }
    if (selectPrize3 == prizeArray[1] && selectPrize2 == prizeArray[1]) {
      selectPrize3 = prizeArray[0];
      selectPrize2 = prizeArray[1];
        if (selectPrize1 == prizeArray[0] && selectPrize3 == prizeArray[0]) {
          selectPrize1 = prizeArray[0];
          selectPrize3 = prizeArray[1];
        }
    }
}



// if ()

console.log(rand1, selectPrize1);
console.log(rand2, selectPrize2);
console.log(rand3, selectPrize3);


this.setGame();

function setGame() {
    var promo1 = $("#promo");
    var promo2 = $("#promo2");
    var promo3 = $("#promo3");
    var promo01 = $("#promo01");
    var promo02 = $("#promo02");
    var promo03 = $("#promo03");


    $("#promo").wScratchPad({
    // the size of the eraser
        size: 70,
        // the randomized scratch image
        bg: selectPrize1.img,
        // give real-time updates
        realtime: true,
        // The overlay image
        fg: "img/gosok.png",
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
        bg: selectPrize2.img,
        // give real-time updates
        realtime: true,
        // The overlay image
        fg: "img/gosok.png",
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
            bg: selectPrize3.img,
            // give real-time updates
            realtime: true,
            // The overlay image
            fg: "img/gosok.png",
            // The cursor (coin) image
            cursor: 'url("img/coin1.png") 5 5, default',

            scratchMove: function (e, percent) {
            // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched
            if (percent > 50 && selectPrize3.text != undefined) {
                $(".promo-container").show();

                $("body").removeClass("not-selectable");
                $(".promo-code").html("Congrats You Got: " + selectPrize3.text);
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
        bg: prize1.img,
        // give real-time updates
        realtime: true,
        // The overlay image
        fg: "img/gosok.png",
        // The cursor (coin) image
        cursor: 'url("img/coin1.png") 5 5, default',

        scratchMove: function (e, percent) {
        // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched

            if (percent > 50 && prize1.text != undefined) {
                // $(".promo-container").show();
                console.log(game);
                $("#exampleModal").modal("show");

                $("body").removeClass("not-selectable");
                $(".promo-code").html("Congrats You Got: " + prize1.text);
            }

            if (percent > 2) {
                promo01 = percent;
                promo02.prop("disabled", true);
                promo03.prop("disabled", true);
                document.getElementById("promo02").style.pointerEvents = "none";
                document.getElementById("promo03").style.pointerEvents = "none";
            }

            if (promo01 > 50) {
                document.getElementById("promo2").children[0].src = prize2.img;
                document.getElementById("promo3").children[0].src = prize3.img;
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
        bg: prize1.img,
        // give real-time updates
        realtime: true,
        // The overlay image
        fg: "img/gosok.png",
        // The cursor (coin) image
        cursor: 'url("img/coin1.png") 5 5, default',

        scratchMove: function (e, percent) {
        // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched

            if (percent > 50 && prize1.text != undefined) {
                $(".promo-container").show();
                $("#exampleModal").modal("show");

                $("body").removeClass("not-selectable");
                $(".promo-code").html("Congrats You Got: " + prize1.text);
            }

            if (percent > 2) {
                promo02 = percent;
                promo01.prop("disabled", true);
                promo03.prop("disabled", true);
                document.getElementById("promo01").style.pointerEvents = "none";
                document.getElementById("promo03").style.pointerEvents = "none";
            }

            if (promo02 > 50) {
                document.getElementById("promo").children[0].src = prize2.img;
                document.getElementById("promo3").children[0].src = prize3.img;
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
        bg: prize1.img,
        // give real-time updates
        realtime: true,
        // The overlay image
        fg: "img/gosok.png",
        // The cursor (coin) image
        cursor: 'url("img/coin1.png") 5 5, default',

        scratchMove: function (e, percent) {
        // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched

            if (percent > 50 && prize1.text != undefined) {
                $(".promo-container").show();
                $("body").removeClass("not-selectable");
                $(".promo-code").html("Congrats You Got: " + prize1.text);
            }

            if (percent > 2) {
                promo03 = percent;
                promo01.prop("disabled", true);
                promo02.prop("disabled", true);
                document.getElementById("promo01").style.pointerEvents = "none";
                document.getElementById("promo02").style.pointerEvents = "none";
            }

            if (promo03 > 50) {
                document.getElementById("promo").children[0].src = prize3.img;
                document.getElementById("promo2").children[0].src = prize2.img;
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