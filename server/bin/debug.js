const fs = require('fs');
const path = require('path');
const db = require('./db');

// TEMP: delete it later
exports.debugFunction = () => {
  db.exec('sign abc@xyz.com Ichinoe 123123123'.split(/\s+/))
  .then(() => db.newUnit(1, 1, 'Operating System'))
  .then(() => db.newUnit(1, 2, 'Math'))
  .then(() => db.newUnit(1, 3, 'Networks'))
  .then(() => db.newPage(1, 1, 1, 'TLB', 'Translation Lookaside Buffer'))
  .then(() => db.newPage(1, 1, 2, 'Process', 'The instance of a computer program that is being executed by one or many threads.'))
  .then(() => db.newPage(1, 1, 3, 'Dispatching', ''))
  .then(() => db.newPage(1, 2, 1, 'Predicates', ''))
  .then(() => db.newPage(1, 3, 1, 'DNS', 'Domain Name System'))
  .then(() => db.newPage(1, 3, 2, 'TCP/IP', ''))
  .then(() => db.newItem(1, 1, 1, 1, `## 填空题示例\n\n分辨率是指显示卡能在显示器上描绘点数的最大数量，通常以 <u>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</u> 表示。刷新频率是指 <u>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</u>，也即屏幕上的图像每秒钟出现的次数，它的单位是赫兹。`, `横向点数×纵向点数  \n图像在屏幕上更新的速度`))
  .then(() => db.newItem(1, 1, 1, 2, `## 选择题示例\n\n关于LCD显示器的点距，下列说法不正确的是 (&emsp;)。\n\n1. 点距是指两个连续的液晶颗粒中心之间的距离\n2. 点距越大，画面越清晰\n3. 点距越小，画面越清晰\n4. 点距在出厂时已经设定好，用户无法改变`, '2'))
  .then(() => db.newItem(1, 1, 1, 3, `## 判断题示例\n\n（&emsp;）计算机的显示器黑屏，首先应该检查主板是否烧毁。`, `×`))
  .then(() => db.newItem(1, 1, 1, 4, `## 问答题示例\n\n「自分の家から駅までの地図を描いてください」そういわれて、どの程度の地図が描けるだろうか。「これまで地図の読み方は学んできたが、地図の描き方は知らない」といわれるかもしれないが、正確でなくてもよいから、一度描いてみてほしい。\n\n大学生のころ、心理学の授業で、この課題が出た。制限時間は20 分で、描きながら自己嫌悪を感じていた。毎日歩き慣れた道なのに、よく行く店と、危ない交差点しか頭に浮かばず、その間の店や道などがまったく思い出せないことに気づいたのだった。距離感や方向感覚もデタラメで、いかに客観的にものを見ていないかということに、気づかされた課題であった。（中略）\n\n地図には主題図と基本図があるが、自分で描く地図は主題図である。何をテーマに描くかは本人にゆだねられる。まったく自由に地図を描いた場合は、自分が気になっていることから描きはじめる。気になることが少なければ、地図の情報は少なくなる。いわば自分の価値観のなかにある「心の地図」がそこにはできあがるのだ。逆にいえば、自分で地図を描こうと街やフィールドに出れば、日頃見ていないものを見ることになる。気づかなかった看板や植物を発見したりできるのだ。新しい価値を見つけるかもしれないし、改めて自分の視点に気づくかもしれない。\n\n**問い：筆者はどうして③自分の地図を描いてみようと言っているのか。**`, `地図を描くことによって、自分の価値観が見えてくるから。`))
  .then(() => db.newItem(1, 1, 2, 1, '## Q5', 'A5'))
  .then(() => db.newItem(1, 1, 2, 2, '## Q6', 'A6'))
  .then(() => db.newItem(1, 2, 1, 1, '## Q7', 'A7'))
  .then(() => db.newItem(1, 2, 1, 2, '## Q8', 'A8'))
  .then(() => db.newItem(1, 2, 1, 3, '## Q9', 'A9'))
  .then(() => db.newItem(1, 2, 1, 4, '## Q10', 'A10'))
  .then(() => db.newItem(1, 2, 1, 5, '## Q11', 'A11'))
  .then(() => db.newItem(1, 2, 1, 6, '## Q12', 'A12'))
  .then(() => db.getThis(1, 1, 1))
  .then(() => db.editThis(1, 1, 1, [1, 3], [2, 4]))
  .then(() => db.getThis(1, 1, 1))
  .then(() => db.editThis(1, 1, 1, [1, 2, 4], [3]))
  .then(() => db.getThis(1, 1, 1))
  .then(() => db.editThis(1, 1, 1, [1, 2, 3, 4], []))
  .then(() => db.getThis(1, 1, 1))
  .then(() => db.editThis(1, 1, 1, [2, 4], [1, 3]))
  .then(() => {
    fs.readdir(path.join(__dirname, '../src/avatar'),
      (_, dir) => { db.editAvatarExtent(1, path.extname(dir[0])); });
  })
  .then(() => {
    fs.readdir(path.join(__dirname, '../src/image'), (_, dir) => {
      Promise.all(dir.map((item, index) => new Promise((resolve, reject) => {
        const param = item.match(/(\d+)_([0-9a-f]+)(\.\w{3,4})/);
        db.newImage(param[1], 1, 1, index + 1, `${param[2]}${param[3]}`,
          Math.round(1000 * Math.random()));
      })))
    })
  });
};
