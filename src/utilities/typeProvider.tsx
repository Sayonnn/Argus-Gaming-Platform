// Define the interfaces for each type (Knight, King, Queen)
export interface Knight {
  id: number;
  x: number;
  y: number;
  image: string;
  name: string;
  ranking: number;
  legacy: string;
  journey: string;
  origin: string;
  age: string;
  gender: string;
}

interface King {
  x: number;
  y: number;
  image: string;
  name: string;
  kingdom: string;
  power: number;
}

interface Queen {
  x: number;
  y: number;
  image: string;
  name: string;
  realm: string;
  diplomacy: number;
}

class PropTypeProvider {
  private constructor() {}

  private static instance: PropTypeProvider;

  public static getInstance = (): PropTypeProvider => {
    if (!PropTypeProvider.instance) {
      PropTypeProvider.instance = new PropTypeProvider();
    }
    return PropTypeProvider.instance;
  };

  // Static method to get Knight type
  public static getKnightType(): Knight {
    return {
      id: 0,
      x: 0,
      y: 0,
      image: "",
      name: "",
      ranking: 0,
      legacy: "",
      journey: "",
      origin: "",
      age: "",
      gender: "",
    };
  }

  // Static method to get King type
  public static getKingType(): King {
    return {
      x: 0,
      y: 0,
      image: "",
      name: "",
      kingdom: "",
      power: 0,
    };
  }

  // Static method to get Queen type
  public static getQueenType(): Queen {
    return {
      x: 0,
      y: 0,
      image: "",
      name: "",
      realm: "",
      diplomacy: 0,
    };
  }
}

// Create an instance of the PropTypeProvider singleton
export const PropTypes = PropTypeProvider.getInstance();
