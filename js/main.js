import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getFirestore, query, where, collection, doc ,getDocs, updateDoc, setDoc} from "firebase/firestore";

// CONFIGURASI FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyBdFMZoNwEWNqCOfUezoSB-TewpOBUfX98",
    authDomain: "mgoalindo---app.firebaseapp.com",
    databaseURL: "https://mgoalindo---app-default-rtdb.firebaseio.com",
    projectId: "mgoalindo---app",
    storageBucket: "mgoalindo---app.appspot.com",
    messagingSenderId: "909481590933",
    appId: "1:909481590933:web:a0626d75765bd850a5db9c",
    measurementId: "G-RLCM7JVYFY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Firestore Database and get document
const db = getFirestore(app);
const col = "kuponscratch";
const col2 = "prize-scratch";
const colRef = collection(db, col);
const colRef2 = collection(db, col2);

var username;
var kode;

export var game;


let dpr;
window.onload = function () {

    // game configuration object
    let gameConfig = {

        // resolution and scale mode
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "canvas",
            width: window.innerWidth * window.devicePixelRatio,
            height: window.innerHeight * window.devicePixelRatio
        },
        dom: {
            createContainer: true
        },
        // game background color
        // backgroundColor: 0x560000,

        transparent: true,

        // scenes used by the game
        scene: [kuponVoucher,claimVoucher]
    };

    // game constructor
    game = new Phaser.Game(gameConfig);

    // pure javascript to give focus to the page/frame
    window.focus()
    startGame()
}
// Kupon Voucher scene
class kuponVoucher extends Phaser.Scene {

    // contructor
    constructor() {
        super("KuponVoucher");
    }

    init() {
         window.mobilecheck = function () {
            let check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };

        //init canvas size
        this.gameWidth = this.sys.game.scale.width;
        this.gameHeight = this.sys.game.scale.height;
        this.halfWidth = this.gameWidth / 2;
        this.halfHeight = this.gameHeight / 2;
        dpr = window.devicePixelRatio
    }

    preload() {
        this.load.image("bgDialog", "./img/field(new).png");
        this.load.image("okButton", "./img/play.png");
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        
    }

    async create() {
        if (window.mobilecheck() == 1) {
            var dialogBg = this.add.sprite(this.halfWidth, this.halfHeight, "bgDialog");
            dialogBg.setScale(0.25 * dpr);
            this.inputText = this.add.rexInputText(this.halfWidth, this.halfHeight + (28 * dpr), 120 * dpr, 100 * dpr, {
                // Style properties
                align: "center",
                fontSize: `${12 * dpr}px`,
                color: '#ffffff',
                border: 0,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                outline: 'none',
                direction: 'ltr',
            });
            this.inputText2 = this.add.rexInputText(this.halfWidth, this.halfHeight + (90 * dpr), 120 * dpr, 35 * dpr, {
                // Style properties
                align: "center",
                fontSize: `${12 * dpr}px`,
                color: '#ffffff',
                border: 0,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                outline: 'none',
                direction: 'ltr',
            });
            let inputText = this.inputText;
            this.inputText.on('textchange', function (inputs, e) {
                inputText.setText(inputs.text.toString().toUpperCase());
            }, this);

            let inputText2 = this.inputText2;
            this.inputText2.on('textchange', function (inputs, e) {
                inputText2.setText(inputs.text.toString().toUpperCase());
            }, this);
            let world = this;
            this.btnOk = this.add.sprite(this.halfWidth, this.halfHeight + (150 * dpr), "okButton");
            this.btnOk.setScale(0.30 * dpr);
            this.btnOk.setInteractive();
            this.btnOk.on("pointerover", function () {
            });
            this.btnOk.on("pointerout", function () {
            });
            this.btnOk.on("pointerdown", async function () {
                let txt = inputText.text
                let txt2 = inputText2.text;
                kode = txt2;
                const q = query(colRef, where("kode", "==", txt2), where("active", "==", true));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.size == 0) {
                    // alert("Kode tidak ditemukan!");
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Code Not Found!',
                    });
                } else {
                    if(txt != "" && txt != undefined && txt != null){
                        username = txt;
                        let docRef = doc(db, col2, String(txt2));
                        let a = query(colRef2, where("name", "==", String(username)));
                        let data = await getDocs(a);
                        if(data.size == 0){
                                querySnapshot.forEach(async (docs) => {
                                let data = docs.data();
                                const docChange = doc(db, col, `${data.id}`);
                                await updateDoc(docChange, {
                                    active: false
                                })
                                .then(async() => {
                                    await setDoc(docRef, {
                                        name:username,
                                        kupon: txt2,
                                        date: tglIndonesia(),
                                        timestamp: Math.floor(Date.now() / 1000),
                                    }).then(()=> {
                                        document.getElementById("canvas").style.zIndex = "-1";
                                        document.getElementById("scratch").style.visibility = "visible";
                                        world.scene.stop("KuponVoucher");
                                    });
                                    
                                });
                            });
                        }
                        else{
                            // alert(`Username ${username} sudah terdaftar`);
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Username "+username+" is already registered",
                            });

                        }

                    }else{
                        // alert("Username tidak boleh kosong!");
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Username cannot be blank!",
                        });
                    }
                }
            });
        } else {
            var dialogBg = this.add.sprite(this.halfWidth, this.halfHeight, "bgDialog");
            dialogBg.setScale(0.35 * dpr);
            this.inputText = this.add.rexInputText(this.halfWidth , this.halfHeight + (35 * dpr), 300 * dpr, 100 * dpr, {
                // Style properties
                align: "center",
                fontSize: `${26 * dpr}px`,
                color: '#ffffff',
                border: 0,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                outline: 'none',
                direction: 'ltr',
            });
            this.inputText2 = this.add.rexInputText(this.halfWidth , this.halfHeight + (120 * dpr), 300 * dpr, 100 * dpr, {
                // Style properties
                align: "center",
                fontSize: `${26 * dpr}px`,
                color: '#ffffff',
                border: 0,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                outline: 'none',
                direction: 'ltr',
            });
            let inputText = this.inputText;
            this.inputText.on('textchange', function (inputs, e) {
                inputText.setText(inputs.text.toString().toUpperCase());
            }, this);
            let inputText2 = this.inputText2;
            this.inputText2.on('textchange', function (inputs, e) {
                inputText2.setText(inputs.text.toString().toUpperCase());
            }, this);
            let world = this;
            this.btnOk = this.add.sprite(this.halfWidth , this.halfHeight + (200 * dpr) , "okButton");
            this.btnOk.setScale(0.35 * dpr);
            this.btnOk.setInteractive();
            this.btnOk.on("pointerover", function () {
            });
            this.btnOk.on("pointerout", function () {
            });
            this.btnOk.on("pointerdown", async function () {
                let txt = inputText.text
                let txt2 = inputText2.text;
                kode = txt2;
                // GET KODE DATA
                const q = query(colRef, where("kode", "==", txt2), where("active", "==", true));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.size == 0) {
                    // alert("Kode tidak ditemukan!");
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Code Not Found!",
                    });
                } else {
                    if(txt != "" && txt != undefined && txt != null){
                        username = txt;
                        let docRef = doc(db, col2, String(txt2));
                        let a = query(colRef2, where("name", "==", String(username)));
                        let data = await getDocs(a);
                        if(data.size == 0){
                                querySnapshot.forEach(async (docs) => {
                                let data = docs.data();
                                const docChange = doc(db, col, `${data.id}`);
                                await updateDoc(docChange, {
                                    active: false
                                })
                                .then(async() => {
                                    await setDoc(docRef, {
                                        name:username,
                                        kupon: txt2,
                                        date: tglIndonesia(),
                                        timestamp: Math.floor(Date.now() / 1000),
                                    }).then(()=> {
                                        document.getElementById("canvas").style.zIndex = "-1";
                                        document.getElementById("scratch").style.visibility = "visible";

                                        world.scene.stop("KuponVoucher");
                                    });
                                    
                                });
                            });
                        }
                        else{
                            // alert(`Username ${username} sudah terdaftar`);
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Username "+username+" is already registered",
                            });
                        }

                    }else{
                        // alert("Username tidak boleh kosong!");
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Username cannot be blank!",
                        });
                    }
                }
            });
        }
    }

}

class claimVoucher extends Phaser.Scene {

    // contructor
    constructor() {
        super("claimVoucher");
    }

    init() {
         window.mobilecheck = function () {
            let check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };

        //init canvas size
        this.gameWidth = this.sys.game.scale.width;
        this.gameHeight = this.sys.game.scale.height;
        this.halfWidth = this.gameWidth / 2;
        this.halfHeight = this.gameHeight / 2;
        // dpr = window.devicePixelRatio

    }

    preload() {

        this.load.image("bgDialog1", "./img/claim.png");
        this.load.image("okButton1", "./img/klaim.png");
        // this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        
    }

    async create() {
        let world = this;
        if (window.mobilecheck() == 1) {
            this.add.graphics().setDepth(0).fillStyle(0x000000, 0.8).fillRect(0, 0, this.gameWidth, this.gameHeight);
            var dialogBg = this.add.sprite(this.halfWidth, this.halfHeight, "bgDialog1");
            dialogBg.setScale(0.30 * dpr);
            this.btnOk = this.add.sprite(this.halfWidth, this.halfHeight + (90 * dpr), "okButton1");
            this.btnOk.setScale(0.30 * dpr);
            this.btnOk.setInteractive();
            this.btnOk.on("pointerover", function () {
            });
            this.btnOk.on("pointerout", function () {
            });
            this.btnOk.on("pointerdown", async function () {
                var prize = startGame();
                world.claimPrize(prize, kode);
            });
        } else {
            this.add.graphics().setDepth(0).fillStyle(0x000000, 0.8).fillRect(0, 0, this.gameWidth, this.gameHeight);
            var dialogBg = this.add.sprite(this.halfWidth, this.halfHeight, "bgDialog1");
            dialogBg.setScale(0.50 * dpr);
            this.btnOk = this.add.sprite(this.halfWidth , this.halfHeight + (150 * dpr) , "okButton1");
            this.btnOk.setScale(0.50 * dpr);
            this.btnOk.setInteractive();
            this.btnOk.on("pointerover", function () {
            });
            this.btnOk.on("pointerout", function () {
            });
            this.btnOk.on("pointerdown", async function () {
                var prize = startGame();
                world.claimPrize(prize, kode);
               
            });
        }
    }





    claimPrize(idPrize, kode) {
        // Build formData object.
        let formData = new FormData();
        formData.append('reward', `${idPrize}`);
        var msg = `Saya Mendapatkan *${idPrize.text}* dari m88scratch.com dengan kode voucher *${kode}*`;
        // var url = 'https://t.me/+6281288522088'; //tele
        var url = 'https://wa.me/?phone=639691475492&text=' + encodeURIComponent(msg); // wa
        navigator.clipboard.writeText(msg);
        // alert(msg);

        var s = window.open(url, '_blank');

        if (s && s.focus) {
            s.focus();
        }
        else if (!s) {
            window.location.href = url;
        }
    }
}



function startGame(){
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

    const min = parseInt(1);
    const max = parseInt(2);
    const rand1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const rand2 = Math.floor(Math.random() * (max - min + 1)) + min;
    const rand3 = Math.floor(Math.random() * (max - min + 1)) + min;



    var selectPrize1 = prizeArray[0];
    var selectPrize2 = prizeArray[1];
    var selectPrize3 = prizeArray[1];

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

    // console.log(rand1, selectPrize1);
    // console.log(rand2, selectPrize2);
    // console.log(rand3, selectPrize3);

    var promo1 = $("#promo");
    var promo2 = $("#promo2");
    var promo3 = $("#promo3");
    var promo01 = $("#promo01");
    var promo02 = $("#promo02");
    var promo03 = $("#promo03");
    var claimed = false;

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
                document.getElementById("canvas").style.zIndex = "1";
                // document.getElementById("scratch").style.visibility = "hidden";
                if (!claimed) {
                  game.scene.start("claimVoucher");
                  claimed = true;
                }
                // console.log(game.scene.getScene("claimVoucher"));
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
                // $(".promo-container").show();

                document.getElementById("canvas").style.zIndex = "1";
                // document.getElementById("scratch").style.visibility = "hidden";
                
                if (!claimed) {
                  game.scene.start("claimVoucher");
                  claimed = true;
                }
                // console.log(game.scene.getScene("claimVoucher"));

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
                // $(".promo-container").show();
                document.getElementById("canvas").style.zIndex = "1";
                // document.getElementById("scratch").style.visibility = "hidden";
                
                if (!claimed) {
                  game.scene.start("claimVoucher");
                  claimed = true;
                }
                // console.log(game.scene.getScene("claimVoucher"));

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

    return prize1;
}



function tglIndonesia() {
    var date = new Date();
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();
    var hari = date.getDay();
    var jam = date.getHours();
    var menit = date.getMinutes();
    var detik = date.getSeconds();
    switch (hari) {
        case 0:
            hari = "Minggu";
            break;
        case 1:
            hari = "Senin";
            break;
        case 2:
            hari = "Selasa";
            break;
        case 3:
            hari = "Rabu";
            break;
        case 4:
            hari = "Kamis";
            break;
        case 5:
            hari = "Jum'at";
            break;
        case 6:
            hari = "Sabtu";
            break;
    }
    switch (bulan) {
        case 0:
            bulan = "Januari";
            break;
        case 1:
            bulan = "Februari";
            break;
        case 2:
            bulan = "Maret";
            break;
        case 3:
            bulan = "April";
            break;
        case 4:
            bulan = "Mei";
            break;
        case 5:
            bulan = "Juni";
            break;
        case 6:
            bulan = "Juli";
            break;
        case 7:
            bulan = "Agustus";
            break;
        case 8:
            bulan = "September";
            break;
        case 9:
            bulan = "Oktober";
            break;
        case 10:
            bulan = "November";
            break;
        case 11:
            bulan = "Desember";
            break;
    }
    var tampilTanggal = hari + ", " + tanggal + " " + bulan + " " + tahun;
    var tampilWaktu = jam + ":" + menit + ":" + detik;
    return tampilTanggal + " " + tampilWaktu
}


