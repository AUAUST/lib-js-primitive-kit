import { A } from "~/Array";
import { B } from "~/Boolean";
import { N } from "~/Number";
import { O } from "~/Object";
import { S } from "~/String";

class PrimitiveKit {
  static get A() {
    return A;
  }

  static get B() {
    return B;
  }

  static get N() {
    return N;
  }

  static get O() {
    return O;
  }

  static get S() {
    return S;
  }
}

export default PrimitiveKit;
export { PrimitiveKit, A, B, N, O, S };
