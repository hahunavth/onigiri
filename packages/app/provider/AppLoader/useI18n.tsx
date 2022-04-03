import { useEffect } from "react";
import i18n from "i18n-js";

import store from "app/store/store";
import "app/i18n/index";

export default function useI18n() {
  useEffect(() => {
    i18n.locale = store.getState().setting.language;
  }, []);
}
