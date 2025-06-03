//package nativeAd;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.tp.adx.sdk.bean.TPNativeInfo;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.base.bean.TPBaseAd;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.nativead.NativeAdListener;

public class TPNativeAdListener extends NativeAdListener {
    private String mAdUnitId;
    private final static String TAG = "TradPlusData";

    public TPNativeAdListener(String adUnitId) {
        mAdUnitId = adUnitId;
    }

    @Override
    public void onAdLoaded(TPAdInfo tpAdInfo, TPBaseAd tpBaseAd) {
        Log.i(TAG, "onAdLoaded: Data : " + JSON.toJSONString(tpAdInfo));
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeLoaded('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdClicked(TPAdInfo tpAdInfo) {
        Log.i(TAG, "onAdClicked: Data : " + JSON.toJSONString(tpAdInfo));
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeClicked('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdClosed(TPAdInfo tpAdInfo) {
        Log.i(TAG, "onAdClosed Data : " + JSON.toJSONString(tpAdInfo));
        nativeAd.TPNativeInfo tpNativeInfo = TPCNativeManager.getTPNative(mAdUnitId);

        if (tpNativeInfo != null) {
            if (tpNativeInfo.getParentView() != null) {
                tpNativeInfo.getParentView().removeAllViews();
            }
        }
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeClosed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdImpression(TPAdInfo tpAdInfo) {
        Log.i(TAG, "onAdImpression: Data : " + JSON.toJSONString(tpAdInfo));
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeImpression('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdLoadFailed(TPAdError tpAdError) {
        Log.i(TAG, "onAdLoadFailed adUnitId: " +mAdUnitId + ", tpAdError :" + tpAdError.getErrorMsg());
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeLoadFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdError) + "')");
        });
    }

    @Override
    public void onAdShowFailed(TPAdError tpAdError, TPAdInfo tpAdInfo) {
        Log.i(TAG, "NativeBanner onAdShowFailed: ErrorCode = " + tpAdError.getErrorCode() + "ErrorMsg =  " + tpAdError.getErrorMsg());
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusNative.TPNativeListener.onNativeShowFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + JSON.toJSONString(tpAdError) + "')");
        });
    }
    @Override
    public void onAdVideoStart(TPAdInfo tpAdInfo) {
        Log.i(TAG, "onAdVideoStart Data : " + JSON.toJSONString(tpAdInfo));
    }
    @Override
    public void onAdVideoEnd(TPAdInfo tpAdInfo) {
        Log.i(TAG, "onAdVideoEnd Data : " + JSON.toJSONString(tpAdInfo));
    }
}

