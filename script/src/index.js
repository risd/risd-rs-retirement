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

const slickConf = {
  infinite: true,
  mobileFirst: true,
  slidesToShow: 1,
  centerMode: false,
  variableWidth: true,
  centerPadding: '53px',
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
  additionalLeftOffset: function ( slick ) {
    let additionalLeftOffset = 0
    if ( window.innerWidth > maxColumnWidth && slick.slideCount > 3 ) {
      additionalLeftOffset = ( ( window.innerWidth - maxColumnWidth ) / 2 ) - cardGutter
    }
    return additionalLeftOffset
  },
}

$( '.timeline--slider' ).slick( slickConf )

unslick()
reslick()
setCardGutterMobile()

$( window ).resize( function () {
  unslick()
  reslick()
  setCardGutterMobile()
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

function setCardGutterMobile () {
  let cardGutterMobile = ( window.innerWidth - cardWidth )
  cardGutterMobile = Math.min( cardGutterMobile, cardGutter )
  $( '.timeline__card' ).css( '--card-gutter-mobile', cardGutterMobile + 'px' )
}
