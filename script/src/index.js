const $ = require( 'jquery' )
require( './slick.js' )
require( 'lity' )


let DEVICE_HAS_TOUCH = false

if ( 'ontouchstart' in window ) {
  $( 'body' ).addClass( 'device-has-touch' )
  DEVICE_HAS_TOUCH = true
}
else {
  $( 'body' ).addClass( 'device-has-no-touch' )
}

const cardSizes = {
  width: {
    small: 286,
    desktop: 327,
  },
  gutter: {
    small: 10,
    desktop: 53,
  },
}

const cardGridSizes = {
  twoUpMin: ( cardSizes.width.small * 2 + cardSizes.gutter.small ),
  threeUpMin: ( cardSizes.width.small * 3 ) + ( cardSizes.gutter.small * 2 ),
  threeUpMax: ( cardSizes.width.desktop * 3 ) + ( cardSizes.gutter.desktop * 2 ),
}

// touch margine to use in cases where cards will bleed off the edge
// into this margin
const touchMargin = () => {
  return Math.max( window.innerWidth * 0.1, 60 )
}

const slickConf = {
  infinite: true,
  mobileFirst: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  centerPadding: '0px',
  arrows: DEVICE_HAS_TOUCH ? false : true,
  additionalLeftOffset: additionalLeftOffsetFn,
  prevArrow: slickPrevArrow(),
  nextArrow: slickNextArrow(),
}

$( '.timeline--slider' )
  .on( 'buildOut', setParametersAndDisplay )
  .on( 'setPositionStart', setParametersAndDisplay )
  .slick( slickConf )

function additionalLeftOffsetFn ( slick ) {
  // this function will run within the context of the
  // `getLeft` function, which gets the left position
  // of the current slick track. this offset is subtracted
  // from that value in order to change where the left
  // alignment occures
  
  // in this case, we want a more space left of the first card
  // on devices that have touch in order to allow cards to
  // bleed in off the edge of the screen
  
  // no additional offset on no-touch devices
  if ( DEVICE_HAS_TOUCH === false ) return 0

  let additionalLeftOffset = 0
  if ( window.innerWidth < cardGridSizes.threeUpMax &&
       window.innerWidth > cardGridSizes.twoUpMin ) {
    additionalLeftOffset = touchMargin() / 2
  }
  else if ( window.innerWidth >= cardGridSizes.threeUpMax &&
            slick.slideCount > 3  ) {
    additionalLeftOffset = ( ( window.innerWidth - cardGridSizes.threeUpMax ) / 2 )
  }
  return additionalLeftOffset
}

function setParametersAndDisplay ( event, slick ) {
  // `buildOut` is run just after the `slick.slideCount` is
  //  stored, and just before the initial build of the
  //  slider starts. running this function allows dynamic
  //  `slick.options` to be set before the build starts
  // `setPositionStart` is run at:
  // - orientation change
  // - window resize
  // it runs before all slider positions are set, and is
  // a useful hook for adjusting all slider item sizes in
  // anticipation of being redrawn within the new context.
  // this also relies on `slick.refresh` being run after
  // in order to rerender in the context of the new
  // `slick.options` set within this function

  let $el = $( this )

  /* --- set card & gutter : start --- */

  let buttonWidth = $( '.slick-prev' ).outerWidth()

  // get the total button width. there are no buttons
  // we are on a touch device, so use `touchMargin` to
  // allow for space on either side of the timeline for
  // cards to bleed onto the page
  let totalButtonWidth = buttonWidth
    ? buttonWidth * 2
    : touchMargin()

  // this represents the width that the fully showing cards will be displayed
  let cardListWidth = Math.ceil( window.innerWidth - totalButtonWidth )

  // scalers for card type
  let headerScaler = scaleLinear()
    .domain( [ cardSizes.width.desktop, cardSizes.width.desktop ] )
    .range( [ 21, 28 ] )
  let bodyScaler = scaleLinear()
    .domain( [ cardSizes.width.desktop, cardSizes.width.desktop ] )
    .range( [ 18, 24 ] )
  
  // set depending on the number of cards visible
  let cardWidth
  let cardGutter
  let cardGutterLeft
  let cardGutterRight
  if ( ( cardListWidth < cardGridSizes.twoUpMin ) &&
       ( slick.slideCount > 1 ) ) {
    slick.options.centerMode = true
    slick.options.slidesToShow = 1
    slick.options.infinite = slick.slideCount > 1 ? true : false

    cardWidth = cardListWidth
    cardGutter = cardSizes.gutter.small
    cardGutterLeft = cardSizes.gutter.small / 2
    cardGutterRight = cardSizes.gutter.small / 2

    let scalerDomain = [ cardSizes.width.desktop, ( cardSizes.width.small * 2 + cardSizes.gutter.small - 1 ) ]
    bodyScaler.domain( scalerDomain )
    headerScaler.domain( scalerDomain )
  }
  else if ( ( cardListWidth >= cardGridSizes.twoUpMin ) &&
            ( cardListWidth < cardGridSizes.threeUpMin ) &&
            ( slick.slideCount > 1 ) ) {
    slick.options.centerMode = false
    slick.options.slidesToShow = 2
    slick.options.infinite = slick.slideCount > 2 ? true : false

    cardWidth = Math.ceil( ( cardListWidth - ( cardSizes.gutter.small * 2 ) ) / 2 )
    cardGutter = cardSizes.gutter.small
    cardGutterLeft = cardSizes.gutter.small / 2
    cardGutterRight = cardSizes.gutter.small / 2

    let scalerDomain = [ cardSizes.width.desktop, ( ( cardSizes.width.small * 3 - 1 ) / 2 ) ]
    bodyScaler.domain( scalerDomain )
    headerScaler.domain( scalerDomain )
  }
  else if ( ( cardListWidth >= cardGridSizes.threeUpMin ) &&
            ( cardListWidth < cardGridSizes.threeUpMax ) &&
            ( slick.slideCount > 1 ) ) {
    slick.options.centerMode = false
    slick.options.slidesToShow = 3
    slick.options.infinite = slick.slideCount > 3 ? true : false

    cardWidth = Math.ceil( ( cardListWidth - ( cardSizes.gutter.small  * 2 ) ) / 3 )
    cardGutter = cardSizes.gutter.small
    cardGutterLeft = 0
    cardGutterRight = cardSizes.gutter.small
  }
  else if ( ( cardListWidth >= cardGridSizes.threeUpMax ) ) {
    slick.options.centerMode = false
    slick.options.slidesToShow = 3
    slick.options.infinite = slick.slideCount > 3 ? true : false

    cardWidth = cardSizes.width.desktop
    cardGutter = cardSizes.gutter.desktop
    cardGutterLeft = 0
    cardGutterRight = cardSizes.gutter.desktop
  }

  $( '.timeline' )
    .css( '--card-width', `${ cardWidth }px` )
    .css( '--card-gutter', `${ cardGutter }px` )
  $el.find( '.timeline__card-container' )
    .css( 'padding-left', `${ cardGutterLeft }px` )
    .css( 'padding-right', `${ cardGutterRight }px` )

  let headerSizeAdjusted = headerScaler( cardWidth )
  let bodySizeAdjusted = bodyScaler( cardWidth )

  $( '.timeline__card-header p' )
    .css( '--font-size', `${ headerSizeAdjusted }px` )

  $( '.timeline__card-body p' )
    .css( '--font-size', `${ bodySizeAdjusted }px` )

  /* --- set card & gutter : end --- */

  /* --- set intro : start --- */

  // the intro text breakpoints are set such that between base & small
  // the type can be rendered smaller than the card sizes. this block
  // ensures that type is scaled to the same percent between the intro's
  // base & small type sizes ([22, 28])
  let smallBreakpoint = 512
  if ( window.innerWidth <= smallBreakpoint ) {
    // use one of the type scalers to adjust the intro to the same ratio
    let introScaler = headerScaler
    introScaler.range( [ 22, 28 ] )
    let introSizeAdjusted = introScaler( cardWidth )
    $( '.intro .intro__description p' ).css( '--font-size', `${ introSizeAdjusted }px` )
  }
  else {
    $( '.intro .intro__description p' ).css( '--font-size', '' )
  }

  /* --- set intro : end --- */
  
  /* --- set min card height : start --- */

  let minCardHeight = 0

  $el.find( '.timeline__card' )
    .css( '--min-card-height', '0px' )
    .each( function ( index ) {
      let $card = $( this )
      let currentHeight = $card.outerHeight()
      if ( currentHeight > minCardHeight ) {
        minCardHeight = currentHeight
      }
    } )
    .css( '--min-card-height', `${ minCardHeight }px` )

  /* --- set min card height : end --- */
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

function scaleLinear () {

  let _domain = [ 0, 1 ]
  let _range = [ 0, 1 ]
  
  function scale ( toScale ) {
    // clamp results
    if ( toScale <= _domain[ 0 ] ) return _range[ 0 ]
    if ( toScale > _domain[ 1 ] ) return _range[ 1 ]

    let domainExtent = _domain[ 1 ] - _domain[ 0 ]
    let scaledOffset = toScale - _domain[ 0 ]
    let scaledRatio = scaledOffset / domainExtent
    let rangeExtent = _range[ 1 ] - _range[ 0 ]

    return scaledRatio * rangeExtent + _range[ 0 ]
  }

  scale.domain = function ( domain ) {
    if ( ! domain ) return _domain
    _domain = domain
    return scale
  }

  scale.range = function ( range ) {
    if ( ! range ) return _range
    _range = range
    return scale
  }

  return scale
}