package banner;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.DownloadListener;

public class TPBannerDownloadListener implements DownloadListener {
    private String mAdUnitId;

    public TPBannerDownloadListener(String adUnitId) {
        mAdUnitId = adUnitId;
    }

    @Override
    public void onDownloadStart(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onDownloadStart('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadUpdate(TPAdInfo tpAdInfo, long l, long l1, String s, String s1, int i) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onDownloadUpdate('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "','" + i+ "')");
        });
    }

    @Override
    public void onDownloadPause(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onDownloadPause('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadFinish(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onDownloadFinish('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadFail(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onDownloadFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onInstalled(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusInterstitial.TPInterstitialListener.onInstalled('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }
}

