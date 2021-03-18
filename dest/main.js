$(document).ready(function () {

 /*    $(".title").on('click', function () {
  
      $(this).siblings().slideToggle();
      $(this).toggleClass('active')
      console.log(12)
  
  
  
    }) */
  
   /*  $(".li").click(function () {
      
    }); */
  
  
   /*  $(document).on('keypress', 'input[name="skill"]', function (e) {
  
      if (e.keyCode == 13) {
        let value = $(this).val();
        let htmlTag = '<p>' + value + ' <span class="remove">x</span></p>';
        $('.addon .addon__container').append(htmlTag)
        $(this).val('');
      }
    }) */
    $(document).on('click', '.remove', function () {
      $(this).parent().remove();
    })


  /* ======================back2top========== */

  $('.uparrow').on('click',function(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  })

  /* ================btn-menu active nav bar=========== */
  $('.nav').on('click',function(e){
    e.stopPropagation();
  $('nav').slideToggle();
  })
  $(document).on('click',function(){
    $('nav').slideUp();
  })

/* --------------text menu--------- */

let sectionName =$('section').attr('class');
let menuText =$('.header__menu-options .'+sectionName);
menuText.addClass('active');
  


  
    /* ===========validate form========== */
  
    let name = $('input[name="name"]');
    let email = $('input[name="email"]');
    let phone = $('input[name="phone"]');
    let confirmBtn = $('.form-btn');
  
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
  
    let error = {
      name: [],
      email: [],
      phone: []
    }
    let ok ={
      name:[],
      email:[],
      phone:[]
    }
  
    /* --------------kiểm tra lỗi khi click confirm----------- */
    confirmBtn.on('click', function () {
      if (name.val().length <= 2) {
        error.name.push('Invalid name')
        //  name.parent().append('<p class="error">' + error.name + '</p>')
      }else{
        ok.name.push('Valid name')
      }
      
      if (!isEmail(email.val())) {
        error.email.push('Invalid email')
        //  email.parent().append('<p class="error">' + error.email + '</p>')
      } else{
        ok.email.push('Valid email')
      }
      if (phone.val().length <= 10 || phone.val().length > 11) {
        error.phone.push('Invalid phone number')
        //phonenum.parent().append('<p class="error">' + error.phonenum + '</p>')
      } else{
        ok.phone.push('Valid phone number')
      }
  console.log(error);
      /* -----------báo lỗi khi xảy ra lỗi---------- */
      let success = true;
  
      for (let index in error) {
  
        if (error[index].length > 0) {
          success = false;
          $('input[name="' + index + '"]').parent().find('.error').remove();
          let htmlError = '<div class="error"><p style="color:red">' + error[index][0] + '</p> </div>'
  
          $('input[name="' + index + '"]').parent().prepend(htmlError);
        }
      }
      for(let i in ok){
        if(ok[i].length>0){
          success = true;
          $('input[name="' + i + '"]').parent().find('.error').remove();
          let htmlOk = '<div class="error"><p style="color:green">' + ok[i][0] + '</p> </div>'
  
          $('input[name="' + i + '"]').parent().prepend(htmlOk);

        }
      }
  
    })
  
    /* ------------ajax------------ */
  
    $.ajax({
      type: "GET",
      url: "http://zuzo.xyz/api/v1/regions",
  
      success: function (response) {
        response.data.forEach(function(item) {
          
          let regionOpt = '<option value="' +item.id+ '">'+item.name + '</option>'
          $('select[name="region"]').append(regionOpt)
        });
      }
  
      
    });
  
    $('select[name="region"]').change(function(){
      $('select[name="ward"]').children().remove()
      $.ajax({
        type: "GET",
        url: 'http://zuzo.xyz/api/v1/regions/'+$(this).val()+'/cities',
    
        success: function (response) {
          response.data.forEach(function(item) {
           
            let wardOpt = '<option >'+item.name + '</option>'
            $('select[name="ward"]').append(wardOpt)
          });
        }
      });
    })
    
  let $gal = $('.proDetail__item-img');
  $gal.flickity({
    cellAlign:'left',
    contain:true,
    wrapAround:true
  
  })
 /*  let $carousel = $('.studioDetails-img ');
  $carousel.flickity({
    cellAlign:'left',
    contain :true,
    wrapAround:true
  })
   let $studioM = $('.studioMobile-img');
 $studioM.flickity({
  cellAlign:'left',
  contain :true,
  wrapAround:true
}) */
  })
  $(document).ready(function () {
    var initPhotoSwipeFromDOM = function (gallerySelector) {
        var parseThumbnailElements = function (el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
            for (var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element
                if (figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0]; // <a> element
                size = linkEl.getAttribute('data-size').split('x');
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
                if (figureEl.children.length > 1) {
                    item.title = figureEl.children[1].innerHTML;
                }
                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }
                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };
        var onThumbnailsClick = function (e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            var clickedListItem = closest(eTarget, function (el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if (!clickedListItem) {
                return;
            }
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }
                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if (index >= 0) {
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };
        var photoswipeParseHash = function () {
            var hash = window.location.hash.substring(1),
                params = {};
            if (hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }
            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;
            items = parseThumbnailElements(galleryElement);
            options = {
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function (index) {
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                },
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };
            if (fromURL) {
                if (options.galleryPIDs) {
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            if (isNaN(options.index)) {
                return;
            }
            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        var galleryElements = document.querySelectorAll(gallerySelector);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };


    initPhotoSwipeFromDOM('.gallery');

});
  