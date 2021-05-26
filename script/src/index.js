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
const cardWidthDesktop = 327
const cardGutterDesktop = 53
const maxColumnWidth = ( cardWidthDesktop * 3 ) + ( cardGutterDesktop * 2 )
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

    /* --- set card width & gutter : start --- */

    let buttonWidth = $( '.slick-prev' ).outerWidth()

    // get the total button width. there are no buttons
    // we are on a touch device, and we can 
    let totalButtonWidth = buttonWidth
      ? buttonWidth * 2
      : touchMargin()

    // this represents the width that the fully showing cards will be displayed
    let cardListWidth = Math.ceil( window.innerWidth - totalButtonWidth )

    // scalers for card type
    let headerScaler = scaleLinear()
      .domain( [ cardWidthDesktop, cardWidthDesktop ] )
      .range( [ 21, 28 ] )
    let bodyScaler = scaleLinear()
      .domain( [ cardWidthDesktop, cardWidthDesktop ] )
      .range( [ 18, 24 ] )
    
    // set `cardWidth` depending on the number of cards visible
    let cardWidth;
    if ( ( cardListWidth < ( cardWidthSmall + cardGutterSmall + cardWidthSmall ) ) &&
         ( slick.slideCount > 1 ) ) {
      console.log( '1-up' )
      slick.options.centerMode = true;
      cardWidth = cardListWidth
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', `${ cardGutterSmall }px` )
      $el.find( '.timeline__card-container' )
        .css( 'padding-left', `${ cardGutterSmall / 2 }px` )
        .css( 'padding-right', `${ cardGutterSmall / 2 }px` )

      let scalerDomain = [ cardWidthDesktop, ( cardWidthSmall * 2 + cardGutterSmall - 1 ) ]
      bodyScaler.domain( scalerDomain )
      headerScaler.domain( scalerDomain )
    }
    else if ( ( cardListWidth >= ( cardWidthSmall + cardGutterSmall + cardWidthSmall ) ) &&
              ( cardListWidth < ( cardWidthSmall + cardGutterSmall + cardWidthSmall + cardGutterSmall + cardWidthSmall ) ) &&
              ( slick.slideCount > 1 ) ) {
      console.log( '2-up' )
      slick.options.centerMode = false;
      cardWidth = Math.ceil( ( cardListWidth - ( cardGutterSmall * 2 ) ) / 2 )
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', `${ cardGutterSmall }px` )
      $el.find( '.timeline__card-container' )
        .css( 'padding-left', `${ cardGutterSmall / 2 }px` )
        .css( 'padding-right', `${ cardGutterSmall / 2 }px` )

      let scalerDomain = [ cardWidthDesktop, ( ( cardWidthSmall * 3 - 1 ) / 2 ) ]
      bodyScaler.domain( scalerDomain )
      headerScaler.domain( scalerDomain )
    }
    else if ( ( cardListWidth >= ( cardWidthSmall + cardGutterSmall + cardWidthSmall + cardGutterSmall + cardWidthSmall ) ) &&
              ( cardListWidth < maxColumnWidth ) &&
              ( slick.slideCount > 1 ) ) {
      console.log( '3-up-tight' )
      slick.options.centerMode = false;
      cardWidth = Math.ceil( ( cardListWidth - ( cardGutterSmall  * 2 ) ) / 3 )
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', `${ cardGutterSmall }px` )
      $el.find( '.timeline__card-container' )
        .css( 'padding-left', `0px` )
        .css( 'padding-right', `${ cardGutterSmall }px` )
    }
    else if ( ( cardListWidth >= maxColumnWidth ) ) {
      console.log( '3-up-loose' )
      slick.options.centerMode = false;
      cardWidth = cardWidthDesktop
      $( '.timeline' )
        .css( '--card-width', cardWidth + 'px' )
        .css( '--card-gutter', cardGutterDesktop + 'px' )
      $el.find( '.timeline__card-container' )
        .css( 'padding-left', `0px` )
        .css( 'padding-right', `${ cardGutterDesktop }px` )
    }

    let headerSizeAdjusted = headerScaler( cardWidth )
    let bodySizeAdjusted = bodyScaler( cardWidth )

    $el.find( '.timeline__card-header p' )
      .css( 'font-size', `${ headerSizeAdjusted }px` )

    $el.find( '.timeline__card-body p' )
      .css( 'font-size', `${ bodySizeAdjusted }px` )

    /* --- set card width & gutter : end --- */

    /* --- set card header & body height : start --- */
    // let cardHeaderHeight = 0

    // $el.find( '.timeline__card-header' )
    //   .each( function ( index ) {
    //     let $header = $( this )
    //     let currentHeight = $header.outerHeight()
    //     if ( currentHeight > cardHeaderHeight ) {
    //       cardHeaderHeight = currentHeight
    //     }
    //   } )
    //   .css( '--card-header-height', `${ cardHeaderHeight }px` )

    // let cardBodyHeight = 0
    
    // $el.find( '.timeline__card-body' )
    //   .each( function ( index ) {
    //     let $body = $( this )
    //     let currentHeight = $body.outerHeight()
    //     if ( currentHeight > cardBodyHeight ) {
    //       cardBodyHeight = currentHeight
    //     }
    //   } )
    //   .css( '--card-body-height', `${ cardBodyHeight }px` )
    /* --- set card header & body height : end --- */
    
    /* --- set min card height : start --- */

    let minCardHeight = 0

    $el.find( '.timeline__card' )
      .each( function ( index ) {
        let $card = $( this )
        let currentHeight = $card.outerHeight()
        if ( currentHeight > minCardHeight ) {
          minCardHeight = currentHeight
        }
      } )
      .css( '--min-card-height', `${ minCardHeight }px` )

    /* --- set min card height : end --- */
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

function scaleLinear () {

  let _domain = [ 0, 1 ]
  let _range = [ 0, 1 ]
  
  function scale ( toScale ) {
    // clamp results
    if ( toScale <= _domain[ 0 ] ) return _range[ 0 ]
    if ( toScale > _domain[ 1 ] ) return _range[ 1 ]

    let scaledRatio = toScale / _domain[ 1 ]
    let rangeDiff = _range[ 1 ] - _range[ 0 ]

    return scaledRatio * rangeDiff + _range[ 0 ]
  }

  scale.domain = function ( domain ) {
    _domain = domain
    return scale
  }

  scale.range = function ( range ) {
    _range = range
    return scale
  }

  return scale
}