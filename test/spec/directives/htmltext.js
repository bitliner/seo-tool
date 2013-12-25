'use strict';

describe('Directive: htmlText', function () {

  // load the directive's module
  beforeEach(module('seoToolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<html-text></html-text>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the htmlText directive');
  }));
});
