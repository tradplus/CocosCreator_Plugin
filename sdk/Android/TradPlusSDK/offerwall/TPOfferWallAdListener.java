package offerwall;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.gson.Gson;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.offerwall.OfferWallAdListener;

public class TPOfferWallAdListener implements OfferWallAdListener {
    private String mAdUnitId;

    public TPOfferWallAdListener(String adUnitId) {
        this.mAdUnitId = adUnitId;
    }
    @Override
    public void onAdLoaded(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallLoaded('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdClicked(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallClicked('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdImpression(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallImpression('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });

    }

    @Override
    public void onAdFailed(TPAdError tpAdError) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallLoadFailed('" + mAdUnitId + "','" + (new Gson().toJson(tpAdError)) + "')");
        });
    }

    @Override
    public void onAdClosed(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onOfferwallClosed('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdReward(TPAdInfo tpAdInfo) {
        // 给用户发放奖励
        //CocosHelper.runOnGameThread(() -> {
            //CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onRewardVideoRewarded('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        //});
    }

    @Override
    public void onAdVideoError(TPAdInfo tpAdInfo, TPAdError tpAdError) {

    }
}

