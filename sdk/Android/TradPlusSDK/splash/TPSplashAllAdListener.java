package splash;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.gson.Gson;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.LoadAdEveryLayerListener;

public class TPSplashAllAdListener implements LoadAdEveryLayerListener {
    private String adUnitId;

    public TPSplashAllAdListener(String adUnitId) {
        this.adUnitId = adUnitId;
    }
    @Override
    public void onAdAllLoaded(boolean b) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashAllLoaded('" + adUnitId + "',"+b+")");
        });
    }

    @Override
    public void oneLayerLoadFailed(TPAdError tpAdError, TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashOneLayerLoadFailed('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void oneLayerLoaded(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashOneLayerLoaded('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdStartLoad(String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashStartLoad('" + adUnitId + "','{}')");
        });
    }

    @Override
    public void oneLayerLoadStart(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashOneLayerStartLoad('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onBiddingStart(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashBiddingStart('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onBiddingEnd(TPAdInfo tpAdInfo, TPAdError tpAdError) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashBiddingEnd('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "','" + (new Gson().toJson(tpAdError)) + "')");
        });
    }

    @Override
    public void onAdIsLoading(String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onSplashIsLoading('" + adUnitId + "')");
        });
    }
}

