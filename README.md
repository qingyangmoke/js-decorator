# js-decorator
js 装饰器

```js
 npm i js-decorator --save
```

```js
const delegator = require('js-decorator');

class Request {
  constructor() {
    this.url = '/index.html';
    this.name = 'sssss';
    this.headers = {
      host: 'localhost:3001',
      'user-agent': 'useragent',
      'accept-encoding': 'gzip, deflate, br',
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
  .method('say', 'headerSay')
  .property('accept-encoding', 'encoding')
  .getter('host');

const request = new Request();
const httpRequest = new HttpRequest(request);

console.log(httpRequest.say() === request.say())
console.log(httpRequest.name === request.name)
console.log(httpRequest.url === request.url)
console.log(httpRequest.host === request.host)
console.log(httpRequest.userAgent === request.headers['user-agent'])
```