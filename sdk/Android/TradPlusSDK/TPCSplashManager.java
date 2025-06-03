

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import common.BaseCocosPlugin;
import common.ExtraInfo;
import splash.TPSplashAllAdListener;
import splash.TPSplashDownloadListener;
import utils.JsonUtils;
import com.tradplus.ads.base.util.SegmentUtils;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.splash.TPSplash;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TPCSplashManager extends BaseCocosPlugin {
    private final static String TAG = "TradPlusData";

    // 保存广告位对象
    private static Map<String, TPSplash> mTPSplash = new ConcurrentHashMap<>();

    public static void loadWithAdUnitID(String adUnitId, String extra) {
        Log.d(TAG, "loadWithAdUnitID adUnitId:" + adUnitId + ",extra:" + extra);
        TPSplash tpSplash = getTPSplash(adUnitId, extra);

        ExtraInfo extraInfo = ExtraInfo.getExtraInfo(extra);
        if (extraInfo != null) {
            tpSplash.setAutoLoadCallback(extraInfo.isOpenAutoLoadCallback());
        }

        if (tpSplash != null) {
            tpSplash.loadAd(null, extraInfo == null ? 0f : extraInfo.getMaxWaitTime());
        }
    }

    public static void showWithAdUnitID(String adUnitId, String sceneId) {
        Log.d(TAG, "showWithAdUnitID adUnitId:" + adUnitId + ",sceneId:" + sceneId);
        TPSplash tpSplash = getTPSplash(adUnitId);

        if (tpSplash != null) {
            if (tpSplash.isReady()) {
                showSplash(adUnitId, sceneId);

            }
        }
    }

    private static void showSplash(String unitId, String sceneId) {
        getActivity().runOnUiThread(() -> {
            View decorView = getActivity().getWindow().getDecorView();
            if(decorView instanceof ViewGroup){
                TPSplashPopupWindow tpSplashPopupWindow = new TPSplashPopupWindow(getActivity(),(ViewGroup) decorView,unitId,sceneId);
                tpSplashPopupWindow.showAtLocation(decorView,0,0,0);
            }
        });
    }


    public static boolean adReadyWithAdUnitID(String adUnitId) {
        Log.d(TAG, "adReadyWithAdUnitID adUnitId:" + adUnitId);
        TPSplash tpSplash = getTPSplash(adUnitId);

        if (tpSplash != null) {
            return tpSplash.isReady();
        }

        return false;
    }


    public static void entryAdScenarioWithAdUnitID(String adUnitId,String sceneId) {
        Log.d(TAG, "entryAdScenarioWithAdUnitID sceneId:" + sceneId);
        TPSplash tpSplash = getTPSplash(adUnitId);

        if (tpSplash != null) {
            tpSplash.entryAdScenario(sceneId);
        }
    }

    public void setCustomShowData(String adUnitId, String data) {
        TPSplash tpSplash = getTPSplash(adUnitId);

        if (tpSplash != null) {
            tpSplash.setCustomShowData(JSON.parseObject(data));
        }
    }

    public static void setCustomAdInfo(String jsonStr,String adUnitId) {
        Log.d(TAG, "entryAdScenarioWithAdUnitID adUnitId:" + adUnitId);
        SegmentUtils.initPlacementCustomMap(adUnitId, JsonUtils.jsonToMapString(jsonStr));//仅对该广告位有效，会覆盖APP维度设置的规则

    }

    public static TPSplash getTPSplash(String adUnitId) {
        Log.i("tradplus", "adUnitId = " + adUnitId);
        if (TextUtils.isEmpty(adUnitId)) return null;
        return mTPSplash.get(adUnitId);
    }

    private static TPSplash getTPSplash(String adUnitId, String data) {

        Log.i("tradplus", "data = " + data + " mTPSplash = " + mTPSplash);

        ExtraInfo extraInfo = null;
        if (!TextUtils.isEmpty(data)) {
            extraInfo = JSON.parseObject(data, ExtraInfo.class);
        }

        HashMap<String, Object> temp = new HashMap<>();
        TPSplash tpSplash = mTPSplash.get(adUnitId);
        if (tpSplash == null) {
            tpSplash = new TPSplash(getActivity(), adUnitId);
            mTPSplash.put(adUnitId, tpSplash);

            boolean isSimpleListener = extraInfo == null ? false : extraInfo.isSimpleListener();

            tpSplash.setAdListener(new TPSplashAdListener(adUnitId));
            if (!isSimpleListener) {

                tpSplash.setAllAdLoadListener(new TPSplashAllAdListener(adUnitId));
                tpSplash.setDownloadListener(new TPSplashDownloadListener(adUnitId));

            }

        }
//        LogUtil.ownShow("map params = "+params);
//        // 同一个广告位每次load参数不一样，在下面设置
        if (extraInfo != null) {

            if (extraInfo.getLocalParams() != null) {
                temp = (HashMap<String, Object>) extraInfo.getLocalParams();
            }
            if (!TextUtils.isEmpty(extraInfo.getCustomData())) {
                temp.put("custom_data", extraInfo.getCustomData());
            }
            if (!TextUtils.isEmpty(extraInfo.getUserId())) {
                temp.put("user_id", extraInfo.getUserId());
            }

            tpSplash.setCustomParams(temp);

            if (extraInfo.getCustomMap() != null) {
                SegmentUtils.initPlacementCustomMap(adUnitId, extraInfo.getCustomMap());
            }
        }

        return tpSplash;
    }

}
