import Pusher from "pusher-js/react-native";
import { PUSHER_DETAILS, PUSHER_DETAILS_1 } from "../constants";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../constants/endpoints";
import { invokeApi } from "./dataServices";

let channel = "";
const spiddlePusher = new Pusher(PUSHER_DETAILS_1.key, PUSHER_DETAILS_1);

export const subscribePushed = channel_id => {
  channel = spiddlePusher.subscribe(channel_id);
};

export const pusherNewOrder = callBack => {
  channel.bind(PUSHER_DETAILS.NEW_ORDER_EVENT, newOrder => {
    if (callBack) {
      return callBack(newOrder);
    }
  });
};

export const pusherUpdateOrder = callBack => {
  channel.bind(PUSHER_DETAILS.ORDER_UPDATE_EVENT, newOrder => {
    if (callBack) {
      return callBack(newOrder);
    }
  });
};

export const getRiderUpdate = callBack => {
  channel.bind(PUSHER_DETAILS.RIDER_UPDATE, newOrder => {
    if (callBack) {
      return callBack(newOrder);
    }
  });
};

export const getStoreUpdate = callBack => {
  channel.bind(PUSHER_DETAILS.STORE_TOGGLE, newOrder => {
    if (callBack) {
      return callBack(newOrder);
    }
  });
};

export const getOrderSync = callBack => {
  channel.bind(PUSHER_DETAILS.ORDER_SYNC, newOrder => {
    if (callBack) {
      return callBack(newOrder);
    }
  });
};

export const unBind = () => {
  if (channel && channel.unbind) {
    channel.unbind(PUSHER_DETAILS.NEW_ORDER_EVENT);
    channel.unbind(PUSHER_DETAILS.ORDER_UPDATE_EVENT);
    channel.unbind(PUSHER_DETAILS.RIDER_UPDATE);
    channel.unbind(PUSHER_DETAILS.ORDER_SYNC);
  }
};

export const pushDataChange = (offline_key, action, data) => {
  const payload = {
    action: action || "data updated",
    offline_key: offline_key,
    data: data
  };
  return invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.SYNC}`, "POST", payload);
};
