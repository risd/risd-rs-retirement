const $ = require( 'jquery' )
require( './slick.js' )
require( 'lity' )


/*

| 327px | 53px | 327px | 53px | 327px |
( 327 * 3 ) + ( 53 * 2 ) = 1087

| 327px | 53px | 327px |
( 327 * 2 ) + 53 = 707

 */
const cardWidthSmall = 286
const cardGutterSmall = 10
const cardWidth = 327
const cardGutter = 53
const maxColumnWidth = ( cardWidth * 3 ) + ( cardGutter * 2 )
const touchMargin = () => {
  return Math.max( window.innerWidth * 0.1, 60 )
}

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
    // no additional offset on no-touch devices
    if ( DEVICE_HAS_TOUCH === false ) return 0

    let additionalLeftOffset = 0
    if ( window.innerWidth < maxColumnWidth &&
         window.innerWidth > 582 ) {
      additionalLeftOffset = touchMargin() / 2
    }
    else if ( window.innerWidth >= maxColumnWidth &&
              slick.slideCount > 3  ) {
      additionalLeftOffset = ( ( window.innerWidth - maxColumnWidth ) / 2 )
    }
    return additionalLeftOffset
  },
  prevArrow: slickPrevArrow(),
  nextArrow: slickNextArrow(),
    responsive: [
    {
      breakpoint: 582,
      settings: {
        slidesToShow: 2,
        centerMode: false,
        variableWidth: true,
      },
    },
    {
      breakpoint: 878,
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
    // get the total button width. there are no buttons
    // we are on a touch device, and we can 
    let totalButtonWidth = buttonWidth
      ? buttonWidth * 2
      : touchMargin()
    // this represents the width that the fully showing cards will be displayed
    let cardListWidth = Math.ceil( window.innerWidth - totalButtonWidth )
    if ( ( window.innerWidth >= 327 ) &&
         ( cardListWidth < ( cardWidthSmall + cardGutterSmall + cardWidthSmall ) ) &&
         ( slick.slideCount > 1 ) ) {
      console.log( '1-up-medium' )
      slick.options.centerMode = true;
      let cardWidth = cardListWidth
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', '10px' )
      // $el.find( '.timeline__card-container' )
      //   .css( 'padding-left', `${ cardGutterSmall / 2 }px` )
      //   .css( 'padding-right', `${ cardGutterSmall / 2 }px` )
    }
    else if ( ( cardListWidth >= ( cardWidthSmall + cardGutterSmall + cardWidthSmall ) ) &&
              ( cardListWidth < ( cardWidthSmall + cardGutterSmall + cardWidthSmall + cardGutterSmall + cardWidthSmall ) ) &&
              ( slick.slideCount > 1 ) ) {
      console.log( '2-up' )
      slick.options.centerMode = false;
      let cardWidth = Math.ceil( cardListWidth / 2 - 10 )
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', `${ cardGutterSmall }px` )
      // $el.find( '.timeline__card-container' )
      //   .css( 'padding-left', '0px' )
      //   .css( 'padding-right', `${ cardGutterSmall }px` )
    }
    else if ( ( cardListWidth >= ( cardWidthSmall + cardGutterSmall + cardWidthSmall + cardGutterSmall + cardWidthSmall ) ) &&
              ( cardListWidth < maxColumnWidth ) &&
              ( slick.slideCount > 1 ) ) {
      console.log( '3-up-tight' )
      slick.options.centerMode = false;
      let cardWidth = Math.ceil( ( cardListWidth - ( 10  * 2 ) ) / 3 )
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', `${ cardGutterSmall }px` )
      // $el.find( '.timeline__card-container' )
      //   .css( 'padding-left', '0px' )
      //   .css( 'padding-right', `${ cardGutterSmall }px` )
    }
    else if ( ( cardListWidth >= maxColumnWidth ) ) {
      console.log( '3-up-loose' )
      slick.options.centerMode = false;
      let cardWidth = 327
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', cardGutter + 'px' )
      // $el.find( '.timeline__card-container' )
      //   .css( 'padding-left', '0px' )
      //   .css( 'padding-right', `${ cardGutter }px` )
    }
  } )
  .slick( slickConf )

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