package offerwall;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.gson.Gson;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.LoadAdEveryLayerListener;

public class TPOfferWallAllAdListener implements LoadAdEveryLayerListener {
    private String adUnitId;

    public TPOfferWallAllAdListener(String adUnitId) {
        this.adUnitId = adUnitId;
    }
    @Override
    public void onAdAllLoaded(boolean b) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallAllLoaded('" + adUnitId + "',"+b+")");
        });
    }

    @Override
    public void oneLayerLoadFailed(TPAdError tpAdError, TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallOneLayerLoadFailed('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void oneLayerLoaded(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallOneLayerLoaded('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdStartLoad(String s) {
        // 每次调用load方法时返回的回调，包含自动加载等触发时机。V7.9.0 新增。
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallStartLoad('" + adUnitId + "','{}')");
        });
    }

    @Override
    public void oneLayerLoadStart(TPAdInfo tpAdInfo) {
        // 每层waterfall 向三方广告源发起请求前，触发的回调。V7.9.0 新增。
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallOneLayerStartLoad('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onBiddingStart(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallBiddingStart('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onBiddingEnd(TPAdInfo tpAdInfo, TPAdError tpAdError) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallBiddingEnd('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "','" + (new Gson().toJson(tpAdError)) + "')");
        });
    }

    @Override
    public void onAdIsLoading(String s) {
        // 调用load之后如果收到此回调，说明广告位仍处于加载状态，无法触发新的一轮广告加载。V 9.0.0.1新增
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallIsLoading('" + adUnitId+"')");
        });
    }
}

