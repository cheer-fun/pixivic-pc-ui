$(".custom-select").each(function() {
  var classes = $(this).attr("class"),
      id      = $(this).attr("id"),
      name    = $(this).attr("name");
  var template =  '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
      template += '<div class="custom-options">';
      $(this).find("option").each(function() {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
      });
  template += '</div></div>';
  
  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-select-trigger").on("click", function() {
  $('html').one('click',function() {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});

function changeDateBySelect(add, now) {
  console.log(now)
  if (!now) {
    now = date;
  }
  now = now.split('-');
  now[1] = parseInt(now[1]) - 1
  now = new Date(...now);
  add = add || 0;
  page=0;
  switch (selectMode) {
    case 'day':
      now = new Date(now.getTime() + add * 24 * 3600 * 1000);
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();
      return [year, `${month+1}`.padStart(2,0), `${day}`.padStart(2,0)].join('-');
      break;
    case 'week':
      var day = now.getDay();
      day = day === 0 ? -6 : (1 - day);
      now = new Date(now.getTime() + (add * 7 + day) * 24 * 3600 * 1000);
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();
      return [year, `${month+1}`.padStart(2,0), `${day}`.padStart(2,0)].join('-');
      break;
    case 'month':
      var year = now.getFullYear();
      var month = now.getMonth();
      if (add > 0) {
        while (add !== 0) {
          if (month !== 11) {
            month += 1;
          } else {
            year += 1;
            month = 0;
          }
          add -= 1;
        }
      } else {
        while (add !== 0) {
          if (month !== 0) {
            month -= 1;
          } else {
            year -= 1;
            month = 11;
          }
          add += 1;
        }
      }
      return [year, `${month+1}`.padStart(2,0), '01'].join('-');
      break;
  }
}

function select() {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
}

function doSelect() {
  select.call(this);
  selectMode = $(this).data("value");
  date = changeDateBySelect();
  restart();
}
$(".custom-option").on("click", doSelect);
select.apply($("span[data-value='day']")[0]);