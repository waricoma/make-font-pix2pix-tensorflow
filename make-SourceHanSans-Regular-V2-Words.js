'use strict';

const wordSelector = ["!","\"","#","%","&","'","(",")","*","猫","犬","紹",
  "一", "右", "雨", "円", "王", "下", "火", "花", "貝", "学", "気", "九",
  "休", "玉", "金", "空", "月", "犬", "見", "五", "口", "校", "左", "三", "山",
  "子", "大", "字", "耳", "七", "車", "手", "十", "出", "女", "小", "上", "森", "人", "水", "正",
  "生", "青", "夕", "石", "赤", "千", "川", "先", "早", "草", "足", "村", "大", "男", "竹", "中", "虫",
  "町", "天", "田", "土", "二", "日", "入", "年", "白", "八", "百", "文", "木", "本", "名", "目", "立", "力", "林", "六",
  "引", "羽", "雲", "園", "遠", "何", "科", "夏", "家", "歌", "画", "回", "会", "海", "絵", "外", "角", "楽", "活", "間", "丸", "岩", "顔", "汽", "記", "帰", "弓", "牛", "魚", "京", "強", "教", "近", "兄", "形", "計", "元", "言", "原", "戸", "古", "午", "後", "語", "工", "公", "広", "交", "光", "考", "行", "高", "黄", "合", "谷", "国", "黒", "今", "才", "細", "作", "算", "止", "市", "矢", "姉", "思", "紙", "寺", "自", "時", "室", "社", "弱", "首", "秋", "週", "春", "書", "少", "場", "色", "食", "心", "新", "親", "図", "数", "西", "声", "星", "晴", "切", "雪", "船", "線", "前", "組", "走", "多", "太", "体", "台", "地", "池", "知", "茶", "昼", "長", "鳥", "朝", "直", "通", "弟", "店", "点", "電", "刀", "冬", "当", "東", "答", "頭", "同", "道", "読", "内", "南", "肉", "馬", "売", "買", "麦", "半", "番", "父", "風", "分", "聞", "米", "歩", "母", "方", "北", "毎", "妹", "万", "明", "鳴", "毛", "門", "夜", "野", "友", "用", "曜", "来", "里", "理", "話",
  ",","-",".","/","0","1","2","3","4","5","6","7","8","9",
  ":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
  "P","Q","R","S","T","U","V","W","X","Y","Z","[","]","^","_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x"
  ,"y","z","{","|","}","~","¡","¥","¦","§","©","«","¬","®","°","±","¶","·","»","¿","×","÷",
  "☯","♩","♪","♫","♬","♭","♮","♯","⸘","、","。","々","〇","〈","〉","《","》","「","」","『","』","【","】","〔","〕","〖","〗","〜","〰","ぁ","あ","ぃ","い","ぅ","う","ぇ","え","ぉ","お","か","が","き","ぎ","く","ぐ","け","げ","こ","ご","さ","ざ","し","じ","す","ず","せ","ぜ","そ","ぞ","た","だ","ち","ぢ","っ","つ","づ","て","で","と","ど","な","に","ぬ","ね","の","は","ば","ぱ","ひ","び","ぴ","ふ","ぶ","ぷ","へ","べ","ぺ","ほ","ぼ","ぽ","ま","み","む","め","も","ゃ","や","ゅ","ゆ","ょ","よ","ら","り","る","れ","ろ","ゎ","わ","ゐ","ゑ","を","ん","ゔ","ァ","ア","ィ","イ","ゥ","ウ","ェ","エ","ォ","オ","カ","ガ","キ","ギ","ク","グ","ケ","ゲ","コ","ゴ","サ","ザ","シ","ジ","ス","ズ","セ","ゼ","ソ","ゾ","タ","ダ","チ","ヂ","ッ","ツ","ヅ","テ","デ","ト","ド","ナ","ニ","ヌ","ネ","ノ","ハ","バ","パ","ヒ","ビ","ピ","フ","ブ","プ","ヘ","ベ","ペ","ホ","ボ","ポ","マ","ミ","ム","メ","モ","ャ","ヤ","ュ","ユ","ョ","ヨ","ラ","リ","ル","レ","ロ","ヮ","ワ","ヰ","ヱ","ヲ","ン","ヴ","ヵ","ヶ","ヷ","ヸ","ヹ","ヺ","・","ー","一","丁","七","万","丈","三","上","下","不","与","丐","丑","且","丕","世","丗","丘","丙","丞","両","並","丨","个","中","丱","串","丶","丸","丹","主","丼","丿","乂","乃","久","之","乍","乎","乏","乕","乖","乗","乘","乙","九","乞","也","乢","乱","乳","乾","亀","亂","亅","了","予","争","亊","事","二","于","云","互","五","井","亘","亙","些","亜","亞","亟","亠","亡","亢","交","亥","亦","亨","享","京","亭","亮","亰","亳",
  "彿","往","征","徂","徃","径","待","徇","很","徊","律","後","徐","徑","徒","従","得","徘","徙","從","徠",
  "后","吏","吐","向","君","吝","吟","吠","否","吩","含","听","吭","吮","吶","吸","吹","吻","吼","吽","吾","呀","呂","呆","呈",
  "樹","樺","樽","橄","橆","橇","橈","橋","橘","橙","機","橡","橢","橦","橫","橲","橳","橸","橾","橿","檀","檄","檍","檎","檐","檗","檜","檠","檢","檣","檪","檬","檮","檳","檸","檻","櫁","櫂","櫃","櫑","櫓","櫚","櫛","櫞","櫟","櫢","櫤","櫨","櫪","櫺","櫻","欄","欅","權","欒","欖","欝","欟","欠","次","欣","欧","欲","欷","欸","欹","欺","欽","款","歃","歇","歉","歌","歎","歐","歓","歔","歙","歛","歟","歡","止"];

console.log(wordSelector.length);

const argparse = require('argparse').ArgumentParser;
const fs = require('fs-extra');
const readline = require('readline');
const consola = require('consola');
const notifier = require('node-notifier');
// const open = require('open');
const path = require('path');
const accessCheck = require('./modules/access-check');

const title = 'make-SourceHanSans-Regular-Words';
const icon = path.resolve(__dirname, 'icon.png');

const parser = new argparse({
  version: '0.0.1',
  addHelp: true,
  description: title,
  argumentDefault: {flip: true}
});

parser.addArgument(['--ttx'], {required: true, type: 'string', help: 'path to ttx file *must: pip install fonttools'});
parser.addArgument(['--notify'], {type: 'string', defaultValue: 'false', help: 'true or false : notify some event'});
parser.addArgument(['--sound'], {type: 'string', defaultValue: 'false', help: 'true or false : for --notify'});

const args = parser.parseArgs();

const wordsJsPath = path.resolve(__dirname, 'modules', 'SourceHanSans-Regular-V2-Words.js');
const ttxPath = path.resolve(args.ttx);
const wordsInf = {words: [], unicodes: []};
accessCheck(wordsJsPath, () => accessCheck(ttxPath, () => {
  consola.start('read ttx file.');

  const ttxStream4Count = fs.createReadStream(ttxPath, 'utf8');
  let ttxLineCount = 0;
  readline.createInterface({input: ttxStream4Count}).on('line', () => ttxLineCount++);

  const ttxStream = fs.createReadStream(ttxPath, 'utf8');
  let finishLineCount = 0;
  ttxStream4Count.on('end', () => {
    consola.log(`${ttxLineCount} [end line]`);
    readline.createInterface({input: ttxStream}).on('line', line => {

      process.stdout.write(`\r${++finishLineCount}`);
      const unicodeInf = line.match(/code="0x(.*?)"/);
      if (unicodeInf === null) return true;
      const word = String.fromCharCode(parseInt(unicodeInf[1], 16)).trim();
      if (wordSelector.indexOf(word) === -1) return true;
      if (word === '' || word.length !== 1 || wordsInf.words.indexOf(word) !== -1) return true;
      wordsInf.words.push(word);
      wordsInf.unicodes.push(unicodeInf[1]);
    });
  });

  ttxStream4Count.on('error', err => {
    consola.error('when reading ttx file');
    if (args.notify === 'true') notifier.notify({
      title: title,
      message: 'error: when reading ttx file',
      icon: icon,
      sound: args.sound === 'true',
      wait: true
    });
    throw err;
  });
  ttxStream.on('error', err => {
    consola.error('when reading ttx file');
    if (args.notify === 'true') notifier.notify({
      title: title,
      message: 'error: when reading ttx file',
      icon: icon,
      sound: args.sound === 'true',
      wait: true
    });
    throw err;
  });

  ttxStream.on('end', () => {
    fs.writeFile(wordsJsPath, `'use strict';module.exports=${JSON.stringify(wordsInf)};`, err => {
      if (err) {
        consola.error('when writing ttx file');
        throw err;
      }
      console.log('');
      consola.success(wordsJsPath);

      if (args.notify === 'true') notifier.notify({
        title: title,
        message: `success: ${wordsJsPath}`,
        icon: icon,
        sound: args.sound === 'true',
        wait: true
      });
    });
  });
}) );

if (args.notify === 'true') notifier.on('click', () => open(__dirname));
