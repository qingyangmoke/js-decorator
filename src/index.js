/**
 * 初始化一个装饰器
 * @param {Object} proto - 挂载对象
 * @param {String|Function} target - 原始对象实例
 */
function Decorator(object, target) {
  if (!(this instanceof Decorator)) return new Decorator(object, target);
  this.object = object;
  this.target = target;
}

/**
 * 原始对象实例
 * @param {Object} context - 上下文
 */
Decorator.prototype.getTarget = function (context) {
  return (typeof this.target === 'function')
    ? this.target.call(context)
    : context[this.target];
};

/**
 * 装饰方法
 * @param {String} name - target中的方法名称
 * @param {String} newName - 映射到object的方法名
 * @return {Decorator} 对象本身链式调用
 */
Decorator.prototype.method = function (name, newName) {
  newName = newName || name;
  const _this = this;
  _this.object[newName] = function () {
    const target = _this.getTarget(this);
    return target[name].apply(target, arguments);
  };
  return _this;
};

/**
 * 同时 getter 和 setter
 * @param {String} name - target中的属性名称
 * @param {String} newName - 映射到object的属性名
 * @return {Decorator} 对象本身链式调用
 */
Decorator.prototype.property = function (name, newName) {
  this.getter(name, newName);
  this.setter(name, newName);
  return this;
};

/**
 * getter
 * @param {String} name - target中的属性名称
 * @param {String} newName - 映射到object的属性名
 * @return {Decorator} 对象本身链式调用
 */
Decorator.prototype.getter = function (name, newName) {
  newName = newName || name;
  const _this = this;
  _this.object.__defineGetter__(newName, function () {
    return _this.getTarget(this)[name];
  });
  return _this;
};

/**
 * setter
 * @param {String} name - target中的属性名称
 * @param {String} newName - 映射到object的属性名
 * @return {Decorator} 对象本身链式调用
 */
Decorator.prototype.setter = function (name, newName) {
  newName = newName || name;
  const _this = this;
  _this.object.__defineSetter__(newName, function (val) {
    _this.getTarget(this)[name] = val;
  });
  return _this;
};

/**
 * 装饰器
 */
module.exports = Decorator;
