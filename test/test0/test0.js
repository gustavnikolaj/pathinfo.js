describe('./test/test0/test0.js', function () {

    it('find the path to this file', function () {
        var pathInfo = PathInfo();

        expect(pathInfo.dirName, 'to match', /\/test\/test0$/);
        expect(pathInfo.fileName, 'to match', /test0\.js$/);
        expect(pathInfo.path, 'to match', /\/test\/test0\/test0\.js$/);

    });

    it('finds the path when called from GETSTATICURL function', function () {
        var pathInfo = GETSTATICURL();

        expect(pathInfo.dirName, 'to match', /\/test\/test0$/);
        expect(pathInfo.fileName, 'to match', /test0\.js$/);
        expect(pathInfo.path, 'to match', /\/test\/test0\/test0\.js$/);
    });

});
