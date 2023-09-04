$(function () {
 
    let time = 61;
    let timer;
    let chose = 1;
  

    $(".puzzle-box").sortable({
      connectWith: ".puzzle-box",
      containment: ".puzzle-game",
      cursor: "move",
      scroll: false,
      delay: 300,
      start: function (event, ui) {
        if (time == 61) {
          $(".btn-start").trigger("click");
        }
      },
      receive: function (event, ui) {
        if ($(this).attr("value") == "fill") {
          chose = 1;
        } else {
          $(this).attr("value", "fill");
          chose = 0;
        }
      },
      stop: function (event, ui) {
        if (chose) {
          $(this).sortable("cancel");
        } else {
          $(this).removeAttr("value");
        }
      },
    });

    puzzleFill();
  
 
    $(".btn-start").click(() => {
      time = 60;
      $(".btn-start").attr("disabled", true);
      $(".btn-result").removeAttr("disabled");
      timer = setInterval(timerStart, 1000);
    });
    $(".btn-result").click(() => {
      clearInterval(timer);
      $(".modal-time").text(time > 9 ? `00:${time}` : `00:0${time}`);
      modalOpen(1);
    });
    $(".btn-new").click(() => {
      $(".btn-start").removeAttr("disabled");
      $(".countTimer").text("01:00");
      puzzleFill();
    });
  
    $(".btn-closeSure").click(() => {
      timer = setInterval(timerStart, 1000);
      modalClose(1);
    });
    $(".btn-check").click(() => {
      if (gameCheck() == 16) {
        modalChange(1);
      } else {
        modalChange(0);
      }
    });
    $(".btn-closeLose").click(() => modalClose(2));
    $(".btn-closeWin").click(() => modalClose(3));
  
    
    function puzzleFill() {
      let check = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let position;
      for (let i = 0; i < 16; i++) {
        $(".game-start>.puzzle-box").attr("value", "fill");
        $(".game-end>.puzzle-box").removeAttr("value");
        do {
          position = Math.round(Math.random() * 15);
        } while (check[position]);
        $(`.pzl:eq(${i})`).attr("value", `${position + 1}`);
        $(`.game-start>.puzzle-box:eq(${i})`).append($(`.pzl:eq(${i})`));
        check[position] = 1;
      }
      $(".pzl").css("background-image", "url(image/завантаження.jfif)");
    }

    function timerStart() {
      $(".countTimer").text(--time > 9 ? `00:${time}` : `00:0${time}`);
      if (!time) {
        clearInterval(timer);
        if (gameCheck() == 16) {
          modalOpen(3);
        } else {
          modalOpen(2);
        }
      }
    }
   
    function gameCheck() {
      time = 61;
      let checkResult = 0;
      for (let i = 0; i < 16; i++) {
        if ($(`.game-end>.puzzle-box:eq(${i})>.pzl`).attr("value") == i + 1) {
          checkResult++;
        }
      }
      $(".btn-result").attr("disabled", true);
      return checkResult;
    }
  
  
    function modalOpen(num) {
      let alert =
        num == 1 ? ".modal-sure" : num == 2 ? ".modal-lose" : ".modal-win";
      $(".modal").fadeIn(300);
      $(`${alert}`).show();
      $(`${alert}`).animate(
        {
          marginTop: "50px",
        },
        300
      );
    }
    function modalChange(num) {
      $(".modal-sure").hide();
      num
        ? $(".modal-win").css("margin-top", "50px")
        : $(".modal-lose").css("margin-top", "50px");
      num ? $(".modal-win").show() : $(".modal-lose").show();
    }
    function modalClose(num) {
      let alert =
        num == 1 ? ".modal-sure" : num == 2 ? ".modal-lose" : ".modal-win";
      $(`${alert}`)
        .animate(
          {
            marginTop: "0px",
          },
          300
        )
        .fadeOut();
      $(".modal").fadeOut(300);
    }
  });