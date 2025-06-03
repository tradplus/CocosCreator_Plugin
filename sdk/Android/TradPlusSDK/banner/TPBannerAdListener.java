package banner;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.banner.BannerAdListener;

public class TPBannerAdListener extends BannerAdListener {
    private String mAdUnitId;

    public TPBannerAdListener(String adUnitId) {
        mAdUnitId = adUnitId;
    }

    @Override
    public void onAdLoaded(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerLoaded('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdClicked(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerClicked('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdClosed(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerClosed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdImpression(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerImpression('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo) + "')");
        });
    }

    @Override
    public void onAdLoadFailed(TPAdError tpAdError) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerLoadFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdError) + "')");
        });
    }

    @Override
    public void onAdShowFailed(TPAdError tpAdError, TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onBannerShowFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + JSON.toJSONString(tpAdError) + "')");
        });
    }


}

