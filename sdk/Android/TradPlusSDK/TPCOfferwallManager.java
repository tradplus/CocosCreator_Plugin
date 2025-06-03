import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.tradplus.ads.base.util.SegmentUtils;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.offerwall.TPOfferWall;
import com.tradplus.ads.open.splash.TPSplash;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import common.BaseCocosPlugin;
import common.ExtraInfo;
import offerwall.TPOfferWallAdListener;
import offerwall.TPOfferWallAllAdListener;
import offerwall.TPOfferWallBalanceListener;
import splash.TPSplashAllAdListener;
import splash.TPSplashDownloadListener;
import utils.JsonUtils;

public class TPCOfferwallManager extends BaseCocosPlugin {
    private final static String TAG = "TradPlusData";

    // 保存广告位对象
    private static Map<String, TPOfferWall> mTPOfferWall = new ConcurrentHashMap<>();

    public static void loadWithAdUnitID(String adUnitId, String extra) {
        Log.d(TAG, "loadWithAdUnitID adUnitId:" + adUnitId + ",extra:" + extra);
        TPOfferWall tpOfferWall = getTPOfferWall(adUnitId,extra);

        ExtraInfo extraInfo = ExtraInfo.getExtraInfo(extra);
        if(extraInfo != null){
            tpOfferWall.setAutoLoadCallback(extraInfo.isOpenAutoLoadCallback());
        }

        if(tpOfferWall != null){
            tpOfferWall.loadAd(extraInfo == null ? 0f : extraInfo.getMaxWaitTime());
        }
    }

    public static void showWithAdUnitID(String adUnitId, String sceneId) {
        Log.d(TAG, "showWithAdUnitID adUnitId:" + adUnitId + ",sceneId:" + sceneId);
        TPOfferWall tpOfferWall = getTPOfferWall(adUnitId);

        if(tpOfferWall != null){
            tpOfferWall.showAd(getActivity(),sceneId);
        }
    }

    public static boolean adReadyWithAdUnitID(String adUnitId) {
        Log.d(TAG, "adReadyWithAdUnitID adUnitId:" + adUnitId);
        TPOfferWall tpOfferWall = getTPOfferWall(adUnitId);

        if(tpOfferWall != null){
            return tpOfferWall.isReady();
        }

        return false;

    }


    public static void entryAdScenarioWithAdUnitID(String adUnitId,String sceneId) {
        Log.d(TAG, "entryAdScenarioWithAdUnitID sceneId:" + sceneId);
        TPOfferWall tpOfferWall = getTPOfferWall(adUnitId);

        if(tpOfferWall != null){
            tpOfferWall.entryAdScenario(sceneId);
        }
    }


    public static void getCurrencyBalanceWithAdUnitID(String unitId){
        TPOfferWall tpOfferWall = getTPOfferWall(unitId);

        if(tpOfferWall != null){
            tpOfferWall.getCurrencyBalance();
        }

    }

    public static void spendBalanceWithAdUnitID(String unitId,int balance){
        TPOfferWall tpOfferWall = getTPOfferWall(unitId);

        if(tpOfferWall != null){
            tpOfferWall.spendCurrency(balance);
        }

    }

    public static void awardBalanceWithAdUnitID(String unitId,int balance){
        TPOfferWall tpOfferWall = getTPOfferWall(unitId);

        if(tpOfferWall != null){
            tpOfferWall.awardCurrency(balance);
        }

    }

    public static void setUserIdWithAdUnitID(String unitId,String userId){
        TPOfferWall tpOfferWall = getTPOfferWall(unitId);

        if(tpOfferWall != null){
            tpOfferWall.setUserId(userId);
        }

    }


    public static void setCustomShowData(String adUnitId,String data){
        TPOfferWall tpOfferWall = getTPOfferWall(adUnitId);

        if(tpOfferWall != null){
            tpOfferWall.setCustomShowData(JSON.parseObject(data));
        }
    }


    public static TPOfferWall getTPOfferWall(String adUnitId) {
        return mTPOfferWall.get(adUnitId);
    }
    public static TPOfferWall getTPOfferWall(String adUnitId, String data) {

        Log.i(TAG,"data = "+data+" mTPOfferWall = "+mTPOfferWall);

        ExtraInfo extraInfo = null;
        if(!TextUtils.isEmpty(data)) {
            extraInfo = JSON.parseObject(data, ExtraInfo.class);
        }

        HashMap<String, Object> temp = new HashMap<>();
        TPOfferWall tpOfferWall = mTPOfferWall.get(adUnitId);
        if (tpOfferWall == null) {
            tpOfferWall = new TPOfferWall(getActivity(),adUnitId);
            mTPOfferWall.put(adUnitId, tpOfferWall);

            boolean isSimpleListener = extraInfo == null ? false : extraInfo.isSimpleListener();

            tpOfferWall.setAdListener(new TPOfferWallAdListener(adUnitId));
            if (!isSimpleListener) {
                tpOfferWall.setAllAdLoadListener(new TPOfferWallAllAdListener(adUnitId));
                tpOfferWall.setOffWallBalanceListener(new TPOfferWallBalanceListener(adUnitId));
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

            tpOfferWall.setCustomParams(temp);

            if (extraInfo.getCustomMap() != null) {
                SegmentUtils.initPlacementCustomMap(adUnitId, extraInfo.getCustomMap());
            }
        }

        return tpOfferWall;
    }
}
