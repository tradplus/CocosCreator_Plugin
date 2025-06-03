

import android.text.TextUtils;
import android.util.Log;

import common.BaseCocosPlugin;
import common.ExtraInfo;
import interstitial.TPInterstitialAdListener;
import interstitial.TPInterstitialDownloadListener;
import interstitial.TPInterstitialAllAdListener;
import utils.JsonUtils;
import com.tradplus.ads.base.util.SegmentUtils;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.interstitial.TPInterstitial;
import com.tradplus.ads.open.reward.TPReward;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TPCInterstitialManager extends BaseCocosPlugin {
    private final static String TAG = "TradPlusData";

    // 保存广告位对象
    private static Map<String, TPInterstitial> mTPInterstitial = new ConcurrentHashMap<>();

    public static void loadWithAdUnitID(String adUnitId, String extra) {
        Log.d(TAG, "loadWithAdUnitID adUnitId:" + adUnitId + ",extra:" + extra);
        TPInterstitial tpInterstitial = getTPInterstitial(adUnitId, extra);

        ExtraInfo extraInfo = ExtraInfo.getExtraInfo(extra);
        if(extraInfo != null){
            tpInterstitial.setAutoLoadCallback(extraInfo.isOpenAutoLoadCallback());
        }

        if (tpInterstitial != null) {
            tpInterstitial.loadAd(extraInfo == null ? 0f : extraInfo.getMaxWaitTime());
        }
    }

    public static void showWithAdUnitID(String adUnitId, String sceneId) {
        Log.d(TAG, "showWithAdUnitID adUnitId:" + adUnitId + ",sceneId:" + sceneId);
        TPInterstitial tpInterstitial = getTPInterstitial(adUnitId);

        if (tpInterstitial != null) {
            tpInterstitial.showAd(getActivity(), sceneId);
        }

    }


    public static boolean adReadyWithAdUnitID(String adUnitId) {
        Log.d(TAG, "adReadyWithAdUnitID adUnitId:" + adUnitId);
        TPInterstitial tpInterstitial = getTPInterstitial(adUnitId);

        if (tpInterstitial != null) {
            return tpInterstitial.isReady();
        }

        return false;
    }

    public static void setCustomAdInfo(String jsonStr,String adUnitId) {
        Log.d(TAG, "entryAdScenarioWithAdUnitID adUnitId:" + adUnitId);
        SegmentUtils.initPlacementCustomMap(adUnitId, JsonUtils.jsonToMapString(jsonStr));//仅对该广告位有效，会覆盖APP维度设置的规则

    }

    public static void entryAdScenarioWithAdUnitID(String adUnitId,String sceneId) {
        Log.d(TAG, "entryAdScenarioWithAdUnitID sceneId:" + sceneId);
        TPInterstitial tpInterstitial = getTPInterstitial(adUnitId);

        if (tpInterstitial != null) {
            tpInterstitial.entryAdScenario(sceneId);
        }
    }

    private static TPInterstitial getTPInterstitial(String adUnitId) {
        return mTPInterstitial.get(adUnitId);
    }

    private static TPInterstitial getTPInterstitial(String adUnitId, String data) {

        Log.i(TAG, "data = " + data + " mTPInterstitial = " + mTPInterstitial);

        ExtraInfo extraInfo = null;
        if (!TextUtils.isEmpty(data)) {
            extraInfo = JSON.parseObject(data, ExtraInfo.class);
        }

        HashMap<String, Object> temp = new HashMap<>();

        TPInterstitial tpInterstitial = mTPInterstitial.get(adUnitId);
        if (tpInterstitial == null) {
            tpInterstitial = new TPInterstitial(getActivity(), adUnitId);
            mTPInterstitial.put(adUnitId, tpInterstitial);

            boolean isSimpleListener = extraInfo == null ? false : extraInfo.isSimpleListener();

            tpInterstitial.setAdListener(new TPInterstitialAdListener(adUnitId));
            if (!isSimpleListener) {
                tpInterstitial.setAllAdLoadListener(new TPInterstitialAllAdListener(adUnitId));
                tpInterstitial.setDownloadListener(new TPInterstitialDownloadListener(adUnitId));
            }

        }

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

            tpInterstitial.setCustomParams(temp);

            if (extraInfo.getCustomMap() != null) {
                SegmentUtils.initPlacementCustomMap(adUnitId, extraInfo.getCustomMap());
            }
        }

        return tpInterstitial;
    }

}
