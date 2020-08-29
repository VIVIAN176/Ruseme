var data=[
  {"src":"01.jpg"},
  {"src":"02.jpg"},
  {"src":"03.jpg"},
  {"src":"04.jpg"},
  {"src":"05.jpg"},
  {"src":"06.jpg"},
  {"src":"07.jpg"},
  {"src":"08.jpg"},
  {"src":"09.jpg"},
  {"src":"10.jpg"},
  {"src":"11.jpg"},
  {"src":"12.jpg"},
  {"src":"13.jpg"},
  {"src":"14.jpg"},
  {"src":"15.jpg"},
  {"src":"16.jpg"},
  {"src":"17.jpg"},
  {"src":"19.jpg"},
  {"src":"20.jpg"},
  {"src":"21.jpg"},
  {"src":"22.jpg"},
  {"src":"23.jpg"},
  {"src":"24.jpg"},
  {"src":"25.jpg"},
  {"src":"26.jpg"},
  {"src":"27.jpg"},
  {"src":"28.jpg"},
  {"src":"29.jpg"},
  {"src":"30.jpg"},
  {"src":"31.jpg"},
  {"src":"32.jpg"},
  {"src":"33.jpg"},
  {"src":"34.jpg"},
  {"src":"35.jpg"},
  {"src":"36.jpg"},
  {"src":"37.jpg"},
  {"src":"38.jpg"},
  {"src":"39.jpg"},
  {"src":"40.jpg"},
  {"src":"41.jpg"},
  {"src":"42.jpg"},
  {"src":"43.jpg"},
  {"src":"44.jpg"},
  {"src":"45.jpg"},
  {"src":"46.jpg"},
  {"src":"47.jpg"},
  {"src":"48.jpg"},
  {"src":"49.jpg"},
  {"src":"50.jpg"},
  {"src":"51.jpg"},
  {"src":"52.jpg"},
  {"src":"53.jpg"},
  {"src":"54.jpg"},
  {"src":"55.jpg"},
  {"src":"56.jpg"},
  {"src":"57.jpg"},
  {"src":"58.jpg"},
  {"src":"59.jpg"},
]

$(function(){
  var wrap=$('#wrap');
  let boxes=wrap.children("div");
  waterfall(wrap,boxes);
  $(this).scroll(function(event){
    appendBox(wrap,boxes)
  })
})
// 主要瀑布流布局函数
function waterfall(wrap,boxes){
// 第一步:先获取能容纳的列数：窗口宽度/每列宽度
// +20是外边距
  let boxswidth=boxes.eq(0).width()+40;
  let windowwidth=$(window).width();
  let column=Math.floor(windowwidth/boxswidth);
// 顺便计算得出容器的宽度，让盒子居中
  let wrapwidth=column*boxswidth;
  wrap.width(wrapwidth)
// 第二步：定义一个数组存储每一列的高度
  var arr=new Array;
// 遍历每一个盒子
  for(var i=0;i<boxes.length;i++){
    // 当i<column时，说明在第一行，把盒子的高度存入到数组里
    if(i<column){
      arr[i]=boxes.eq(i).height()+40
    }
    // 否则就是第二行，开始按最小高度插入图片到列中
    else{
      // 先获取最小高度列的索引
      let minheight=Math.min.apply(null,arr)
      let minindex=getMinIndex(minheight,arr)
      // 这里的leftvalue，是指最小高度列距离窗口左边的距离，相当于间接定位了这一列接下来要插入图片时，position定位的left值是多少
      let leftvalue=boxes.eq(minindex).position().left;
      setStyle(boxes.eq(i),minheight,leftvalue,i)
      // 到这里已经插入了一张图片在最低高度列，接下来要改变arr里的最低高度的值，让它继续下次遍历
      arr[minindex]+=boxes.eq(i).height() + 20
    }
  }
}

//设置追加盒子的样式  减少刷新量
let getStartNumber=0;
let setStyle=function(box,top,left,index){
  if(getStartNumber>=index){
    return false;
  };
  box.css({
    'position':'absolute',
    'top':top,
    'left':left,
    'opacity':'0'
  })  .stop().animate({/*第二行慢慢出来的动画*/
    'opacity':'1'
  },1000);
  getStartNumber=index;
};


// 计算最小高度列的索引函数
function getMinIndex(minheight,arr){
  let minindex=arr.indexOf(minheight)
  return minindex
}

// 判断是否在底部的函数
function getBottom(wrap){
  // 获取最后一列的高度和滚动的高度+窗口高度的和，如果长的一列的高度比窗口+滚动的高度要小，说明到底了需要追加
  let documentHeight=$(window).height();
  let scrollHeight=$(window).scrollTop();
  let boxes = wrap.children('div')
  let lastboxTop=boxes.eq(boxes.length-1).offset().top;
  let lastboxHeight=boxes.eq(boxes.length-1).height()+20;
  let totalHeight=lastboxHeight+lastboxTop
  return documentHeight+scrollHeight>=totalHeight?true:false;
}

// 追加瀑布流效果
function appendBox(wrap,boxes){
  // 先判断是否展示到了底部
  if(getBottom(wrap)){
    for (i in data){
      let addstr="<div class='item'> <img src='images/"+data[i].src+"' alt=''> </div>"
      wrap.append(addstr)
    }
  }else{
    return false
  }
  waterfall(wrap,wrap.children('div'))
}
