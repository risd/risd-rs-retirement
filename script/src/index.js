const $ = require( 'jquery' )
require( './slick.js' )
require( 'lity' )


/*

| 327px | 53px | 327px | 53px | 327px |
( 327 * 3 ) + ( 53 * 2 ) = 1087

| 327px | 53px | 327px |
( 327 * 2 ) + 53 = 707

 */

const cardWidth = 327
const cardGutter = 53
const maxColumnWidth = ( cardWidth * 3 ) + ( cardGutter * 2 )

let DEVICE_HAS_TOUCH = false

if ( 'ontouchstart' in window ) {
  $( 'body' ).addClass( 'device-has-touch' )
  DEVICE_HAS_TOUCH = true
}
else {
  $( 'body' ).addClass( 'device-has-no-touch' )
}

const slickConf = {
  infinite: true,
  mobileFirst: true,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,
  centerPadding: '0px',
  arrows: DEVICE_HAS_TOUCH ? false : true,
  additionalLeftOffset: function ( slick ) {
    let additionalLeftOffset = 0
    if ( window.innerWidth > maxColumnWidth &&
         slick.slideCount > 3 &&
         $( 'body' ).hasClass( 'device-has-touch' ) ) {
      additionalLeftOffset = ( ( window.innerWidth - maxColumnWidth ) / 2 )
    }
    return additionalLeftOffset
  },
  prevArrow: slickPrevArrow(),
  nextArrow: slickNextArrow(),
    responsive: [
    {
      breakpoint: 707,
      settings: {
        slidesToShow: 2,
        centerMode: false,
        variableWidth: true,
      },
    },
    {
      breakpoint: 1087,
      settings: {
        slidesToShow: 3,
        centerMode: false,
        variableWidth: true,
      },
    },
  ],
}

$( '.timeline--slider' )
  .on( 'setPositionStart', function ( event, slick ) {
    console.log( 'set-position-start' )
    let $el = $( this )
    let buttonWidth = $( '.slick-prev' ).outerWidth()
    buttonWidth = buttonWidth
      ? buttonWidth
      : window.innerWidth * 0.15
    let totalButtonWidth = buttonWidth * 2
    let cardListWidth = Math.ceil( window.innerWidth - totalButtonWidth )
    if ( ( window.innerWidth > 327 ) &&
         ( cardListWidth < ( 286 + 10 + 286 ) ) &&
         ( slick.slideCount > 1 ) ) {
      console.log( '1-up' )
      slick.options.centerMode = true;
      let cardWidth = cardListWidth
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', '10px' )
      $el.find( '.timeline__card-container' )
        .css( 'padding-left', '5px' )
        .css( 'padding-right', '5px' )
    }
    else if ( ( cardListWidth >= ( 286 + 10 + 286 ) ) &&
              ( cardListWidth < ( 286 + 10 + 286 + 10 + 286 ) ) &&
              ( slick.slideCount > 1 ) ) {
      console.log( '2-up' )
      slick.options.centerMode = false;
      let cardWidth = Math.ceil( cardListWidth / 2 - 10 )
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', '10px' )
      $el.find( '.timeline__card-container' )
        .css( 'padding-left', '0px' )
        .css( 'padding-right', '10px' )
    }
    else if ( ( cardListWidth >= ( 286 + 10 + 286 + 10 + 286 ) ) &&
              ( cardListWidth < maxColumnWidth ) &&
              ( slick.slideCount > 1 ) ) {
      console.log( '3-up-tight' )
      slick.options.centerMode = false;
      let cardWidth = Math.ceil( ( cardListWidth - ( 10  * 2 ) ) / 3 )
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', '10px' )
      $el.find( '.timeline__card-container' )
        .css( 'padding-left', '0px' )
        .css( 'padding-right', '10px' )
    }
    else if ( ( cardListWidth >= maxColumnWidth ) ) {
      console.log( '3-up-loose' )
      slick.options.centerMode = false;
      let cardWidth = 327
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', cardGutter + 'px' )
      $el.find( '.timeline__card-container' )
        .css( 'padding-left', '0px' )
        .css( 'padding-right', '53px' )
    }
  } )
  .slick( slickConf )

unslick()
reslick()

$( window ).resize( function () {
  unslick()
  reslick()
} )

function unslick () {
  $( '.slick-slider' ).each( function ( index ) {
    let $el = $( this )
    let slideCount = $el.attr( 'data-card-count' )
        ? parseInt( $el.attr( 'data-card-count' ) )
        : 0
    if ( slideCount === 0 || isNaN( slideCount ) ) return
    let slickWidth = ( slideCount * cardWidth ) + ( ( slideCount - 1 ) * cardGutter )
    if ( slickWidth < window.innerWidth && slickWidth <= maxColumnWidth ) {
      $el.addClass( 'timeline--unslicked' )
    }
  } )
}

function reslick () {
  $( '.timeline--unslicked' ).each( function ( index ) {
    let $el = $( this )
    let slideCount = $el.attr( 'data-card-count' )
      ? parseInt( $el.attr( 'data-card-count' ) )
      : 0
    if ( slideCount === 0 || isNaN( slideCount ) ) return
    let slickWidth = ( slideCount * cardWidth ) + ( ( slideCount - 1 ) * cardGutter )
    if ( slickWidth > window.innerWidth ) {
      $el.removeClass( 'timeline--unslicked' )
    }
  } )
}

function slickPrevArrow () {
  return `
    <button class="slick-prev" aria-label="Previous" type="button">
      <div class="slick-arrow-text slick-prev-text"><</div>
    </button>
  `.trim()
}
function slickNextArrow () {
  return `
    <button class="slick-next" aria-label="Next" type="button">
      <div class="slick-arrow-text slick-next-text">></div>
    </button>
  `.trim()
}