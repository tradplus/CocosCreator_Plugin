package banner;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.LoadAdEveryLayerListener;

public class TPBannerAllAdListener implements LoadAdEveryLayerListener {
    private String mAdUnitId;

    public TPBannerAllAdListener(String adUnitId) {
        mAdUnitId = adUnitId;
    }

    @Override
    public void onAdAllLoaded(boolean b) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerAllLoaded('" + mAdUnitId + "'," + b + ")");
        });
    }

    @Override
    public void oneLayerLoadFailed(TPAdError tpAdError, TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerOneLayerLoadFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + JSON.toJSONString(tpAdError) + "')");
        });
    }

    @Override
    public void oneLayerLoaded(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerOneLayerLoaded('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdStartLoad(String adUnitId) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerStartLoad('" + mAdUnitId + "','{}')");
        });
    }

    @Override
    public void oneLayerLoadStart(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerOneLayerStartLoad('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onBiddingStart(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerBiddingStart('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onBiddingEnd(TPAdInfo tpAdInfo, TPAdError tpAdError) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerBiddingEnd('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "','" + JSON.toJSONString(tpAdError) + "')");
        });
    }

    @Override
    public void onAdIsLoading(String adUnitId) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerIsLoading('" + mAdUnitId + "')");
        });
    }
}

