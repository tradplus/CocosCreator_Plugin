


import android.text.TextUtils;
import android.util.Log;

import common.BaseCocosPlugin;
import common.ExtraInfo;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;

import java.util.HashMap;
import java.util.Map;

public class TTDUID2Manager extends BaseCocosPlugin {
    private final static String TAG = "TradPlusData";

    public static void startUID2(String jsonStr) {
        Log.d(TAG, "startUID2:" + jsonStr);
        ExtraInfo extraInfo = ExtraInfo.getExtraInfo(jsonStr);
        if (extraInfo == null) {
            CocosHelper.runOnGameThread(() -> {
                CocosJavascriptJavaBridge.evalString("window.TTDUID2Manager.TTDUID2Listener.startFinish('{}')");
            });
            return;
        }

        String publicKey = extraInfo.getServerPublicKey();
        String subscriptionId = extraInfo.getSubscriptionID();
        if (TextUtils.isEmpty(subscriptionId) || TextUtils.isEmpty(publicKey)) {
            CocosHelper.runOnGameThread(() -> {
                CocosJavascriptJavaBridge.evalString("window.TTDUID2Manager.TTDUID2Listener.startFinish('')");
            });
            return;
        }

        try {
            Map<String, String> mLocalExtras = new HashMap<>();
            String email = extraInfo.getEmail();
            if(!TextUtils.isEmpty(email)){
                mLocalExtras.put("ttd_email", email);
            }
            String emailHash = extraInfo.getEmailHash();
            if(!TextUtils.isEmpty(emailHash)){
                mLocalExtras.put("ttd_email_hash", emailHash);
            }
            String phone = extraInfo.getPhone();
            if(!TextUtils.isEmpty(phone)){
                mLocalExtras.put("ttd_phone", phone);
            }
            String phoneHash = extraInfo.getPhoneHash();
            if(!TextUtils.isEmpty(phoneHash)){
                mLocalExtras.put("ttd_phone_hash", phoneHash);
            }
            mLocalExtras.put("ttd_test", extraInfo.isTestMode() ? "true" : "false");
            //mLocalExtras.put("ttd_server_url", extraInfo.getCustomServerUrl());
//            com.data.uid2.adapter.TTDUID2Manager.getInstance().startUID2(getActivity(), subscriptionId, publicKey, mLocalExtras,
//                    result ->
//                            CocosHelper.runOnGameThread(() -> {
//                                CocosJavascriptJavaBridge.evalString("window.TTDUID2Manager.TTDUID2Listener.startFinish('" + result + "')");
//                            }));
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            CocosHelper.runOnGameThread(() -> {
                CocosJavascriptJavaBridge.evalString("window.TTDUID2Manager.TTDUID2Listener.startFinish('')");
            });
        }
    }

    public static boolean resetSetting() {
        try {
            Log.d(TAG, "resetSetting:");
//            com.data.uid2.adapter.TTDUID2Manager.getInstance().resetIdentity();
        } catch (Throwable throwable) {
            Log.i(TAG, "Not import uid2 sdk");
        }
        return true;
    }
}
