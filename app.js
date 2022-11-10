const img = document.querySelector(".img");
let x=-(img.width/2),//當前位置
    y=-(img.height/2),//當前位置
    limit=(img.width-img.offsetParent.offsetWidth)/2,
    showL=-(img.width/2-limit),
    showR=-(img.width/2+limit),
    mouseX = 0,
    tatleMoveX = 0,
    isDown = false,
    dx =0;

// window.onload=()=>{img.style =`top: 50%;left: 50%;transform: translate(${x}px,${y}px);`};//初始化將圖片置中
// window.onresize=()=>{x=-(img.width/2);
//                       y=-(img.height/2);
//                       limit=(img.width-img.offsetParent.offsetWidth)/2;
//                       img.style =`top: 50%;left: 50%;transform: translate(${x}px,${y}px);`;
//                       // console.log(x);
//                       console.log(limit)};
img.addEventListener ( 'mousedown', function(e) {
                                                isDown = true;
                                                mouseX = e.pageX;//點下時滑鼠對於整個頁面的X軸位置
                                                document.addEventListener( 'mousemove', move );  
                                              }
                    );


function move(e) {
  if (isDown) {//如果位於點下的狀態時
              dx = e.pageX - mouseX;//計算當移動新位置-舊位置=滑鼠抓取時移動距離
              if (limit < dx ){
                  dx = limit;
              } else if (-limit > dx) {
                  dx =- limit;
              }
              img.style= `top: 50%;left: 50%;transform: translate( ${ x + dx }px,${ y }px)`;//;當當前圖位置改成當前位置(X)+移動距離(dx)
  }
}

document.addEventListener( 'mouseup' , function(e) {
                                                    if (isDown) {
                                                        x = x + dx;//當前位置更新，新當前位置為舊的位置+移動距離
                                                        dx = 0;//位置已經移動完成，所以將移動距離歸零

                                                        if (x > showL) {//往左滑超出圖片邊界，讓顯示定格在圖片靠容器左側的位置
                                                            x = showL;
                                                            img.style = `top: 50%;left: 50%;transform: translate(${ x }px,${ y }px)`;
                                                        } else if (x < showR) {//往右滑超出圖片邊界，讓顯示定格在圖片靠容器右側的位置
                                                            x = showR;
                                                            img.style = `top: 50%;left: 50%;transform: translate(${x}px,${y}px)`;
                                                        }
                                                      
                                                    }

                                                    isDown = false
                                                    document.removeEventListener( 'mousemove' , move )
                                          }
);

