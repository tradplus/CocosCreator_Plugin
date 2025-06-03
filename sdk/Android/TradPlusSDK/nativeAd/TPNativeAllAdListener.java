package nativeAd;

import android.util.Log;
import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.LoadAdEveryLayerListener;

public class TPNativeAllAdListener implements LoadAdEveryLayerListener {

    private String mAdUnitId;
    public TPNativeAllAdListener(String adUnitId) {
        mAdUnitId = adUnitId;
    }

    @Override
    public void onAdAllLoaded(boolean b) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeAllLoaded('" + mAdUnitId + "'," + b + ")");
        });
    }

    @Override
    public void oneLayerLoadFailed(TPAdError tpAdError, TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeOneLayerLoadFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + JSON.toJSONString(tpAdError) + "')");
        });
    }

    @Override
    public void oneLayerLoaded(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeOneLayerLoaded('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdStartLoad(String adUnitId) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeStartLoad('" + mAdUnitId + "','{}')");
        });
    }

    @Override
    public void oneLayerLoadStart(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeOneLayerStartLoad('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onBiddingStart(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeBiddingStart('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onBiddingEnd(TPAdInfo tpAdInfo, TPAdError tpAdError) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeBiddingEnd('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "','" + JSON.toJSONString(tpAdError) + "')");
        });
    }

    @Override
    public void onAdIsLoading(String adUnitId) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeIsLoading('" + mAdUnitId + "')");
        });
    }
}

