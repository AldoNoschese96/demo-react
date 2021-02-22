import Context from "./Context";
import useGlobaState from "./useGlobalState";

const GlobaStateProvider = ({ children }) => {
  return (
    <Context.Provider value={useGlobaState()}>{children}</Context.Provider>
  );
};

export default GlobaStateProvider;
