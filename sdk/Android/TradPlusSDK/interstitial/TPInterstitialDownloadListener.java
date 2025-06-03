package interstitial;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.DownloadListener;

public class TPInterstitialDownloadListener implements DownloadListener {
    private String mAdUnitId;

    public TPInterstitialDownloadListener(String adUnitId) {
        mAdUnitId = adUnitId;
    }

    @Override
    public void onDownloadStart(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onDownloadStart('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadUpdate(TPAdInfo tpAdInfo, long l, long l1, String s, String s1, int i) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onDownloadUpdate('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "','" + i+ "')");
        });
    }

    @Override
    public void onDownloadPause(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onDownloadPause('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadFinish(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onDownloadFinish('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadFail(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onDownloadFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onInstalled(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusBanner.TPBannerListener.onInstalled('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }
}

