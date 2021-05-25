const cheerio = require( 'cheerio' )

module.exports = {
  appendReadMore: function appendReadMoreToWysiwyg ( wysiwyg, link ) {
    if ( ! wysiwyg ) return ''
    if ( ! link ) return wysiwyg

    const rootId = 'wrapper'
    const rootQuery = `div#${ rootId }`
    const $ = cheerio.load( `<div id="${ rootId }">${ wysiwyg }</div>` )
    
    $( `${ rootQuery } p:last-child` ).each( insertReadMore )

    return $( rootQuery ).html().trim()

    function insertReadMore ( index, pTag ) {
      $( pTag ).append( `<span class="timeline__card-body-space"> </span>` )
      $( pTag ).append( `<span class="timeline__card-body-read-more">Read more</span>` )
    }
  },
}
