describe('PathInfo', function () {

    it('Basic properties', function () {
        var pathInfo = PathInfo();

        expect(pathInfo, 'to have properties', [
            'absolutePath',
            'dirName',
            'fileName',
            'path'
        ]);
    });

});
