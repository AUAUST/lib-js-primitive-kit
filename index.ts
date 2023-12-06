import { A } from "~/Array";
import { B } from "~/Boolean";
import { N } from "~/Number";
import { O } from "~/Object";
import { S } from "~/String";

/**
 * PrimitiveKit is a collection of classes that provide useful methods for working with primitive types.
 * It is advised to import the classes directly rather than through the properties of this class.
 */
class PrimitiveKit {
  static get A(): typeof A {
    return A;
  }

  static get B(): typeof B {
    return B;
  }

  static get N(): typeof N {
    return N;
  }

  static get O(): typeof O {
    return O;
  }

  static get S(): typeof S {
    return S;
  }
}

export default PrimitiveKit;
export { PrimitiveKit, A, B, N, O, S };
