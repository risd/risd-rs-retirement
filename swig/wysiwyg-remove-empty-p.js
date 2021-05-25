const cheerio = require( 'cheerio' )

module.exports = {
  removeEmptyPTag: function wysiwygRemoveEmptyPTag ( wysiwyg, link ) {
    if ( ! wysiwyg ) return ''

    const rootId = 'wrapper'
    const rootQuery = `div#${ rootId }`
    const $ = cheerio.load( `<div id="${ rootId }">${ wysiwyg }</div>` )

    $( `${ rootQuery } p` ).each( removeEmptyPTag )

    return $( rootQuery ).html().trim()

    function removeEmptyPTag ( index, pTag ) {
      var pContent = $( pTag ).html().trim()
      if ( pContent === '<br>' || pContent === '' ) {
        $( pTag ).remove()
      }
    }
  },
}
