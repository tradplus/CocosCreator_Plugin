package interstitial;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.gson.Gson;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.banner.BannerAdListener;
import com.tradplus.ads.open.interstitial.InterstitialAdListener;

public class TPInterstitialAdListener implements InterstitialAdListener {
    private String mAdUnitId;

    public TPInterstitialAdListener(String adUnitId) {
        this.mAdUnitId = adUnitId;
    }
    @Override
    public void onAdLoaded(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onInterstitialLoaded('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdClicked(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onInterstitialClicked('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdImpression(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onInterstitialImpression('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdFailed(TPAdError tpAdError) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onInterstitialLoadFailed('" + mAdUnitId + "','" + (new Gson().toJson(tpAdError)) + "')");
        });
    }

    @Override
    public void onAdClosed(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onInterstitialClosed('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdVideoError(TPAdInfo tpAdInfo, TPAdError tpAdError) {
    }

    @Override
    public void onAdVideoStart(TPAdInfo tpAdInfo) {
        // V8.1.0.1 播放开始
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onInterstitialVideoPlayStart('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdVideoEnd(TPAdInfo tpAdInfo) {
        // V8.1.0.1 播放结束
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onInterstitialVideoPlayEnd('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }
}

