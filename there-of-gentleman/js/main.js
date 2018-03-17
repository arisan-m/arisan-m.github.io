(function () {
	'use strict';

	//DOMのid-stage変数定義
	var stage = document.getElementById('stage');
	//ctxの変数を定義
	var ctx;
	//描画領域の範囲を指定
	var width = 480;
	var height = 260;
	//画面の密度を保持する変数
	var dpr;
	var isMoving = false;

	//アプリに関することオブジェクト
	var App;
	//オブジェクトをインスタンス化した時に使う変数小文字で定義
	var app;

	//grassオブジェクト
	var Grass;
	//grassインスタンス用
	var grass;

	//背景オブジェクト
	var Ground;
	//背景インスタンス
	var ground;



	var img = new Image();



	//groundは動かないので座標は必要なし
	Ground = function () {
		this.draw = function () {
			ctx.fillStyle = '#79bfef';
			//座標で上から150にしたのでheightも150引く
			ctx.fillRect(0, 150, width, height - 150);
		}
	}


	//grassインスタンス化した時にxyを渡したいので記載する
	Grass = function (x, y) {
		//渡されたx,yにする
		this.x = x;
		this.y = y;
		//描画処理をdrawにまとめる
		this.draw = function () {
			//grassの色設定・矩形
			ctx.fillStyle = '#cecece';
			//パス書きはじめますよー
			ctx.beginPath();
			//まず渡されるxyに移動しますよー
			ctx.moveTo(this.x, this.y);
			//初期値からパス渡しますよー
			ctx.lineTo(this.x + 50, this.y + 50);
			ctx.lineTo(this.x + 100, this.y);
			//パスの領域を塗りつぶす
			ctx.fill();
			ctx.fillRect(this.x + 45, this.y, 10, 90);
			//パス書きはじめますよー
			ctx.beginPath();
			//まず渡されるxyに移動しますよー
			ctx.moveTo(this.x + 50, this.y + 80);
			//初期値からパス渡しますよー
			ctx.lineTo(this.x + 40, this.y + 90);
			ctx.lineTo(this.x + 60, this.y + 90);
			//パスの領域を塗りつぶす
			ctx.fill();
			if (isMoving) {
				this.x += 5;
			}
			//座標をずらす
			//x座標がwidth以上になったら、矩形の横幅分 = 100 マイナスする
			if (this.x > width) {
				this.x = -100;
			}
		};
	};




	App = function () {
		//全体に関する設定をsetupでまとめる
		this.setup = function () {
			//もしstaageのcontextが取得できなかったら処理を止める
			if (typeof stage.getContext === 'undefond') {
				return;
			}
			//ctxを取得、描画の種類を指定
			ctx = stage.getContext('2d');
			//dpr取得、window.devicePixelRatioで取得できる、これが取得できなかったら等倍の1にする
			dpr = window.devicePixelRatio || 1;

			//stageの領域を描画領域に指定
			//一旦dpr倍で表示領域を拡大
			stage.width = width * dpr;
			stage.height = height * dpr;
			//表示領域を拡大したので座標も拡大
			ctx.scale(dpr, dpr);
			//表示の大きさをwidth.heightに変更
			stage.style.width = width + 'px'; //480px
			stage.style.height = height + 'px'; //260px
		}
		//描画に関する設定をdrawでまとめる
		this.draw = function () {
			//描画するごとに領域全体をclearする
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(img, 0, 0);
			//groundより前に描画します
			//mountain.draw();
			//grassより前に描画します
			ground.draw();
			//grass.draw()をAppの中で実行する
			grass.draw();
			//10m秒ごとにdrawを実行
			setTimeout(function () {
				//settimeoutのfunctionではthisはeindowオブジェクトになってしまうのでbindする
				this.draw();
			}.bind(this), 10);
			//bind(this)はAppオブジェクト
		}
	}

	stage.addEventListener('click', function () {
		isMoving = !isMoving;
	})

	img.src = 'img/bg.jpg';
	img.addEventListener('load', function () {
		//grassのインスタンスを作りxyを渡す
		grass = new Grass(100, 100);
		//groundのインスタンスを作る
		ground = new Ground();
		//mountainのインスタンスを作る位置決める、yの始点150


		//Appのインスタンスを作ってsetupとdrawを実行する
		app = new App();
		app.setup();
		app.draw();
	});



})();