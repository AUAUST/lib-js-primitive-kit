import { A } from "~/Array";
import { B } from "~/Boolean";
import { F } from "~/Function";
import { N } from "~/Number";
import { O } from "~/Object";
import { S } from "~/String";
import { P } from "~/Primitives";

/**
 * PrimitiveKit is a collection of classes that provide useful methods for working with primitive types.
 * It is advised to import the classes directly rather than through the properties of this class.
 */
class PrimitiveKit {
  static get A(): typeof A {
    return A;
  }

  static get F(): typeof F {
    return F;
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

  static get P(): typeof P {
    return P;
  }
}

export default PrimitiveKit;
export { A, B, N, O, P, PrimitiveKit, S };
