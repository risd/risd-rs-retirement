const test = require( 'tape' )
const appendReadMore = require( '../swig/append-read-more-to-wysiwyg.js' ).appendReadMore

const wysiwyg = `
<p>Fully funded grad student fellowships serve as flagship achievement among substantial gains made in support of student scholarships. Total financial aid increased by 46% during her tenure.
</p>
`.trim()

const link = "https://www.risd.edu/news/stories/risd-launches-fellowship-program-supporting-grad-students"

const output = `
<p>Fully funded grad student fellowships serve as flagship achievement among substantial gains made in support of student scholarships. Total financial aid increased by 46% during her tenure.
<span class="timeline__card-body-space"> </span><span class="timeline__card-body-read-more">Read more</span></p>
`.trim()

test( 'appends-link', function ( t ) {
  t.plan( 1 )
  
  const result = appendReadMore( wysiwyg, link )

  t.assert( result === output, 'output matches result' )
} )
