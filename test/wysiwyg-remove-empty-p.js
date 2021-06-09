const test = require( 'tape' )
const removeEmptyPTag = require( '../swig/wysiwyg-remove-empty-p.js' ).removeEmptyPTag

const wysiwyg = `
<p></p>
<p>Fully funded grad student fellowships serve as flagship achievement among substantial gains made in support of student scholarships. Total financial aid increased by 46% during her tenure.
</p>
<p></p>
<p></p>
`.trim()

const output = `
<p>Fully funded grad student fellowships serve as flagship achievement among substantial gains made in support of student scholarships. Total financial aid increased by 46% during her tenure.
</p>
`.trim()

test( 'removes-empty-p', function ( t ) {
  t.plan( 1 )
  
  const result = removeEmptyPTag( wysiwyg )

  t.assert( result === output, 'output matches result' )
} )
