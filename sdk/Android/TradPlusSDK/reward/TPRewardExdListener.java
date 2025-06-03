package reward;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.gson.Gson;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.RewardAdExListener;
import com.tradplus.ads.open.reward.RewardAdListener;

public class TPRewardExdListener implements RewardAdExListener {
    private String adUnitId;

    public TPRewardExdListener(String adUnitId) {
        this.adUnitId = adUnitId;
    }

    @Override
    public void onAdAgainImpression(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onPlayAgainImpression('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdAgainVideoStart(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onPlayAgainPlayStart('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdAgainVideoEnd(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onPlayAgainPlayEnd('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdAgainVideoClicked(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onPlayAgainClicked('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdPlayAgainReward(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onPlayAgainRewarded('" + adUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }
}

