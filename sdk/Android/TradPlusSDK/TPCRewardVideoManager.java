

import android.app.Activity;
import android.text.TextUtils;
import android.util.Log;

import common.BaseCocosPlugin;
import common.ExtraInfo;
import reward.TPRewardAdListener;
import reward.TPRewardAllAdListener;
import reward.TPRewardDownloadListener;
import reward.TPRewardExdListener;
import utils.JsonUtils;
import com.tradplus.ads.base.util.SegmentUtils;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.reward.TPReward;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TPCRewardVideoManager extends BaseCocosPlugin {
    private final static String TAG = "TradPlusData";

    private static Map<String, TPReward> mTPReward = new ConcurrentHashMap<>();

    public static void loadWithAdUnitID(String adUnitId, String extra) {
        Log.d(TAG, "loadWithAdUnitID adUnitId:" + adUnitId + ",extra:" + extra);
        TPReward tpReward = getTPReward(adUnitId,extra);

        ExtraInfo extraInfo = ExtraInfo.getExtraInfo(extra);
        if(extraInfo != null){
            tpReward.setAutoLoadCallback(extraInfo.isOpenAutoLoadCallback());
        }

        if(tpReward != null){
            tpReward.loadAd(extraInfo == null ? 0f : extraInfo.getMaxWaitTime());
        }

    }

    public static void showWithAdUnitID(String adUnitId, String sceneId) {
        Log.d(TAG, "showWithAdUnitID adUnitId:" + adUnitId + ",sceneId:" + sceneId);
        TPReward tpReward = getTPReward(adUnitId);

        if(tpReward != null){
            tpReward.showAd(getActivity(),sceneId);
        }
    }


    public static boolean adReadyWithAdUnitID(String adUnitId) {
        Log.d(TAG, "adReadyWithAdUnitID adUnitId:" + adUnitId);
        TPReward tpReward = getTPReward(adUnitId);

        if(tpReward != null){
            return tpReward.isReady();
        }

        return false;
    }


    public static void entryAdScenarioWithAdUnitID(String adUnitId,String sceneId) {
        Log.d(TAG, "entryAdScenarioWithAdUnitID sceneId:" + sceneId);
        TPReward tpReward = getTPReward(adUnitId);

        if(tpReward != null){
            tpReward.entryAdScenario(sceneId);
        }
    }

    public void setCustomShowData(String adUnitId,String data){
        TPReward tpReward = getTPReward(adUnitId);

        if(tpReward != null){
            tpReward.setCustomShowData(JSON.parseObject(data));
        }
    }

    public static void setCustomAdInfo(String jsonStr,String adUnitId) {
        Log.d(TAG, "entryAdScenarioWithAdUnitID adUnitId:" + adUnitId);
        SegmentUtils.initPlacementCustomMap(adUnitId, JsonUtils.jsonToMapString(jsonStr));//仅对该广告位有效，会覆盖APP维度设置的规则

    }

    public static void clearCacheWithAdUnitId(String adUnitId) {
        Log.d(TAG, "clearCacheWithAdUnitId adUnitId:" + adUnitId);
        TPReward tpReward = getTPReward(adUnitId);

        if(tpReward != null){
            tpReward.clearCacheAd();
        }
    }
    private static TPReward getTPReward(String adUnitId) {
        return mTPReward.get(adUnitId);
    }
    private static TPReward getTPReward(String adUnitId, String data) {

        Log.i("tradplus","data = "+data+" mTPReward = "+mTPReward);

        ExtraInfo extraInfo = null;
        if(!TextUtils.isEmpty(data)) {
            extraInfo = JSON.parseObject(data, ExtraInfo.class);
        }

        HashMap<String, Object> temp = new HashMap<>();
        TPReward tpReward = mTPReward.get(adUnitId);
        if (tpReward == null) {
            tpReward = new TPReward(getActivity(),adUnitId);
            mTPReward.put(adUnitId, tpReward);

            boolean isSimpleListener = extraInfo == null ? false : extraInfo.isSimpleListener();

            tpReward.setAdListener(new TPRewardAdListener(adUnitId));
            tpReward.setRewardAdExListener(new TPRewardExdListener(adUnitId));
            if (!isSimpleListener) {

                tpReward.setAllAdLoadListener(new TPRewardAllAdListener(adUnitId));
                tpReward.setDownloadListener(new TPRewardDownloadListener(adUnitId));

            }

        }
//        LogUtil.ownShow("map params = "+params);
//        // 同一个广告位每次load参数不一样，在下面设置
        if(extraInfo != null) {

            if (extraInfo.getLocalParams() != null ) {
                temp = (HashMap<String, Object>) extraInfo.getLocalParams();
            }
            if (!TextUtils.isEmpty(extraInfo.getCustomData())) {
                temp.put("custom_data", extraInfo.getCustomData());
            }
            if (!TextUtils.isEmpty(extraInfo.getUserId())) {
                temp.put("user_id", extraInfo.getUserId());
            }

            tpReward.setCustomParams(temp);

            if (extraInfo.getCustomMap() != null) {
                SegmentUtils.initPlacementCustomMap(adUnitId, extraInfo.getCustomMap());
            }
        }

        return tpReward;
    }

}
