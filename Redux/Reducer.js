import { SaveToken } from "./action";
import { DeleteToken } from "./action";

const initalTokenStore = {
  SavetokenInStorage: false,
};

export default function Reducer(state = initalTokenStore, action) {
  switch (action.type) {
    case SaveToken:
      return {
        ...state,
        SavetokenInStorage: true,
      };

    case DeleteToken:
      return {
        ...state,
        SavetokenInStorage: false,
      };
    default:
      return state;
  }
}
