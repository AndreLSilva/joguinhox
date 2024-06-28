export class Vector2 {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public static multiply(vector: Vector2, factor: number) {
    return new Vector2(vector.x * factor, vector.y * factor);
  }

  public static get zero() {
    return new Vector2(0, 0);
  }
}
