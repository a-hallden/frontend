import { Provider } from "react-redux";
import initializeStore from "../redux/store";
import withRedux from "next-redux-wrapper";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/globals.css";

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default withRedux(initializeStore)(MyApp);
