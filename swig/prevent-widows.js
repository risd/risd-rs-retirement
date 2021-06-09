const cheerio = require( 'cheerio' )

module.exports = {
  preventWidows: function preventWidows ( wysiwyg ) {
    if ( ! wysiwyg ) return ''

    const rootId = 'wrapper'
    const rootQuery = `div#${ rootId }`
    const $ = cheerio.load( `<div id="${ rootId }">${ wysiwyg }</div>` )
    
    $( `${ rootQuery } p` ).each( addNonBreakingSpace )

    return $( rootQuery ).html().trim()

    function addNonBreakingSpace ( index, pTag ) {
      let $el = $( pTag )
      var wordArray = $el.html().split( ' ' )
      if ( wordArray.length > 1 ) {
        wordArray[ wordArray.length-2 ] += '&nbsp;' + wordArray[ wordArray.length-1 ]
        wordArray.pop()
        $el.html( wordArray.join( ' ' ) )
      }
    }
  }
}
