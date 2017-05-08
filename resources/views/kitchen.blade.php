<html class="">
  <head>
<style>order {
  width: 100%;
  margin: 1em;
  border: 1px solid #3c3c3c;
  display: flex;
  flex-direction: column;
  padding: 0.5em;
}

order.tentative {
  background-color: #ccc;
}
ul { display: block; }
li span:last-child:before {
  content: "個数：";
}
li span:first-child {
  margin-right: 2em;
}</style>
</head>

<body>
<script src="http://cdn.mlkcca.com/v0.6.0/milkcocoa.js"></script>
<script src="//production-assets.codepen.io/assets/common/stopExecutionOnTimeout-b2a7b3fe212eaa732349046d8416e00a9dec26eb7fd347590fbced3ab38af52e.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script>
(function(){

var updateTimer = null;

var milkcocoa = new MilkCocoa("leadii5pbr0b.mlkcca.com");
var ds = milkcocoa.dataStore("yoro");
window.pushFlg = true;
ds.on('push', function(sended) {
 if (window.pushFlg) return false;
console.log(window.pushFlg);
  $.ajax({
    url: "http://54.249.14.213/reqCom",
    type: "get",
    dataType: "json"
  });
//  clearTimeout(updateTimer);
 $('order').removeClass('tentative');
});

var menuList = [];
$.ajax({
  url: "http://54.249.14.213/sendMenuList",
  type: "get",
  dataType: "json",
  success: function(e){
    for (var u in e.data.menu) {
      menuList[e.data.menu[u].id] = e.data.menu[u];
    }
    updateTimer = setInterval(function(){
      getUpdateData();
    }, 10000);

    getUpdateData();

  }
});

function getUpdateData(){
  $.ajax({
    url: "http://54.249.14.213/reqUpdate",
    type: "get",
    dataType: "json",
    success: function(e){
      var orderList = [], info = [];

      var body = document.body;

      var order = document.createElement('order');
      var user = document.createElement('user');

      for (var i in e.data.vacantList) {
        orderList = e.data.vacantList[i].orderList;
        info = e.data.vacantList[i];
        // ユーザー情報をセット
        user.textContent = info.name + " 様　（予約番号："
        user.textContent += info.id + "）　";
        user.textContent += info.num + "名様　来店予定時間：";
        user.textContent += info.date;
        order.appendChild(user);

        if ( !info.commingFlg ) {
          order.classList.add('tentative');
        }

        var ul = document.createElement('ul');
        order.appendChild(ul);

        for (var u in orderList) {
          var li = document.createElement('li');
          var name = document.createElement('span');
          name.classList.add('name');
          name.textContent = menuList[orderList[u].menuId].name;
          var num = document.createElement('span')
          num.classList.add('num');
          num.textContent = orderList[u].count;

          li.appendChild(name);
          li.appendChild(num);
          ul.appendChild(li);

        }
        $("order").remove();
        body.appendChild(order);
      }
    }
  });
}

})();


//# sourceURL=pen.js
</script>
</body></html>