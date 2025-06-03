package splash;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.DownloadListener;

public class TPSplashDownloadListener implements DownloadListener {
    private String mAdUnitId;

    public TPSplashDownloadListener(String adUnitId) {
        mAdUnitId = adUnitId;
    }

    @Override
    public void onDownloadStart(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onDownloadStart('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadUpdate(TPAdInfo tpAdInfo, long l, long l1, String s, String s1, int i) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onDownloadUpdate('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "','" + i+ "')");
        });
    }

    @Override
    public void onDownloadPause(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onDownloadPause('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadFinish(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onDownloadFinish('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onDownloadFail(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onDownloadFailed('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }

    @Override
    public void onInstalled(TPAdInfo tpAdInfo, long l, long l1, String s, String s1) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusSplash.TPSplashListener.onInstalled('" + mAdUnitId + "','" + JSON.toJSONString(tpAdInfo)+ "','" + l + "','" + l1 + "','" + s  + "','" + s1+ "')");
        });
    }
}

