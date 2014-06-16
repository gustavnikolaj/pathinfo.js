#pathinfo.js

An abandoned spike on finding the name of the javascript file that is
being executed at the moment.

See the tests for examples on what to expect.

The spike was abandoned as the problem it was meant to solve, was
solved in another way.

The main problem with this implementation is that it requires on a
stacktrace library to extract the information, and that it thus is
dependant on the context it's called in. Currently it works as
expected when the method is called directly. If it's inside another
function it will not work as expected as the position in the stack
that the library will look for the name of the file in, is hardcoded.

The package is not published to npm, and it is abandon ware at this
moment.

If you want to pick it up feel free!
