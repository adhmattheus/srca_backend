export default class ExtendableError extends Error {
  // public __proto__: Error;

  constructor(message: string) {
    // const trueProto = new.target.prototype;
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    // this.__proto__ = trueProto;
    this.name = this.constructor.name;
  }
}
