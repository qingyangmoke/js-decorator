const delegator = require('../src/index');

class Request {
  constructor() {
    this.url = '/index.html';
    this.name = 'sssss';
    this.headers = {
      host: 'localhost:3001',
      connection: 'keep-alive',
      'user-agent': 'useragent',
      accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
      referer: 'http://localhost:3001/',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      say() {
        return 'headers';
      },
    };
  }
  say() {
    return 'hello';
  }
}

class HttpRequest {
  constructor(req) {
    this.req = req;
  }
  getHeader(name) {
    return this.req.headers[name] || '';
  }
}

delegator(HttpRequest.prototype, 'req')
  .method('say')
  .setter('name')
  .getter('url');

delegator(HttpRequest.prototype, function () {
  return this.req.headers;
}).getter('user-agent', 'userAgent')
  .getter('accept')
  .method('say', 'headerSay')
  .getter('referer')
  .property('accept-encoding', 'encoding')
  .getter('host');

const request = new Request();
const httpRequest = new HttpRequest(request);

describe('methods:', function () {
  describe('#obj.say()', function () {
    it('say', function () {
      assert.equal(httpRequest.say(), request.say());
    });
  });
});

describe('string target:', function () {
  describe('#getter', function () {
    it('url', function () {
      assert.equal(httpRequest.url, request.url);
    });
  });
  describe('#setter', function () {
    it('name', function () {
      httpRequest.name = 'abc';
      assert.equal(request.name, 'abc');
    });
  });
  describe('#method', function () {
    it('say', function () {
      assert.equal(httpRequest.say(), request.say());
    });
  });
});

describe('function target:', function () {
  describe('#getter', function () {
    it('userAgent', function () {
      assert.equal(httpRequest.userAgent, request.headers['user-agent']);
    });
    it('accept', function () {
      assert.equal(httpRequest.accept, request.headers['accept']);
    });
  });
  describe('#setter', function () {
    it('name', function () {
      httpRequest.name = 'abcd';
      assert.equal('abcd', request.name);
    });
  });
  describe('#property', function () {
    it('accept-encoding getter', function () {
      assert.equal(httpRequest.encoding, request.headers['accept-encoding']);
    });
    it('accept-encoding setter', function () {
      httpRequest.encoding = 'utf-8';
      assert.equal(httpRequest.encoding, request.headers['accept-encoding']);
    });
  });
  describe('#method', function () {
    it('headerSay', function () {
      assert.equal(httpRequest.headerSay(), request.headers.say());
    });
    it('say', function () {
      assert.notEqual(httpRequest.say(), request.headers.say());
    });
  });
});

// console.log(`url = ${obj.url}`);
// console.log(`userAgent = ${obj.userAgent}`);
// console.log(`host = ${obj.host}`);
// console.log(`accept = ${obj.accept}`);
// console.log(`referer = ${obj.referer}`);
// console.log(`encoding = ${obj.encoding}`);
// obj.encoding = 'utf-8';
// console.log(`encoding = ${obj.encoding}`);

// obj.say();
