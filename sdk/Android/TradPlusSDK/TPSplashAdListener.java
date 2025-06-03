

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.gson.Gson;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.base.bean.TPBaseAd;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.splash.SplashAdListener;

public class TPSplashAdListener extends SplashAdListener {
    private String mAdUnitId;
    private final static String TAG = "TradPlusData";

    public TPSplashAdListener(String adUnitId) {
        this.mAdUnitId = adUnitId;
    }
    @Override
    public void onAdClicked(TPAdInfo tpAdInfo) {
        Log.i(TAG, "onAdClicked: Data : " + JSON.toJSONString(tpAdInfo));
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashClicked('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
        if(TPSplashPopupWindow.instance!=null){
            TPSplashPopupWindow.instance.dismiss();
        }
    }

    @Override
    public void onAdImpression(TPAdInfo tpAdInfo) {
        Log.i(TAG, "onAdImpression: Data : " + JSON.toJSONString(tpAdInfo));
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashImpression('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdClosed(TPAdInfo tpAdInfo) {
        Log.i(TAG, "onAdClosed Data : " + JSON.toJSONString(tpAdInfo));
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashClosed('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
        if(TPSplashPopupWindow.instance!=null){
            TPSplashPopupWindow.instance.dismiss();
        }
    }

    @Override
    public void onAdLoaded(TPAdInfo tpAdInfo, TPBaseAd tpBaseAd) {
        Log.i(TAG, "onAdLoaded: Data : " + JSON.toJSONString(tpAdInfo));
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashLoaded('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdLoadFailed(TPAdError tpAdError) {
        Log.i(TAG, "onAdLoadFailed adUnitId: " +mAdUnitId + ", tpAdError :" + tpAdError.getErrorMsg());
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashLoadFailed('" + mAdUnitId + "','" + (new Gson().toJson(tpAdError)) + "')");
        });
    }
}

