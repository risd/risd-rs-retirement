module.exports = {
  replace: function ( str, find, replace ) {
    if ( typeof str !== 'string' ) return ''
    return str.replace( new RegExp( find, 'g' ), replace )
  }
}
